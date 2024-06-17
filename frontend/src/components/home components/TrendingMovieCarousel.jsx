import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ReviewBarABS } from '../../util/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import CardSkeleton from './CardSkeleton';

function TrendingMovieCarousel() {
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const API_IMG = 'https://image.tmdb.org/t/p/w200';
  const NOIMAGE =
    'https://images.unsplash.com/photo-1469982866068-278880140412?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const API_MOVIE_WEEK_URL = 'https://api.themoviedb.org/3/trending/movie/week';

  const [trendingMovieData, setTrendingMovieData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    if (!ignore) fetchTrendingMovies();

    return () => (ignore = true);
  }, [API_KEY]);

  const fetchTrendingMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_MOVIE_WEEK_URL}?api_key=${API_KEY}&page=1&language=en-US`);
      const data = res.data;
      if (data.results) {
        setTrendingMovieData(data.results);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      throw new Error(err);
    }
  };

  return (
    <div className="trending-container py-5">
      <h1 className="pb-4 text-2xl">{'Trending Movies'}</h1>
      <div className="h-[250px]">
        {/* Swiper configuration settings for carousel */}
        {loading ? (
          <CardSkeleton />
        ) : (
          <Swiper
            slidesPerView={2}
            spaceBetween={15}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
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
            <div className="relative md:overflow-x-auto">
              {trendingMovieData.map(({ id, poster_path, original_title, vote_average }) => (
                <SwiperSlide key={id}>
                  <Link to={`/movie/${id}`}>
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={`${poster_path == null ? NOIMAGE : API_IMG + poster_path}.webp`}
                      />
                      <source
                        type="image/jpeg"
                        srcSet={`${poster_path === null ? NOIMAGE : API_IMG + poster_path}.jpeg`}
                      />
                      <img
                        className="object-cover w-[167px] h-[250px]"
                        loading="lazy"
                        fetchpriority="low"
                        srcSet={`
                    ${poster_path === null ? NOIMAGE : API_IMG + poster_path}.jpg?width=100 100w,
                    ${poster_path === null ? NOIMAGE : API_IMG + poster_path}.jpg?width=200 200w`}
                        src={`
                ${poster_path === null ? NOIMAGE : API_IMG + poster_path}`}
                        alt={`${
                          original_title === undefined
                            ? 'No title image'
                            : `${original_title} image`
                        }`}
                      />
                    </picture>

                    <ReviewBarABS vote={vote_average} />
                  </Link>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default TrendingMovieCarousel;
