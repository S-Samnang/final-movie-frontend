import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { request } from "../util/request";

const FavoriteModal = ({ isOpen, onClose }) => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const res = await request("movies/favorites", "get", null, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      setFavorites(res);
    } catch (error) {
      console.error("Error fetching favorites", error);
    }
  };

  useEffect(() => {
    if (isOpen) fetchFavorites();
  }, [isOpen]);

  const handleRemove = async (movieId) => {
    try {
      await request(
        "favorites/toggle",
        "post",
        { movie_id: movieId },
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      );
      setFavorites((prev) => prev.filter((m) => m.id !== movieId));
    } catch (err) {
      console.error("Failed to remove from favorites", err);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-70"
        aria-hidden="true"
      />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-6">
          <Dialog.Panel className="bg-[#1c1c1c] text-white p-6 rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-2xl font-bold">
                My Favorite Movies
              </Dialog.Title>
              <button onClick={onClose} className="text-white text-2xl">
                ✖
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {favorites.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-[#2a2a2a] rounded shadow-md overflow-hidden"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-[250px] object-cover cursor-pointer"
                    onClick={() => {
                      onClose(); // Close modal before navigating
                      navigate(`/movie/${movie.tmdb_id}`);
                    }}
                  />
                  <div className="p-3">
                    <h3 className="text-lg font-semibold truncate">
                      {movie.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {movie.release_date}
                    </p>
                    <button
                      onClick={() => handleRemove(movie.id)}
                      className="text-sm text-red-400 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default FavoriteModal;
