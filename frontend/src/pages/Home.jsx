import React, { useState, useEffect } from 'react';
import Header from '../components/home components/Header';
import NowPlaying from '../components/home components/NowPlaying';
import axios from 'axios';
import HomeMovieCarousel from '../components/home components/HomeMovieCarousel';
import HomeTvCarousel from '../components/home components/HomeTvCarousel';

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const API_IMG = 'https://image.tmdb.org/t/p/w200';
const NO_IMAGE =
    'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80';

// Holds URLs for different searchs
const API_MOVIE_WEEK_URL = 'https://api.themoviedb.org/3/trending/movie/week';
const API_TV_WEEK_URL = 'https://api.themoviedb.org/3/trending/tv/week';
const API_DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie';

function MovieHome() {
  // States to handle movie/show data
  const [trendingMovieData, setTrendingMovieData] = useState([]);
  const [trendingTvData, setTrendingTvData] = useState([]);
  const [trendingScifiData, setTrendingScifiData] = useState([]);
  const [trendingFamilyData, setTrendingFamilyData] = useState([]);
  
  // Fetches Trending movies and stores in our state
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const res = await axios.get(
        `${API_MOVIE_WEEK_URL}?api_key=${API_KEY}&page=1&language=en-US`
      );
      const data = res.data;
      if (data.results) {
        setTrendingMovieData(
          data.results.map((movie) => {
            return {
              category: '',
              mediaId: movie.id,
              poster: movie.poster_path,
              title: movie.title,
              vote: movie.vote_average,
            };
          })
        );
      }
    };
    fetchTrendingMovies();
  }, [trendingMovieData]);

    // Fetches Trending shows and stores in our state
  useEffect(() => {
    const fetchTrendingShows = async () => {
      const res = await axios.get(
        `${API_TV_WEEK_URL}?api_key=${API_KEY}&page=1&language=en-US`
      );
      const data = res.data;
      if (data.results) {
        setTrendingTvData(
          data.results.map((show) => {
            return {
              category: '',
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
  }, [trendingTvData]);

  // Fetches SciFi movies and stores in our state
  useEffect(() => {
    const fetchScifiMovies = async () => {
      const res = await axios.get(
        `${API_DISCOVER_URL}?api_key=${API_KEY}&include_adult=false&sort_by=vote_average.dsc&with_genres=878`
      );
      const data = res.data;
      if (data.results) {
        setTrendingScifiData(
          data.results.map((movie) => {
            return {
              category: '',
              mediaId: movie.id,
              poster: movie.poster_path,
              title: movie.title,
              vote: movie.vote_average,
            };
          })
        );
      }
    };
    fetchScifiMovies();
  }, [trendingScifiData]);

  // Fetches Family movies and stores in our state
  useEffect(() => {
    const fetchFamilyMovies = async () => {
      const res = await axios.get(
        `${API_DISCOVER_URL}?api_key=${API_KEY}&include_adult=false&sort_by=vote_average.dsc&with_genres=10751`
      );
      const data = res.data;
      if (data.results) {
        setTrendingFamilyData(
          data.results.map((movie) => {
            return {
              category: '',
              mediaId: movie.id,
              poster: movie.poster_path,
              title: movie.title,
              vote: movie.vote_average,
            };
          })
        );
      }
    };
    fetchFamilyMovies();
  }, [trendingFamilyData]);

  return (
    <div className='min-h-screen pb-14'>
      <NowPlaying api={API_KEY} apiImg={API_IMG} />
      <Header />
      <HomeMovieCarousel
        category={'Trending Movies'}
        movieData={trendingMovieData}
        API_IMG={API_IMG}
        NO_IMAGE={NO_IMAGE}
      />
      <HomeTvCarousel
        category={'Trending TV Shows'}
        tvData={trendingTvData}
        API_IMG={API_IMG}
        NO_IMAGE={NO_IMAGE}
      />
      <HomeMovieCarousel
        category={'SciFi Movies'}
        movieData={trendingScifiData}
        API_IMG={API_IMG}
        NO_IMAGE={NO_IMAGE}
      />
      <HomeMovieCarousel
        category={'Family Movies'}
        movieData={trendingFamilyData}
        API_IMG={API_IMG}
        NO_IMAGE={NO_IMAGE}
      />
    </div>
  );
}

export default MovieHome;
