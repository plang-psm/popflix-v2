import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';

function NowPlaying(props) {
  let API_IMG = 'https://image.tmdb.org/t/p/original';
  const [nowPlayingArr, setNowPlayingArr] = useState([]);

  // Fetch movies and store in moviesArr.
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${props.api}&page=1&language=en-US`
      );
      const data = await res.json();
      if (data.results) {
        setNowPlayingArr(
          data.results.map((movie) => {
            return {
              key: movie.id,
              poster: movie.backdrop_path,
              title: movie.title,
              vote: movie.vote_average,
              overview: movie.overview,
            };
          })
        );
      }
    };
    fetchMovies();
  }, [props.api]);

  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className='mySwiper'>
        {nowPlayingArr.map((movie, index) => (
          <SwiperSlide key={index}>
            <img
              className='brightness-75'
              src={API_IMG + movie.poster}
              alt='Your alt text'
            />
            <div
              className='movie-info z-50 w-full h-[25%] px-6 lg:p-10
                                absolute text-white 
                                bottom-0 backdrop-blur-sm bg-gray-900/20
                                '
            >
              <h2 className='pt-4 sm:text-2xl lg:text-3xl font-bold'>
                {movie.title}
              </h2>
              <p className='pt-2 invisible sm:visible sm:text-sm'>
                {movie.overview}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default NowPlaying;
