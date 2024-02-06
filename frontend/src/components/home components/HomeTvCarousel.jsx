import React from 'react';
import { Link } from 'react-router-dom';
import { ReviewBarABS } from '../../util/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';

function HomeTvCarousel({ category, tvData }) {
  return (
    <div className='trending-container'>
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
          {tvData.map((show, index) => (
            <SwiperSlide key={index}>
              <Link to={`tv/${show.mediaId}`}>
                <picture>
                  <source
                    type='image/webp'
                    srcSet={`${show.poster}.webp`}
                  />
                  <source
                    type='image/jpeg'
                    srcSet={`${show.poster}.jpeg`}
                  />
                  <img
                    className='object-cover w-[1] h-[250px]'
                    loading='lazy'
                    fetchpriority="low"
                    srcSet={`
                    ${show.poster}.jpg?width=100 100w,
                    ${show.poster}.jpg?width=200 200w`
                  }
                    src={`
                ${show.poster}`}
                    alt={`${
                      show.title === undefined
                        ? 'No title image'
                        : `${show.title} image`
                    }`}
                  />
                </picture>
                <ReviewBarABS vote={show.vote} />
              </Link>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}

export default HomeTvCarousel;
