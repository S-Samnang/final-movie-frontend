import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { profileStore } from "../store/profileStore";
import { request } from "../util/request";
import Logo from "../assets/funwatch.png";
import ConfirmAlert from "./ComfirmAlert";
import FavoriteModal from "./FavoriteModal";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Optional, requires @heroicons/react

const Navbar = () => {
  const { user, funClear } = profileStore();
  const location = useLocation();
  const navigate = useNavigate();

  const [active, setActive] = useState(location.pathname);
  const [showAlert, setShowAlert] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [message, setMessage] = useState("");

  const dropdownRef = useRef();
  const userDropdownRef = useRef();

  const handleMenuClick = (path) => {
    setActive(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    funClear();
    setShowAlert(false);
    navigate("/login");
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim().length > 1) {
        request(`search?query=${encodeURIComponent(query.trim())}`, "get")
          .then((res) => {
            const allResults = res.results || [];

            // Show message if all movies are inactive
            const activeMovies = allResults.filter(
              (movie) => movie.status === 1
            );

            if (allResults.length > 0 && activeMovies.length === 0) {
              setMessage("This movie is not available right now.");
            } else if (allResults.length === 0) {
              setMessage("No movies found.");
            } else {
              setMessage("");
            }

            setResults(activeMovies); // only show active movies
            setShowDropdown(true);
          })
          .catch(() => {
            setMessage("Error while searching.");
            setShowDropdown(false);
          });
      } else {
        setResults([]);
        setShowDropdown(false);
        setMessage("");
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <nav className="bg-[#131313] text-white z-50 relative">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="h-8" />
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? (
            <XMarkIcon className="h-6" />
          ) : (
            <Bars3Icon className="h-6" />
          )}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className={active === "/" ? "text-red-500" : ""}
            onClick={() => handleMenuClick("/")}
          >
            Home
          </Link>
          <Link
            to="/popular"
            className={active === "/popular" ? "text-red-500" : ""}
            onClick={() => handleMenuClick("/popular")}
          >
            Popular
          </Link>
          <Link
            to="/nowplaying"
            className={active === "/nowplaying" ? "text-red-500" : ""}
            onClick={() => handleMenuClick("/nowplaying")}
          >
            Now Playing
          </Link>
          <Link
            to="/upcoming"
            className={active === "/upcoming" ? "text-red-500" : ""}
            onClick={() => handleMenuClick("/upcoming")}
          >
            Upcoming
          </Link>
          <div ref={dropdownRef} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="text-black px-2 py-1 rounded-md w-[150px]"
            />
            {showDropdown && results.length > 0 && (
              <div className="absolute top-10 left-0 z-50 w-[300px] bg-white text-black shadow-lg rounded-md max-h-64 overflow-y-auto">
                {results.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.tmdb_id}`}
                    className="block px-4 py-2 hover:bg-gray-100 border-b"
                    onClick={() => {
                      setShowDropdown(false);
                      setQuery("");
                    }}
                  >
                    {movie.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Profile / Login */}
        <div className="relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() =>
                  document
                    .getElementById("user-dropdown")
                    ?.classList.toggle("hidden")
                }
                className="w-8 h-8 rounded-full overflow-hidden border"
              >
                <img
                  src={
                    user?.profileImage ||
                    "https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                  }
                  alt="User"
                  className="rounded-full w-10 h-10 object-cover"
                />
              </button>
              <div
                ref={userDropdownRef}
                id="user-dropdown"
                className="hidden absolute right-0 z-50 mt-2 w-48 bg-white text-black divide-y rounded-lg shadow"
              >
                <div className="px-4 py-3">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <ul className="py-2">
                  {user.roles?.includes("admin") && (
                    <li>
                      <Link to="/admin" className="block px-4 py-2 text-sm">
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => setShowFavorites(true)}
                      className="block w-full text-left px-4 py-2 text-sm"
                    >
                      Favorites
                    </button>
                    <FavoriteModal
                      isOpen={showFavorites}
                      onClose={() => setShowFavorites(false)}
                    />
                  </li>
                  <li>
                    <button
                      onClick={() => setShowAlert(true)}
                      className="block w-full text-left px-4 py-2 text-sm"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full right-0 w-full bg-[#1c1c1c] text-white px-6 py-4 z-40 shadow-lg">
          <ul className="space-y-3 text-base">
            <li>
              <Link
                to="/"
                onClick={() => handleMenuClick("/")}
                className="block text-white hover:text-red-500 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/popular"
                onClick={() => handleMenuClick("/popular")}
                className="block text-white hover:text-red-500 transition"
              >
                Popular
              </Link>
            </li>
            <li>
              <Link
                to="/nowplaying"
                onClick={() => handleMenuClick("/nowplaying")}
                className="block text-white hover:text-red-500 transition"
              >
                Now Playing
              </Link>
            </li>
            <li>
              <Link
                to="/upcoming"
                onClick={() => handleMenuClick("/upcoming")}
                className="block text-white hover:text-red-500 transition"
              >
                Upcoming
              </Link>
            </li>
          </ul>

          {/* Search input */}
          <div className="mt-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2 text-black rounded-md focus:outline-none"
            />
            {showDropdown && (
              <div className="absolute top-10 left-0 z-50 w-[300px] bg-white text-black shadow-lg rounded-md max-h-64 overflow-y-auto">
                {message && (
                  <div className="px-4 py-2 text-red-600 font-medium text-sm border-b">
                    {message}
                  </div>
                )}

                {results.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.tmdb_id}`}
                    className="block px-4 py-2 hover:bg-gray-100 border-b"
                    onClick={() => {
                      setShowDropdown(false);
                      setQuery("");
                    }}
                  >
                    {movie.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Logout Confirmation */}
      {showAlert && (
        <ConfirmAlert
          onConfirm={handleLogout}
          onCancel={() => setShowAlert(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
