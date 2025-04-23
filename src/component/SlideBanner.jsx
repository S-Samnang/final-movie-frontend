const SlideBanner = ({ image }) => {
  return (
    <img
      className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      src={`https://image.tmdb.org/t/p/original${image.backdrop_path}`}
      alt={image.title}
      loading="lazy"
    />
  );
};

export default SlideBanner;
