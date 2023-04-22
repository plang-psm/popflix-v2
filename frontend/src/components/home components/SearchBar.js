import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard';

function SearchBar() {
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const [movieData, setMovieData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  // Fetch movies.
  async function fetchMovies(input) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${input}&page=1&include_adult=false`
    );
    const data = await res.json();
    if (data.results) {
      // Passing data into an array of custom objects.
      setMovieData(
        data.results.map((movie) => {
          return {
            key: movie.id,
            id: movie.id,
            poster: movie.poster_path,
            backdrop: movie.backdrop_path,
            title: movie.title,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            popularity: movie.popularity,
            overview: movie.overview,
            release_date: movie.release_date,
            added: false,
          };
        })
      );
    }
  }

  // // Renders movies upon search.
  const movieElements = movieData.map((movie) => {
    return (
      <MovieCard
        key={movie.id}
        id={movie.id}
        poster={movie.poster}
        backdrop={movie.backdrop}
        title={movie.title}
        vote_average={movie.vote_average}
        vote_count={movie.vote_count}
        popularity={movie.popularity}
        overview={movie.overview}
        release_date={movie.release_date}
        // addFavorite={() => addFavorite(movie)}
        // added={movie.added}
      />
    );
  });

  // // Fetches the movies with the users input.
  useEffect(() => {
    fetchMovies(searchInput);
  }, [searchInput]);

  return (
    <div className='z-40 search-bar absolute top-18 left-0 flex flex-col justify-center items-center w-full'>
      <div className='input-container w-full'>
        <input
          className='p-4 w-full bg-red-700 text-white'
          type='search'
          placeholder='Search movies'
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>

      <ul className='movie-container w-full'>{movieElements}</ul>
    </div>
  );
}

export default SearchBar;
