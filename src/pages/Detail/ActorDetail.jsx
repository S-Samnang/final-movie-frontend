import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { request } from "../../util/request";
import DefaultProfile from "../../assets/default-avatar.jpg";

const ActorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActor = async () => {
      try {
        const res = await request(`actor/${id}`, "get");
        setActor(res.actor);
      } catch (error) {
        console.error("Failed to fetch actor:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchActor();
  }, [id, navigate]);

  if (loading || !actor) {
    return <div className="text-white text-center py-20">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Image */}
      {actor.profile_path && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${actor.profile_path})`,
          }}
        ></div>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-10">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                : DefaultProfile
            }
            alt={actor.name}
            className="rounded-2xl w-[280px] md:w-[320px] object-cover shadow-lg"
          />
        </div>

        {/* Actor Info */}
        <div className="flex-1 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{actor.name}</h1>

          <div className="flex flex-wrap gap-3 mb-6">
            {actor.known_for_department && (
              <span className="bg-blue-600 text-white text-sm px-4 py-1 rounded-full">
                {actor.known_for_department}
              </span>
            )}
            {actor.gender && (
              <span className="bg-green-600 text-white text-sm px-4 py-1 rounded-full">
                {actor.gender === 1 ? "Female" : "Male"}
              </span>
            )}
            {actor.popularity && (
              <span className="bg-yellow-400 text-black text-sm px-4 py-1 rounded-full">
                Popularity: {parseFloat(actor.popularity).toFixed(1)}
              </span>
            )}
          </div>

          <p className="text-gray-300 mb-10 text-lg">
            No biography available for this actor.
          </p>

          {/* Movies List */}
          {actor.movies && actor.movies.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Movies</h2>
              <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 pr-4">
                {actor.movies.map((movie) => (
                  <Link
                    to={`/movie/${movie.tmdb_id}`}
                    key={movie.id}
                    className="flex-shrink-0 w-[150px] hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
                          : DefaultProfile
                      }
                      alt={movie.title}
                      className="rounded-lg mb-2 w-full h-[220px] object-cover shadow-md"
                    />
                    <p className="text-white text-sm text-center truncate">
                      {movie.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActorDetail;
