import { useEffect, useState, useRef } from "react";
import { movieStore } from "../../store/movieStore";
import { request } from "../../util/request";
import MovieCard from "../../component/MovieCard";
import SkeletonCard from "../../component/SkeletonCard";

const PopularPage = () => {
  const type = "popular";
  const observerRef = useRef();

  const {
    getMoviesByType,
    setMoviesByType,
    appendMoviesByType,
    getPagination,
    setPagination,
  } = movieStore();

  const [movies, setMovies] = useState(getMoviesByType(type));
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(movies.length === 0);
  const [loadingMore, setLoadingMore] = useState(false);
  const pagination = getPagination(type);

  const fetchMovies = (page = 1, append = false) => {
    if (page > pagination.last_page) return;

    page === 1 ? setLoading(true) : setLoadingMore(true);

    request(`movies?type=${type}&page=${page}`, "get")
      .then((res) => {
        const data = res.movies?.data || [];

        if (append) {
          appendMoviesByType(type, data);
          setMovies((prev) => [...prev, ...data]);
        } else {
          setMoviesByType(type, data);
          setMovies(data);
        }

        setPagination(type, {
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
    if (movies.length === 0) {
      fetchMovies();
    }
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
      setMovies(getMoviesByType(type));
    } else {
      const filtered = getMoviesByType(type).filter((movie) =>
        movie.genres?.some((g) => g.name === genreName)
      );
      setMovies(filtered);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
        Popular Movies
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

export default PopularPage;
