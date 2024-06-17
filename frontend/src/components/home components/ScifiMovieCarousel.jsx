import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ReviewBarABS } from '../../util/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import CardSkeleton from './CardSkeleton';

function ScifiMovieCarousel() {
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const API_IMG = 'https://image.tmdb.org/t/p/w200';
  const NOIMAGE =
    'https://images.unsplash.com/photo-1469982866068-278880140412?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const API_DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie';

  const [trendingScifiData, setTrendingScifiData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    if (!ignore) fetchScifiMovies();

    return () => (ignore = true);
  }, [API_KEY]);

  const fetchScifiMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_DISCOVER_URL}?api_key=${API_KEY}&include_adult=false&sort_by=vote_average.dsc&with_genres=878&language=en-US`,
      );
      const data = res.data;
      if (data.results) {
        setTrendingScifiData(data.results);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      throw new Error(err);
    }
  };

  return (
    <div className="trending-container h-[338px] py-5">
      <h1 className="pb-4 text-2xl">{'Trending Movies'}</h1>
      <div className="">
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
              {trendingScifiData.map(({ id, poster_path, original_title, vote_average }) => (
                <SwiperSlide key={id}>
                  <Link to={`/movie/${id}`}>
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={`${poster_path == null ? NOIMAGE : API_IMG + poster_path}.webp`}
                      />
                      <source
                        type="image/jpeg"
                        srcSet={`${poster_path == null ? NOIMAGE : API_IMG + poster_path}.jpeg`}
                      />
                      <img
                        className="object-cover w-[167px] h-[250px]"
                        loading="lazy"
                        fetchpriority="low"
                        srcSet={`
                    ${poster_path == null ? NOIMAGE : API_IMG + poster_path}.jpg?width=100 100w,
                    ${poster_path == null ? NOIMAGE : API_IMG + poster_path}.jpg?width=200 200w`}
                        src={`
                ${poster_path == null ? NOIMAGE : API_IMG + poster_path}`}
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

export default ScifiMovieCarousel;
