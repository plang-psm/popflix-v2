import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ReviewBarABS } from '../util/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import CardSkeleton from './skeletons/CardSkeleton';

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
    <div className="trending-container mx-auto max-w-[1200px] h-[338px] p-6">
      <h1 className="pb-4 text-2xl font-bold">Trending Movies</h1>
      <div className="">
        {/* Swiper configuration settings for carousel */}
        {loading ? (
          <CardSkeleton />
        ) : (
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            breakpoints={{
              510: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              900: {
                slidesPerView: 6,
                spaceBetween: 10,
              },
            }}
          >
            <div className="relative md:overflow-x-auto">
              {trendingMovieData.map(({ id, poster_path, original_title, vote_average }) => (
                <SwiperSlide key={id}>
                  <Link to={`/movie/${id}`}>
                    <picture className="group block">
                      <source
                        type="image/webp"
                        srcSet={`${poster_path == null ? NOIMAGE : API_IMG + poster_path}.webp`}
                      />
                      <source
                        type="image/jpeg"
                        srcSet={`${poster_path === null ? NOIMAGE : API_IMG + poster_path}.jpeg`}
                      />
                      <img
                        className="object-cover w-full h-[250px]"
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
                      <div className="absolute hidden inset-0 group-hover:flex items-center justify-center cursor-pointer bg-slate-800/90">
                        <p className="font-semibold text-xl text-center px-2">{original_title}</p>
                      </div>
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
