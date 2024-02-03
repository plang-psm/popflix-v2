import React from 'react';
import Header from '../components/home components/Header';
import TrendingMovies from '../components/home components/TrendingMovies';
import NowPlaying from '../components/home components/NowPlaying';
import TrendingTv from '../components/home components/TrendingTv';
import ScifiMovies from '../components/home components/ScifiMovies';
import FamilyMovies from '../components/home components/FamilyMovies';

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const API_IMG = 'https://image.tmdb.org/t/p/w200';

function MovieHome() {
  return (
    <div className='min-h-screen pb-14'>
      <NowPlaying api={API_KEY} apiImg={API_IMG} />
      <Header />
      <TrendingMovies api={API_KEY} apiImg={API_IMG} />
      <TrendingTv api={API_KEY} apiImg={API_IMG} />
      <ScifiMovies api={API_KEY} apiImg={API_IMG} />
      <FamilyMovies api={API_KEY} apiImg={API_IMG} />
    </div>
  );
}

export default MovieHome;
