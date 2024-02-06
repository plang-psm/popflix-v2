import React, { useState, useEffect } from 'react';
import Header from '../components/home components/Header';
import NowPlaying from '../components/home components/NowPlaying';
import axios from 'axios';
import HomeMovieCarousel from '../components/home components/HomeMovieCarousel';
import HomeTvCarousel from '../components/home components/HomeTvCarousel';
// import NO_IMAGE from '../images/NO_IMG.jpg';

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const API_IMG = 'https://image.tmdb.org/t/p/w200';
const API_IMG_ORIGINAL = 'https://image.tmdb.org/t/p/w1280';
const NO_IMAGE =
  'https://unsplash.com/photos/brown-short-coated-dog-in-orange-hoodie-oU6KZTXhuvk';

// Holds URLs for different searchs
const API_NOW_PLAYING_URL = 'https://api.themoviedb.org/3/movie/now_playing';
const API_MOVIE_WEEK_URL = 'https://api.themoviedb.org/3/trending/movie/week';
const API_TV_WEEK_URL = 'https://api.themoviedb.org/3/trending/tv/week';
const API_DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie';

function MovieHome() {
  // States to handle movie/show data
  const [nowPlayingData, setNowPlayingData] = useState([]);
  const [trendingMovieData, setTrendingMovieData] = useState([]);
  const [trendingTvData, setTrendingTvData] = useState([]);
  const [trendingScifiData, setTrendingScifiData] = useState([]);
  const [trendingFamilyData, setTrendingFamilyData] = useState([]);

  // Fetch movies and store in moviesArr.
  useEffect(() => {
    const fetchNowPlaying = async () => {
      const res = await axios.get(
        `${API_NOW_PLAYING_URL}?api_key=${API_KEY}&page=1&language=en-US`
      );
      const data = res.data;
      const dataCheck = data.results.map((movie) => {
        return {
          category: '',
          mediaId: movie.id,
          poster: movie.backdrop_path,
          title: movie.title,
          vote: movie.vote_average,
          overview: movie.overview,
        };
      });
      if (data.results && dataCheck !== nowPlayingData) {
        setNowPlayingData(
          data.results.map((movie) => {
            return {
              category: '',
              mediaId: movie.id,
              poster: `${
                movie.backdrop_path === null
                  ? NO_IMAGE
                  : API_IMG_ORIGINAL + movie.backdrop_path
              }`,
              title: movie.title,
              vote: movie.vote_average,
              overview: movie.overview,
            };
          })
        );
      }
    };
    fetchNowPlaying();
  }, []);

  // Fetches Trending movies and stores in our state
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const res = await axios.get(
        `${API_MOVIE_WEEK_URL}?api_key=${API_KEY}&page=1&language=en-US`
      );
      const data = res.data;
      const dataCheck = data.results.map((movie) => {
        return {
          category: '',
          mediaId: movie.id,
          poster: movie.poster_path,
          title: movie.title,
          vote: movie.vote_average,
        };
      });
      if (data.results && dataCheck !== trendingMovieData) {
        setTrendingMovieData(
          data.results.map((movie) => {
            return {
              category: '',
              mediaId: movie.id,
              poster: `${
                movie.poster_path === null
                  ? NO_IMAGE
                  : API_IMG + movie.poster_path
              }`,
              title: movie.title,
              vote: movie.vote_average,
            };
          })
        );
      }
    };

    fetchTrendingMovies();
  }, []);

  // Fetches Trending shows and stores in our state
  useEffect(() => {
    const fetchTrendingShows = async () => {
      const res = await axios.get(
        `${API_TV_WEEK_URL}?api_key=${API_KEY}&page=1&language=en-US`
      );
      const data = res.data;
      const dataCheck = data.results.map((show) => {
        return {
          category: '',
          mediaId: show.id,
          poster: show.poster_path,
          title: show.title,
          vote: show.vote_average,
        };
      });
      if (data.results && dataCheck !== trendingTvData) {
        setTrendingTvData(
          data.results.map((show) => {
            return {
              category: '',
              mediaId: show.id,
              poster: `${
                show.poster_path === null
                  ? NO_IMAGE
                  : API_IMG + show.poster_path
              }`,
              title: show.title,
              vote: show.vote_average,
            };
          })
        );
      }
    };
    fetchTrendingShows();
  }, []);

  // Fetches SciFi movies and stores in our state
  useEffect(() => {
    const fetchScifiMovies = async () => {
      const res = await axios.get(
        `${API_DISCOVER_URL}?api_key=${API_KEY}&include_adult=false&sort_by=vote_average.dsc&with_genres=878&language=en-US`
      );
      const data = res.data;
      const dataCheck = data.results.map((movie) => {
        return {
          category: '',
          mediaId: movie.id,
          poster: movie.poster_path,
          title: movie.title,
          vote: movie.vote_average,
        };
      });
      if (data.results && dataCheck !== trendingScifiData) {
        setTrendingScifiData(
          data.results.map((movie) => {
            return {
              category: '',
              mediaId: movie.id,
              poster: `${
                movie.poster_path === null
                  ? NO_IMAGE
                  : API_IMG + movie.poster_path
              }`,
              title: movie.title,
              vote: movie.vote_average,
            };
          })
        );
      }
    };
    fetchScifiMovies();
  }, []);

  // Fetches Family movies and stores in our state
  useEffect(() => {
    const fetchFamilyMovies = async () => {
      const res = await axios.get(
        `${API_DISCOVER_URL}?api_key=${API_KEY}&include_adult=false&sort_by=vote_average.dsc&with_genres=10751&language=en-US`
      );
      const data = res.data;
      const dataCheck = data.results.map((movie) => {
        return {
          category: '',
          mediaId: movie.id,
          poster: movie.poster_path,
          title: movie.title,
          vote: movie.vote_average,
        };
      });
      if (data.results && dataCheck !== trendingFamilyData) {
        setTrendingFamilyData(
          data.results.map((movie) => {
            return {
              category: '',
              mediaId: movie.id,
              poster: `${
                movie.poster_path === null
                  ? NO_IMAGE
                  : API_IMG + movie.poster_path
              }`,
              title: movie.title,
              vote: movie.vote_average,
            };
          })
        );
      }
    };
    fetchFamilyMovies();
  }, []);

  return (
    <>
      <NowPlaying category={'Now Playing'} movieData={nowPlayingData} />

      <div className='min-h-screen pb-14 px-4'>
        <Header />
        <HomeMovieCarousel
          category={'Trending Movies'}
          movieData={trendingMovieData}
        />
        <HomeTvCarousel
          category={'Trending TV Shows'}
          tvData={trendingTvData}
        />
        <HomeMovieCarousel
          category={'SciFi Movies'}
          movieData={trendingScifiData}
        />
        <HomeMovieCarousel
          category={'Family Movies'}
          movieData={trendingFamilyData}
        />
      </div>
    </>
  );
}

export default MovieHome;
