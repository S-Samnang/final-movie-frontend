import { useEffect, useState, useRef } from "react";
import { request } from "../../util/request";
import MovieCard from "../../component/MovieCard";
import SkeletonCard from "../../component/SkeletonCard";

const NowPlayingPage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const observerRef = useRef();

  const fetchMovies = (page = 1, append = false) => {
    if (page > pagination.last_page) return;

    page === 1 ? setLoading(true) : setLoadingMore(true);

    request(`movies?type=now_playing&page=${page}`, "get")
      .then((res) => {
        const data = res.movies?.data || [];
        if (append) {
          setMovies((prev) => [...prev, ...data]);
        } else {
          setMovies(data);
        }

        setPagination({
          current_page: res.movies?.current_page,
          last_page: res.movies?.last_page,
        });
      })
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  };

  const fetchGenres = () => {
    request("genres").then(setGenres);
  };

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !loadingMore) {
          fetchMovies(pagination.current_page + 1, true);
        }
      },
      { threshold: 1 }
    );

    const target = document.querySelector("#loadMoreTrigger");
    if (target) observer.observe(target);

    observerRef.current = observer;

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [pagination.current_page, loadingMore, loading]);

  const handleGenreChange = (e) => {
    const genreName = e.target.value;
    setSelectedGenre(genreName || null);

    if (!genreName) {
      fetchMovies(); // refetch all movies if "All Genres"
    } else {
      const filtered = movies.filter((movie) =>
        movie.genres?.some((g) => g.name === genreName)
      );
      setMovies(filtered);
    }
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
            <option value={genre.name} key={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading && movies.length === 0 ? (
          Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
        ) : movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <div className="col-span-full text-center text-white text-lg py-10">
            No movies found.
          </div>
        )}
      </div>

      {/* Loading More Animation */}
      {loadingMore && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
          {Array.from({ length: 4 }).map((_, idx) => (
            <SkeletonCard key={`loading-more-${idx}`} />
          ))}
        </div>
      )}

      {/* Trigger for Infinite Scroll */}
      <div id="loadMoreTrigger" className="h-10 mt-10"></div>
    </div>
  );
};

export default NowPlayingPage;
