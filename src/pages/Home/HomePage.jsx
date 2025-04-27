import { useEffect, useState } from "react";
import SwiperBanner from "../../component/SwiperBanner";
import SwiperMovieCard from "../../component/SwiperMovieCard";
import SkeletonCard from "../../component/SkeletonCard";
import SkeletonBanner from "../../component/SkeletonBanner";
import { request } from "../../util/request";

const HomePage = () => {
  const [popularMovie, setPopularMovie] = useState([]);
  const [nowPlayMovie, setNowPlayMovie] = useState([]);
  const [upcomingMovie, setUpcomingMovie] = useState([]);

  useEffect(() => {
    const fetchPopularMovie = async () => {
      try {
        const response = await request("movies?type=popular", "get");
        setPopularMovie(response.movies?.data || []);
      } catch (err) {
        console.error("Error fetching top rated movies:", err);
      }
    };

    const fetchNowPlayMovie = async () => {
      try {
        const response = await request("movies?type=now_playing", "get");
        setNowPlayMovie(response.movies?.data || []);
      } catch (err) {
        console.error("Error fetching now playing movies:", err);
      }
    };

    const fetchUpcomingMovie = async () => {
      try {
        const response = await request("movies?type=upcoming", "get");
        setUpcomingMovie(response.movies?.data || []);
      } catch (err) {
        console.error("Error fetching upcoming movies:", err);
      }
    };

    fetchPopularMovie();
    fetchNowPlayMovie();
    fetchUpcomingMovie();
  }, []);

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  );

  return (
    <main className="w-full">
      {/* Banner */}
      <section className="pt-6 sm:pt-8 pb-6 sm:pb-8">
        {popularMovie.length === 0 ? (
          <SkeletonBanner />
        ) : (
          <SwiperBanner images={popularMovie} />
        )}
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-10">
        {/* Popular */}
        <section id="top-rated" className="Top-Rating-Movie">
          <h2 className="mb-6 mt-6 text-xl sm:text-2xl lg:text-3xl font-semibold">
            Popular Movies
          </h2>
          {popularMovie.length === 0 ? (
            renderSkeletons()
          ) : (
            <SwiperMovieCard movies={popularMovie} />
          )}
        </section>

        {/* Now Playing */}
        <section id="now-playing" className="Now-Playing-Movie">
          <h2 className="mb-6 mt-6 text-xl sm:text-2xl lg:text-3xl font-semibold">
            Now Playing Movies
          </h2>
          {nowPlayMovie.length === 0 ? (
            renderSkeletons()
          ) : (
            <SwiperMovieCard movies={nowPlayMovie} />
          )}
        </section>

        {/* Upcoming */}
        <section id="upcoming" className="Upcoming-Movie">
          <h2 className="mb-6 mt-6 text-xl sm:text-2xl lg:text-3xl font-semibold">
            Upcoming Movies
          </h2>
          {upcomingMovie.length === 0 ? (
            renderSkeletons()
          ) : (
            <SwiperMovieCard movies={upcomingMovie} />
          )}
        </section>
      </section>
    </main>
  );
};

export default HomePage;
