import React from 'react';
import { Link } from 'react-router-dom';
import { ReviewBarABS } from '../../util/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';

function HomeMovieCarousel({ category, movieData }) {
  return (
    <div className='trending-container py-5'>
      <h1 className='pb-4 text-2xl'>{category}</h1>
      {/* Swiper configuration settings for carousel */}
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
          {movieData.map((movie, index) => (
            <SwiperSlide key={index}>
              <Link to={`/movie/${movie.mediaId}`}>
                <picture>
                  <source type='image/webp' srcSet={`${movie.poster}.webp`} />
                  <source type='image/jpeg' srcSet={`${movie.poster}.jpeg`} />
                  <img
                    className='object-cover w-[167px] h-[250px]'
                    loading='lazy'
                    fetchpriority='low'
                    srcSet={`
                      ${movie.poster}.jpg?width=100 100w,
                      ${movie.poster}.jpg?width=200 200w`
                    }
                    src={`
                  ${movie.poster}`}
                    alt={`${
                      movie.title === undefined
                        ? 'No title image'
                        : `${movie.title} image`
                    }`}
                  />
                </picture>

                <ReviewBarABS vote={movie.vote} />
              </Link>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}

export default HomeMovieCarousel;
