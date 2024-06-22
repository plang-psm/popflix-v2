import React from 'react';
import Header from '../views/Header';
import NowPlaying from '../views/NowPlaying';
import TrendingMovieCarousel from '../views/TrendingMovieCarousel';
import TrendingTvCarousel from '../views/TrendingTvCarousel';
import ScifiMovieCarousel from '../views/ScifiMovieCarousel';
import FamilyMovieCarousel from '../views/FamilyMovieCarousel';

function MovieHome() {
  return (
    <>
      <NowPlaying />
      <Header />
      <TrendingMovieCarousel />
      <TrendingTvCarousel />
      <ScifiMovieCarousel />
      <FamilyMovieCarousel />
    </>
  );
}

export default MovieHome;
