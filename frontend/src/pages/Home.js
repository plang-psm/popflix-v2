import React from 'react';
// import MovieCard from '../components/MovieCard';
// import WatchlistCard from '../components/WatchlistCard';
import Header from "../components/home components/Header"
import TrendingMovies from '../components/home components/TrendingMovies';
import NowPlaying from '../components/home components/NowPlaying';
import TrendingTv from '../components/home components/TrendingTv';
// import dotenv from  'dotenv'

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const API_IMG = 'https://image.tmdb.org/t/p/w200';

function MovieHome() {

  return (
    <div className='min-h-screen'>
      <NowPlaying
        api={API_KEY}
        apiImg={API_IMG}
      />
      <Header />
      <TrendingMovies
        api={API_KEY}
        apiImg={API_IMG}
      />
      <TrendingTv
        api={API_KEY}
        apiImg={API_IMG}
      />
      <h1>ON AIR TV SHOWS</h1>
    </div>
  );
}

export default MovieHome;
