import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { request } from "../../util/request";
import { Dialog } from "@headlessui/react";
import { profileStore } from "../../store/profileStore";
import DefaultProfile from "../../assets/default-avatar.jpg";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = profileStore();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    request(`movies/by-tmdb/${id}`, "get")
      .then((res) => setMovie(res))
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleToggleFavorite = async () => {
    try {
      const res = await request(
        "favorites/toggle",
        "post",
        { movie_id: movie.id },
        token
      );

      setMessage(res.message);
    } catch (error) {
      console.error("Favorite error:", error);
      if (
        error?.error === "Unauthorized" ||
        error?.error === "Unauthenticated."
      ) {
        setMessage("Session expired. Please log in again.");
      } else {
        setMessage(error?.error || "Failed to save favorite.");
      }
    }

    setTimeout(() => setMessage(""), 2000);
  };

  if (loading || !movie) {
    return <div className="text-white text-center py-20">Loading...</div>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 py-8"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="bg-black bg-opacity-70 rounded-xl max-w-7xl mx-auto p-6 md:p-14 flex flex-col md:flex-row items-start gap-10 md:gap-14 overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg w-[300px] md:w-[350px] shadow-xl flex-shrink-0"
        />

        <div className="flex-1 w-full min-w-0 overflow-hidden text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 text-lg mb-4">{movie.release_date}</p>

          {movie.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-white text-black text-sm px-4 py-1 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <p className="text-gray-300 mb-6 leading-relaxed text-base md:text-lg break-words">
            {movie.overview}
          </p>

          {/* ▶ Trailer + ❤️ Save Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={async () => {
                const res = await request(`movies/${movie.tmdb_id}/trailer`);
                if (res.key) {
                  setTrailerKey(res.key);
                  setShowTrailer(true);
                } else {
                  alert("Trailer not available");
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
            >
              ▶ Watch Trailer
            </button>

            {movie.embed_url && (
              <button
                onClick={() => {
                  setTrailerKey(movie.embed_url); // ✅ directly store the embed URL
                  setShowTrailer(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
              >
                🎬 Watch Full Movie
              </button>
            )}

            <button
              onClick={handleToggleFavorite}
              className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-md transition"
            >
              ❤️ Save to Favorites
            </button>
          </div>

          {message && <p className="text-green-400 mt-2">{message}</p>}

          {/* Casts */}
          {movie.actors?.length > 0 && (
            <div className="w-full mt-8 relative">
              <h2 className="text-2xl font-semibold mb-4">Casts</h2>
              <div className="relative overflow-x-auto scrollbar-custom">
                <div className="flex gap-5 min-w-fit pr-10 pb-1">
                  {movie.actors.map((actor) => (
                    <div
                      key={actor.id}
                      className="flex-shrink-0 w-[90px] text-center transition-transform duration-300 hover:scale-105"
                    >
                      <img
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                            : DefaultProfile
                        }
                        alt={actor.name}
                        className="rounded-lg mb-1 w-full h-[120px] object-cover shadow-md"
                      />
                      <p className="text-sm text-white truncate">
                        {actor.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {actor.character}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-[#131313] to-transparent pointer-events-none" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 🎬 Trailer Modal */}
      <Dialog
        open={showTrailer}
        onClose={() => setShowTrailer(false)}
        className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-80"
      >
        <Dialog.Panel className="w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg">
          {trailerKey && (
            <iframe
              width="100%"
              height="100%"
              src={
                trailerKey.includes("http")
                  ? `${trailerKey}?autoplay=1`
                  : `https://www.youtube.com/embed/${trailerKey}?autoplay=1`
              }
              title="Video Player"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default MovieDetail;
