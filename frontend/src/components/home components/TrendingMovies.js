import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReviewBarABS } from '../../util/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';

function TrendingMovies(props) {
  const [trendingMoviesArr, setTrendingMoviesArr] = useState([]);

  // Fetch movies and store in moviesArr.
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${props.api}&page=1`
      );
      const data = await res.json();
      if (data.results) {
        setTrendingMoviesArr(
          data.results.map((movie) => {
            return {
              key: movie.id,
              poster: movie.poster_path,
              title: movie.title,
              vote: movie.vote_average,
            };
          })
        );
      }
    };
    fetchMovies();
  }, [props.api]);

  return (
    <div className='trending-container pb-8'>
      <h1 className='pb-4 px-4 text-2xl'>Trending Movies</h1>
      <Swiper
        slidesPerView={2}
        spaceBetween={15}
        freeMode={true}
        modules={[FreeMode]}
        breakpoints={{
          510: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          1300: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          1500: {
            slidesPerView: 8,
            spaceBetween: 20,
          },
          2000: {
            slidesPerView: 10,
            spaceBetween: 25,
          },
        }}
        className='mySwiper'
      >
        <div className='relative md:overflow-x-auto'>
          {trendingMoviesArr.map((movie, index) => (
            <SwiperSlide key={index}>
              <Link to={`/movie/${movie.key}`}>
                <img
                  className='object-cover h-full'
                  src={props.apiImg + movie.poster}
                  alt={`${
                    movie.title === undefined
                      ? 'No title image'
                      : `${movie.title} image`
                  }`}
                />
                <ReviewBarABS vote={movie.vote} />
              </Link>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}

export default TrendingMovies;
