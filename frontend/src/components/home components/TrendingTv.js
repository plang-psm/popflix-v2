import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';

function TrendingTv(props) {
  const [trendingTvArr, setTrendingTvArr] = useState([]);

  // Fetch movies and store in moviesArr.
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/tv/week?api_key=${props.api}&page=1`
      );
      const data = await res.json();
      if (data.results) {
        setTrendingTvArr(
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
    <div className='trending-container py-8'>
      <h1 className='p-4 text-2xl'>Trending TV Shows</h1>
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
          {trendingTvArr.map((show, index) => (
            <SwiperSlide key={index}>
              <Link to={`tv/${show.key}`}>
                <img
                  className='object-cover h-full'
                  src={props.apiImg + show.poster}
                  alt={`${
                    show.title === undefined
                      ? 'No title image'
                      : `${show.title} image`
                  }`}
                />
                <CircularProgressbar
                  className='w-[75px] absolute'
                  background={true}
                  value={`${Math.ceil((show.vote / 10) * 100)}`}
                  text={`${Math.ceil((show.vote / 10) * 100)}%`}
                  styles={{
                    // Customize the root svg element
                    root: {
                      bottom: '0',
                      padding: '5px',
                    },
                    // Customize the path, i.e. the "completed progress"
                    path: {
                      // Path color
                      stroke:
                        Math.ceil((show.vote / 10) * 100) < 55
                          ? `rgba(255, 0, 0, ${
                              Math.ceil((show.vote / 10) * 100) / 100
                            }`
                          : Math.ceil((show.vote / 10) * 100) < 75
                          ? `rgba(255, 165, 0, ${
                              Math.ceil((show.vote / 10) * 100) / 100
                            }`
                          : `rgba(60, 179, 113, ${
                              Math.ceil((show.vote / 10) * 100) / 100
                            }`,
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: 'butt',
                      // Customize transition animation
                      transition: 'stroke-dashoffset 0.5s ease 0s',
                      // Rotate the path
                      transform: 'rotate(0.25turn)',
                      transformOrigin: 'center center',
                    },
                    // Customize the circle behind the path, i.e. the "total progress"
                    trail: {
                      // Trail color
                      stroke: '#d6d6d6',
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: 'butt',
                      // Rotate the trail
                      transform: 'rotate(0.25turn)',
                      transformOrigin: 'center center',
                    },
                    // Customize the text
                    text: {
                      // Text color
                      fill: 'white',

                      // Text size
                      fontSize: '24px',
                      transform: 'translate(-23px, 8px)',
                    },
                    // Customize background - only used when the `background` prop is true
                    background: {
                      fill: '#000000',
                    },
                  }}
                />
              </Link>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}

export default TrendingTv;
