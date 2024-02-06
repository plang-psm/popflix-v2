import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import { EffectFade, Autoplay, Scrollbar } from 'swiper';

function NowPlaying({ movieData }) {
  const navigate = useNavigate();

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
        {movieData.map((movie, mediaId) => (
          <SwiperSlide key={mediaId}>
            <picture>
              <source type='image/webp' srcSet={`${movie.poster}.webp`} />
              <source type='image/jpeg' srcSet={`${movie.poster}.jpeg`} />
              <img
                className='object-cover object-top w-full lg:h-[750px]'
                srcSet={`
                ${movie.poster}.jpg?width=100 100w,
                ${movie.poster}.jpg?width=200 200w,
                ${movie.poster}.jpg?width=400 400w,
                ${movie.poster}.jpg?width=800 800w
                `}
                src={movie.poster}
                alt='Your alt text'
              />
            </picture>
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
