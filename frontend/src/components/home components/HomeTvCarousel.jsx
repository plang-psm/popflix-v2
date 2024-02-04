import React from 'react';
import { Link } from 'react-router-dom';
import { ReviewBarABS } from '../../util/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';

function HomeTvCarousel({ category, tvData, API_IMG, NO_IMAGE }) {
  return (
    <div className='trending-container p-10'>
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
                <img
                  className='object-cover h-full'
                  src={`
                ${show.poster ? API_IMG + show.poster : NO_IMAGE}`}
                  alt={`${
                    show.title === undefined
                      ? 'No title image'
                      : `${show.title} image`
                  }`}
                />
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
