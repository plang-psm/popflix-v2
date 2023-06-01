import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import { EffectFade, Autoplay, Scrollbar } from 'swiper';
import axios from 'axios';

function NowPlaying(props) {
  const navigate = useNavigate();
  const API_URL = 'https://api.themoviedb.org/3/movie/now_playing';
  const API_IMG = 'https://image.tmdb.org/t/p/original';
  const [nowPlayingArr, setNowPlayingArr] = useState([]);

  // Fetch movies and store in moviesArr.
  useEffect(() => {
    const fetchNowPlaying = async () => {
      const res = await axios.get(
        `${API_URL}?api_key=${props.api}&page=1&language=en-US`
      );
      const data = res.data;
      if (data.results) {
        setNowPlayingArr(
          data.results.map((movie) => {
            return {
              mediaId: movie.id,
              poster: movie.backdrop_path,
              title: movie.title,
              vote: movie.vote_average,
              overview: movie.overview,
            };
          })
        );
      }
    };
    fetchNowPlaying();
  }, [props.api]);

  return (
    <>
      <Swiper
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
        }}
        effect={'fade'}
        scrollbar={{
          hide: true,
        }}
        modules={[EffectFade, Scrollbar, Autoplay]}
        className='mySwiper'
      >
        {nowPlayingArr.map((movie, mediaId) => (
          <SwiperSlide key={mediaId}>
            <img
              className='brightness-75 object-cover h-full w-full'
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
                <button
                  className=' hover:text-red-500 uppercase text-sm p-2 mx-2 font-normal'
                  onClick={() => navigate(`/movie/${movie.mediaId}`)}
                >
                  Visit
                </button>
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
