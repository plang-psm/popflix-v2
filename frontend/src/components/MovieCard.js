import React from 'react';
// import ReadMore from '../util/ReadMore';
import { Link } from 'react-router-dom';

function MovieCard(props) {
  const API_IMG = 'https://image.tmdb.org/t/p/w200';

  return (

      <li className='card-container bg-red-700 border border-gray-500 items-center hover:bg-gray-800'>
        {/* <div className="poster"> <img className='object-cover h-15 w-25' src={API_IMG+props.poster} alt='image' /></div> */}
        {/* <div className="movie-info w-full"> */}
        <div className='title p-1'>
          <h2 className=''>{props.title}</h2>
        </div>
        {/* <h2 className=''>title</h2> */}
        {/* <div className="rating-info flex justify-center gap-x-4">
          <p>&#128499;{props.vote_count}</p>
          <p>&#11088;{props.vote_average}</p>
          <p>👤{(props.popularity).toFixed(2)}</p>
        </div> */}
        {/* </div> */}
      </li>

  );
}

export default MovieCard;
