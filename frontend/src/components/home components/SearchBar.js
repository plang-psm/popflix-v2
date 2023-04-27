import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../MovieCard';

function SearchBar() {
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const [movieData, setMovieData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [typeParam, setTypeParam] = useState('movie');
  
  // Fetch movies.
  async function fetchMovies(input) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/${typeParam}?api_key=${API_KEY}&language=en-US&query=${input}&page=1&include_adult=false`
    );
    const data = await res.json();
      // Passing data into an array of custom objects.
      setMovieData(
        data.results.map((movie) => {
          return {
            key: movie.id,
            id: movie.id,
            title: movie.title || movie.name,
          };
        })
      );
  }
  // // Renders movies upon search.
  const movieElements = movieData.map((movie) => {
    return (
      <MovieCard
        key={movie.id}
        id={movie.id}
        title={movie.title}
      />
    );
  });

  // // Fetches the movies with the users input.
  useEffect(() => {
    fetchMovies(searchInput);
  }, [searchInput, typeParam]);

  return (
    <div className='z-40 search-bar absolute top-18 left-0 flex flex-col justify-center items-center w-full opacity-[85%] bg-black'>
      <div className='input-container w-[80%] py-10'>
        <div className="buttons m-2 text-center">
          <button className={`p-2 mx-2 border-red-700 ${typeParam === 'movie' && 'bg-red-700'}`} onClick={() => setTypeParam('movie')}>Movies</button>
          <button className={`p-2 mx-2 border-red-700 ${typeParam === 'tv' && 'bg-red-700'}`} onClick={() => setTypeParam('tv')}>Tv Shows</button>
        </div>
        <input
          className='p-4 w-full bg-gray-900 text-white'
          type='search'
          placeholder='Search movies'
          onChange={(event) => setSearchInput(event.target.value)}
        />
        
        <ul className='movie-container'>{
        movieData.map((data) => (
            <Link to={`/${typeParam}/${data.id}`}>
            <li className='card-container bg-gray-900 border-t border-gray-500 items-center hover:bg-gray-800 opacity-[80%]'>
              <div className='title p-1'>
                <h2 className=''>{data.title}</h2>
              </div>
            </li>
            </Link>
        ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;
