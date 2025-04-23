import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import MovieCard from "./MovieCard";

const SwiperMovieCard = ({ movies }) => {
  return (
    <div className="relative">
      <Swiper
        cssMode={false}
        spaceBetween={22}
        mousewheel={{ forceToAxis: true }}
        slidesPerView={1}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        modules={[Mousewheel, Navigation]}
        className="cursor-default"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperMovieCard;
