import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReviewBarABS } from '../../util/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';

import axios from 'axios';

function TrendingTv(props) {
  const API_URL = 'https://api.themoviedb.org/3/trending/tv/week';
  const [trendingTvArr, setTrendingTvArr] = useState([]);

  // Fetch shows and store in tvArr.
  useEffect(() => {
    const fetchTrendingShows = async () => {
      const res = await axios.get(
        `${API_URL}?api_key=${props.api}&page=1&language=en-US`
      );
      const data = res.data;
      if (data.results) {
        setTrendingTvArr(
          data.results.map((show) => {
            return {
              key: show.id,
              mediaId: show.id,
              poster: show.poster_path,
              title: show.title,
              vote: show.vote_average,
            };
          })
        );
      }
    };
    fetchTrendingShows();
  }, [props.api]);

  return (
    <div className='trending-container p-10'>
      <h1 className='pb-4 text-2xl'>Trending TV Shows</h1>
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
          {trendingTvArr.map((show, mediaId) => (
            <SwiperSlide key={mediaId} className=''>
              <Link to={`tv/${show.mediaId}`}>
                <img
                  className='object-cover h-full'
                  src={props.apiImg + show.poster}
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

export default TrendingTv;
