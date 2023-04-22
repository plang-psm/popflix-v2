import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
} from 'react-icons/ai';
import { FaImdb } from 'react-icons/fa';

function MoviePage() {
  let { id } = useParams();
  const [moviesArr, setMoviesArr] = useState([]);
  const [genres, setGenres] = useState([]);
  const [media, setMedia] = useState([]);

  const BACKDROP_IMG = 'https://image.tmdb.org/t/p/original';
  const POSTER_IMG = 'https://image.tmdb.org/t/p/w200';

  // Fetch movies and store in moviesArr.
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&page=1`
      );
      const data = await res.json();
      setMoviesArr(data);
      setGenres(data.genres);
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${process.env.REACT_APP_TMDB_KEY}&page=1`
      );
      const data = await res.json();
      setMedia(data);
    };
    fetchMovies();
  }, []);

  // console.log(moviesArr)

  return (
    <>
      <div className='container w-100 mx-auto py-20 px-2 '>
        {/* col | MD - row  - container
      Image
      Description
       - title
       - release date | runtime | review
       - Add to watchlist button
       - social medias
      
      col | md row - conatiner
      cast
      rev | budget | statyst

      production companies ?

       */}
        <div className='top-container max-w-[950px] mx-auto text-center font-thin flex flex-col md:flex-row md:justify-around'>
          <div className='media-image mx-auto md:w-full max-w-[300px]'>
            <img
              src={POSTER_IMG + moviesArr.poster_path}
              className='w-full max-w-[250px]'
            />
          </div>
          <div className='media-description w-full'>
            <h1 className='title text-3xl font-bold  my-2'>
              {moviesArr.original_title}
            </h1>
            <div className='release-runtime-review flex flex-row justify-between items-center my-2'>
              <p>
                <span className='font-bold'>Release: </span>
                {moviesArr.release_date}
              </p>
              <p>
                <span className='font-bold'>Runtime: </span>
                {moviesArr.runtime}mins
              </p>
              <CircularProgressbar
                className='w-[60px]'
                background={true}
                value={`${Math.ceil((moviesArr.vote_average / 10) * 100)}`}
                text={`${Math.ceil((moviesArr.vote_average / 10) * 100)}%`}
                styles={{
                  // Customize the root svg element
                  root: {
                    bottom: '0',
                    padding: '5px',
                  },
                  // Customize the path, i.e. the "completed progress"
                  path: {
                    // Path color
                    stroke:
                      Math.ceil((moviesArr.vote_average / 10) * 100) < 55
                        ? `rgba(255, 0, 0, ${
                            Math.ceil((moviesArr.vote_average / 10) * 100) / 100
                          }`
                        : Math.ceil((moviesArr.vote_average / 10) * 100) < 75
                        ? `rgba(255, 165, 0, ${
                            Math.ceil((moviesArr.vote_average / 10) * 100) / 100
                          }`
                        : `rgba(60, 179, 113, ${
                            Math.ceil((moviesArr.vote_average / 10) * 100) / 100
                          }`,
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',
                    // Customize transition animation
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                    // Rotate the path
                    transform: 'rotate(0.25turn)',
                    transformOrigin: 'center center',
                  },
                  // Customize the circle behind the path, i.e. the "total progress"
                  trail: {
                    // Trail color
                    stroke: '#d6d6d6',
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'butt',
                    // Rotate the trail
                    transform: 'rotate(0.25turn)',
                    transformOrigin: 'center center',
                  },
                  // Customize the text
                  text: {
                    // Text color
                    fill: 'white',

                    // Text size
                    fontSize: '24px',
                    transform: 'translate(-23px, 8px)',
                  },
                  // Customize background - only used when the `background` prop is true
                  background: {
                    fill: '#000000',
                  },
                }}
              />
            </div>
            <div className='overview'>
              <span className='font-bold  my-2'>Overview: </span>
              {moviesArr.overview}
            </div>
            <button className='bg-red-700 p-2 font-normal my-4'>
              Add to watchlist
            </button>
            <div className='media-socials flex justify-center p-1'>
              <i>
                <Link
                  to={`https://www.facebook.com/${media.facebook_id}`}
                  target='_blank'
                >
                  <AiFillFacebook size='40px' className='m-1 text-gray-300 hover:text-white' />
                </Link>
              </i>
              <i>
                <Link
                  to={`https://www.instagram.com/${media.instagram_id}`}
                  target='_blank'
                >
                  <AiFillInstagram size='40px' className='m-1  text-gray-300 hover:text-white' />
                </Link>
              </i>
              <i>
                <Link
                  to={`https://www.twitter.com/${media.twitter_id}`}
                  target='_blank'
                >
                  <AiFillTwitterSquare size='40px' className='m-1  text-gray-300 hover:text-white' />
                </Link>
              </i>
              <i>
                <Link
                  to={`https://www.imdb.com/${media.imdb_id}`}
                  target='_blank'
                >
                  <FaImdb size='40px' className='m-1  text-gray-300 hover:text-white' />
                </Link>
              </i>
            </div>
          </div>
        </div>
      </div>
      <p></p>
    </>
  );
}

export default MoviePage;
