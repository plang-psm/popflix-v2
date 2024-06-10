import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import { EffectFade, Autoplay, Scrollbar } from 'swiper';
import HeroSkeleton from './HeroSkeleton';

function NowPlaying() {
  const API_NOW_PLAYING_URL = 'https://api.themoviedb.org/3/movie/now_playing';
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const API_IMG_ORIGINAL = 'https://image.tmdb.org/t/p/w1280';
  const NO_IMAGE =
    'https://unsplash.com/photos/brown-short-coated-dog-in-orange-hoodie-oU6KZTXhuvk';

  const navigate = useNavigate();
  const [nowPlayingData, setNowPlayingData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    if (!ignore) fetchNowPlayingMovies();

    return () => (ignore = true);
  }, [API_KEY]);

  const fetchNowPlayingMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_NOW_PLAYING_URL}?api_key=${API_KEY}&page=1&language=en-US`,
      );
      const data = res.data;
      if (data.results) {
        setNowPlayingData(data.results);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      throw new Error(err);
    }
  };

  return (
    <>
      {loading ? (
        <HeroSkeleton />
      ) : (
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
          className="mySwiper"
        >
          {nowPlayingData.map(({ id, backdrop_path, title, vote_average, overview }) => (
            <SwiperSlide key={id}>
              <picture>
                <source type="image/webp" srcSet={`${API_IMG_ORIGINAL + backdrop_path}.webp`} />
                <source type="image/jpeg" srcSet={`${API_IMG_ORIGINAL + backdrop_path}.jpeg`} />
                <img
                  className="object-cover object-top w-full lg:h-[750px]"
                  srcSet={`
            ${API_IMG_ORIGINAL + backdrop_path}.jpg?width=100 100w,
            ${API_IMG_ORIGINAL + backdrop_path}.jpg?width=200 200w,
            ${API_IMG_ORIGINAL + backdrop_path}.jpg?width=400 400w,
            ${API_IMG_ORIGINAL + backdrop_path}.jpg?width=800 800w
            `}
                  src={API_IMG_ORIGINAL + backdrop_path}
                  alt="Your alt text"
                />
              </picture>
              <div
                className="movie-info z-50 w-full h-[25%] px-6 lg:p-10
                            absolute text-white 
                            bottom-0 backdrop-blur-sm bg-gray-900/20
                            "
              >
                <h2 className="pt-4 sm:text-2xl lg:text-3xl font-bold">
                  {title}
                  <button
                    className=" hover:text-red-500 uppercase text-sm p-2 mx-2 font-normal"
                    onClick={() => navigate(`/movie/${id}`)}
                  >
                    Visit
                  </button>
                </h2>

                <p className="pt-2 invisible sm:visible sm:text-sm">{overview}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

export default NowPlaying;
