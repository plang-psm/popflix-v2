import React from 'react';
import Header from '../components/home components/Header';
import NowPlaying from '../components/home components/NowPlaying';
import TrendingMovieCarousel from '../components/home components/TrendingMovieCarousel';
import TrendingTvCarousel from '../components/home components/TrendingTvCarousel';
import ScifiMovieCarousel from '../components/home components/ScifiMovieCarousel';
import FamilyMovieCarousel from '../components/home components/FamilyMovieCarousel';

function MovieHome() {
  return (
    <>
      <NowPlaying />

      <div className='min-h-screen pb-14 px-4'>
        <Header />
        <TrendingMovieCarousel />
        <TrendingTvCarousel />
        <ScifiMovieCarousel />
        <FamilyMovieCarousel />
      </div>
    </>
  );
}

export default MovieHome;
