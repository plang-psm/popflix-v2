import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReviewBarABS } from '../../util/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import axios from 'axios';

function FamilyMovies(props) {
  const API_URL = 'https://api.themoviedb.org/3/discover/movie';
  const NO_IMAGE =
    'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80';
  const [familyMovies, setFamilyMovies] = useState([]);

  useEffect(() => {
    const fetchRomanticMovies = async () => {
      const res = await axios.get(
        `${API_URL}?api_key=${props.api}&include_adult=false&sort_by=vote_average.dsc&with_genres=10751`
      );
      const data = res.data;
      if (data.results) {
        setFamilyMovies(
          data.results.map((movie) => {
            return {
              // key: movie.id,
              mediaId: movie.id,
              poster: movie.poster_path,
              title: movie.title,
              vote: movie.vote_average,
            };
          })
        );
      }
    };
    fetchRomanticMovies();
  }, [props.api]);

  return (
    <div className='romance-container p-10'>
      <h1 className='pb-4 text-2xl'>Family Movies</h1>
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
          {familyMovies.map((movie, index) => (
            <SwiperSlide key={index}>
              <Link to={`/movie/${movie.key}`}>
                <img
                  className='object-cover h-full'
                  src={`
                  ${movie.poster ? props.apiImg + movie.poster : NO_IMAGE}`}
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

export default FamilyMovies;
