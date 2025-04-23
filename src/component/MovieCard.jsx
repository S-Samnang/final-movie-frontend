import { useNavigate } from "react-router-dom";
import { movieStore } from "../store/movieStore"; // adjust path if needed

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const setCurrentMovie = movieStore((state) => state.setCurrentMovie);

  const calculateFontSize = (title) => {
    if (title.length > 25) return "text-[20px]";
    if (title.length > 15) return "text-[25px]";
    return "text-[30px]";
  };

  const handleClick = () => {
    setCurrentMovie(movie);
    navigate(`/movie/${movie.tmdb_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-[550px] rounded-lg shadow bg-[#131313] flex flex-col justify-between overflow-hidden cursor-pointer hover:shadow-lg transition duration-300"
    >
      {/* Movie Image */}
      <img
        className="rounded-t-lg h-[350px] w-full object-cover"
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.title}
      />

      {/* Card Content */}
      <div className="px-5 pb-5">
        <h5
          className={`font-Raleway tracking-tight text-white text-center pt-3 pb-2 truncate ${calculateFontSize(
            movie.title
          )}`}
        >
          {movie.title}
        </h5>

        <p className="font-inter text-sm text-center text-gray-400">
          {movie.release_date}
        </p>

        <div className="flex items-center mt-4 mb-2 justify-center gap-2">
          <span className="text-yellow-500 text-sm font-inter">Rated:</span>
          <span className="bg-yellow-200 text-black font-DM text-sm px-2.5 py-0.5 rounded w-[40px] h-[20px] flex items-center justify-center">
            {Number(movie.vote_average).toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
