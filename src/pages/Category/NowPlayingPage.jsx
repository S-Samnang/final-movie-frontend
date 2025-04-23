import { useEffect, useState } from "react";
import { request } from "../../util/request";
import MovieCard from "../../component/MovieCard";
import SkeletonCard from "../../component/SkeletonCard";

const NowPlayingPage = () => {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });
  const [loading, setLoading] = useState(true);

  const fetchMovies = (page = 1) => {
    setLoading(true);
    request(`movies?type=now_playing&page=${page}`, "get")
      .then((res) => {
        const data = res.movies?.data || [];
        setAllMovies(data);
        setMovies(data);
        setPagination({
          current_page: res.movies?.current_page,
          last_page: res.movies?.last_page,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .finally(() => setLoading(false));
  };

  const fetchGenres = () => {
    request("genres").then(setGenres);
  };

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  const handleGenreChange = (e) => {
    const genreId = parseInt(e.target.value);
    setSelectedGenre(genreId || null);

    if (!genreId) {
      setMovies(allMovies);
    } else {
      const filtered = allMovies.filter((movie) =>
        movie.genres?.some((g) => g.id === genreId)
      );
      setMovies(filtered);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= pagination.last_page; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => fetchMovies(i)}
          className={`px-3 py-1 rounded ${
            i === pagination.current_page
              ? "bg-red-600 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
        Now Playing Movies
      </h2>

      {/* Genre Filter */}
      <div className="flex justify-center mb-8">
        <select
          onChange={handleGenreChange}
          value={selectedGenre || ""}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option value={genre.id} key={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
        ) : movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <div className="col-span-full text-center text-white text-lg py-10">
            No movies found for this genre.
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && (
        <div className="flex flex-wrap justify-center mt-10 gap-2 sm:gap-4">
          <button
            onClick={() => fetchMovies(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
          >
            ← Prev
          </button>

          {renderPageNumbers()}

          <button
            onClick={() => fetchMovies(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.last_page}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default NowPlayingPage;
