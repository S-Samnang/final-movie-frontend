import React, { useEffect, useState } from "react";
import { fetchActor } from "../services/MovieData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";

const ActorCard = ({ movieId }) => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getActors = async () => {
      try {
        const data = await fetchActor(movieId);
        if (data && data.cast) {
          setActors(data.cast); // Limit to 10 actors
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      getActors();
    }
  }, [movieId]);

  if (loading) {
    return <p className="text-gray-400">Loading actors...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (actors.length === 0) {
    return <p className="text-gray-400">No actors found for this movie.</p>;
  }

  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={20}
      slidesPerView={4}
      breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      }}
    >
      {actors.map((actor) => (
        <SwiperSlide key={actor.id}>
          <div className="w-[184px] h-[300px]  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="w-full h-[200px] rounded-t-lg "
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={actor.name}
            />
            <div className="p-[5px] text-center">
              <h3 className="mt-2 text-sm font-DM text-white">{actor.name}</h3>
              <p className="text-xs font-DM text-gray-400">{actor.character}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ActorCard;
