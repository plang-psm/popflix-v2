import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

function SearchBar({ handleSearch, handleSearchRoute }) {
  const API_KEY = process.env.REACT_APP_TMDB_KEY;

  // Stores data
  const [movieData, setMovieData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [typeParam, setTypeParam] = useState('movie');

  // Fetch movies.
  async function fetchMovies(input) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/${typeParam}?api_key=${API_KEY}&language=en-US&query=${input}&page=1&include_adult=false`
    );
    const data = await res.json();
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

  // Fetches media with the users input.
  useEffect(() => {
    fetchMovies(searchInput);
  }, [searchInput, typeParam, fetchMovies]);

  return (
    <div className='z-40 search-bar h-screen absolute top-0 left-0 w-full opacity-[85%] bg-black'>
      <div
        className='close ml-auto m-4 font-bold text-white cursor-pointer text-2xl'
        onClick={handleSearch}
      >
        <AiOutlineClose className='mx-4 my-8 ml-auto font-bold text-white cursor-pointer text-2xl' />
      </div>
      <div className='input-container w-full md:w-[80%] mx-auto'>
        <div className='buttons m-2 text-center'>
          <button
            className={`p-2 mx-2 border-red-700 ${
              typeParam === 'movie' && 'bg-red-700'
            }`}
            onClick={() => setTypeParam('movie')}
          >
            Movies
          </button>
          <button
            className={`p-2 mx-2 border-red-700 ${
              typeParam === 'tv' && 'bg-red-700'
            }`}
            onClick={() => setTypeParam('tv')}
          >
            Tv Shows
          </button>
        </div>
        <input
          className='p-4 w-full bg-gray-900 text-white'
          type='search'
          placeholder='Search movies'
          onChange={(event) => setSearchInput(event.target.value)}
        />

        <ul className='movie-container max-h-[400px] overflow-y-scroll'>
          {movieData.map((data) => (
            <li
              className='card-container bg-gray-900 border-t border-gray-500 items-center hover:bg-gray-800 opacity-[80%]'
              onClick={() => handleSearchRoute(`/${typeParam}/${data.id}`)}
            >
              <div className='title p-1'>
                <h2 className=''>{data.title}</h2>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;
