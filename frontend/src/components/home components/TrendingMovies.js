import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReviewBarABS } from '../../util/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import axios from 'axios';

function TrendingMovies(props) {
  const API_URL = 'https://api.themoviedb.org/3/trending/movie/week';
  const [trendingMoviesArr, setTrendingMoviesArr] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const res = await axios.get(
        `${API_URL}?api_key=${props.api}&page=1&language=en-US`
      );
      const data = res.data;
      if (data.results) {
        setTrendingMoviesArr(
          data.results.map((movie) => {
            return {
              key: movie.id,
              mediaId: movie.id,
              poster: movie.poster_path,
              title: movie.title,
              vote: movie.vote_average,
            };
          })
        );
      }
    };
    fetchTrendingMovies();
  }, [props.api]);

  return (
    <div className='trending-container p-10'>
      <h1 className='pb-4 text-2xl'>Trending Movies</h1>
      <Swiper
        slidesPerView={2}
        spaceBetween={15}
        navigation={true}
        modules={[Navigation]}
        className='mySwiper'
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
