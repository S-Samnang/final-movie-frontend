import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import SlideBanner from "./SlideBanner";
const SwiperBanner = ({ images }) => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper h-[450px]"
      >
        {images.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <SlideBanner image={image} />
            </SwiperSlide>
          );
        })}

       
      </Swiper>
    </div>
  );
};

export default SwiperBanner;
