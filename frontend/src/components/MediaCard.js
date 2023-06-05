import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
} from 'react-icons/ai';
import { FaImdb } from 'react-icons/fa';
import { BsFillPlayFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import { ReviewBar } from '../util/utils';

function MediaCard({ mediaArr, genres, media, credits, suggested, addMedia }) {
  const BACKDROP_IMG = 'https://image.tmdb.org/t/p/original';
  const POSTER_IMG = 'https://image.tmdb.org/t/p/w200';
  const NO_IMAGE =
    'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80';

  // Returns the year for media release dates
  const getYear = (date) => {
    const movieDate = new Date(date);
    return movieDate.getFullYear();
  };

  // Returns seaon or seasons for the tv page.
  const returnSeason = (season) => {
    return season > 1 ? 'seasons' : 'season';
  };

  return (
    <>
      <div className='container w-100 max-w-[1000px] mx-auto py-24 px-2 md:text-xl'>
        <div className='backdrop-container mx-auto text-center font-thin flex flex-col md:flex-row md:justify-around'>
          <div
            style={{
              '--image-url': `url(${BACKDROP_IMG + mediaArr.backdrop_path})`,
            }}
            className='absolute bg-image bg-[image:var(--image-url)] bg-center bg-cover top-0 left-0 w-full h-full opacity-[15%]'
          ></div>
        </div>

        {/* Media Descropt */}

        <div className='top-container relative px-4'>
          <div className='media-heading w-full flex flex-col justify-center content-center'>
            <div className='media-image mx-auto md:w-full max-w-[300px]'>
              <img
                src={POSTER_IMG + mediaArr.poster_path}
                className='w-full max-w-[250px]'
              />
            </div>

            <div className='media-description my-2 w-full max-w-[450px] mx-auto text-center'>
              <h1 className='title text-3xl font-bold'>
                {mediaArr.original_title || mediaArr.name}
              </h1>

              <div className='detail-container my-4 mx-auto flex flex-row flex-wrap justify-around items-center'>
                <p className='font-thin'>
                  {getYear(mediaArr.release_date || mediaArr.first_air_date)}
                </p>
                <p className='font-thin'>
                  {mediaArr.number_of_seasons
                    ? `${mediaArr.number_of_seasons} ${returnSeason(
                        mediaArr.number_of_seasons
                      )}`
                    : `${mediaArr.runtime} mins`}
                </p>

                <button
                  className=' hover:text-red-600 font-normal'
                  onClick={addMedia}
                >
                  <p className='flex flex-rowitems-center'>
                    <BsFillPlayFill className='text-2xl' />
                    Play Trailer
                  </p>
                </button>

                {/* <ReviewBar vote={mediaArr.vote_average} /> */}
              </div>

              <div className='watchlist-button'>
                <button
                  className='bg-red-700 hover:bg-red-600 p-2 font-normal my-2 w-full max-w-[300px]'
                  onClick={addMedia}
                >
                  Add to watchlist
                </button>
              </div>

              <div className='genre-container my-2 flex flex-row flex-wrap justify-evenly'>
                {genres.map((genre) => (
                  <p className='py-1 px-3 m-1 bg-slate-900' key={genre.name}>
                    {genre.name}
                  </p>
                ))}
              </div>

              {/* <button
                  className='bg-red-700 hover:bg-red-600 p-2 font-normal my-4'
                  onClick={addMedia}
                >
                  Add to watchlist
                </button>
                <button
                  className=' hover:bg-red-600 p-2 font-normal my-4'
                  onClick={addMedia}
                >
                  Play Trailer
                </button> */}
            </div>

            {/* <p>
                <span className='font-bold'>Release: </span>
                {mediaArr.release_date || mediaArr.number_of_seasons}
              </p>
              <p>
                <span className='font-bold'>Runtime: </span>
                {`${mediaArr.runtime} mins` || `${mediaArr.number_of_episodes}`}
              </p>
              <ReviewBar vote={mediaArr.vote_average} /> */}

            {/* Media Over */}
            {/* <div className='overview'>
              <span className='font-bold  my-2'>Overview: </span>
              {mediaArr.overview}
            </div> */}

            {/* Media ADD */}
            {/* <button
              className='bg-red-700 hover:bg-red-600 p-2 font-normal my-4'
              onClick={addMedia}
            >
              Add to watchlist
            </button> */}

            {/* Media */}
          </div>

          {/* Media mid */}
          <div className='mid-container md:flex my-8'>
            <div className='credits-container md:max-w-[70%] text-center'>
              {/* Media cast */}
              <h2 className='text-start font-bold mb-2'>Cast</h2>
              <Swiper
                slidesPerView={2}
                spaceBetween={10}
                freeMode={true}
                modules={[FreeMode]}
                breakpoints={{
                  450: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                }}
                className='mySwiper'
              >
                {/* Media cred */}
                {credits.map((credit, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className='object-cover w-full max-h-[247px]'
                      src={
                        credit.profile_path !== null
                          ? POSTER_IMG + credit.profile_path
                          : NO_IMAGE
                      }
                      alt={`${
                        credit.title === undefined
                          ? 'No title image'
                          : `${credit.title} image`
                      }`}
                    />
                    <h3>{credit.character}</h3>
                    <h3>
                      <span className='font-thin'>{credit.original_name}</span>
                    </h3>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Media side view */}
            <div className='side-info-container my-8 mx-4 border rounded-2xl font-thin w-full md:pl-4 py-4 md:py-0'>
              {/* <div className='genre flex justify-between items-center md:flex-col md:items-end'> */}
              {/* <h2 className='text-start font-bold mb-2'>Genres:</h2> */}
              {/* {genres.map((genre) => (
                <p className='py-1 px-4 md:my-1 bg-red-700' key={genre.name}>
                  {genre.name}
                </p>
              ))} */}
              {/* </div> */}
              <div className='media-socials p-4 flex justify-evenly max-w-[250px] mx-auto'>
                <i>
                  <Link
                    to={`https://www.facebook.com/${media.facebook_id}`}
                    target='_blank'
                  >
                    <AiFillFacebook
                      size='40px'
                      className=' text-gray-300 hover:text-white'
                    />
                  </Link>
                </i>
                <i>
                  <Link
                    to={`https://www.instagram.com/${media.instagram_id}`}
                    target='_blank'
                  >
                    <AiFillInstagram
                      size='40px'
                      className=' text-gray-300 hover:text-white'
                    />
                  </Link>
                </i>
                <i>
                  <Link
                    to={`https://www.twitter.com/${media.twitter_id}`}
                    target='_blank'
                  >
                    <AiFillTwitterSquare
                      size='40px'
                      className=' text-gray-300 hover:text-white'
                    />
                  </Link>
                </i>
                <i>
                  <Link
                    to={`https://www.imdb.com/title/${media.imdb_id}`}
                    target='_blank'
                  >
                    <FaImdb
                      size='40px'
                      className=' text-gray-300 hover:text-white'
                    />
                  </Link>
                </i>
              </div>

              {/* <div className='status-budget-revenue p-6 md:my-0 flex text-center justify-center md:flex-col md:items-end'>
              <p className='md:my-4'>
                <span className='font-bold'>Status: </span> {mediaArr.status}
              </p>
              <p className='md:my-4'>
                <span className='font-bold'>Budget: </span>
                {mediaArr.budget || mediaArr.first_air_date}
              </p>
              <p className='md:my-4'>
                <span className='font-bold'>Revenue: </span>
                {mediaArr.revenue || mediaArr.last_air_date}
              </p>
            </div> */}
            </div>
          </div>

          {/* Media suggest */}
          <div className='bottom-container md:flex my-8 border-t-[.001px] py-8 border-gray-100'>
            <div className='suggestion-container text-center max-w-full'>
              <h2 className='text-start font-bold mb-2'>Suggestions</h2>
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                freeMode={true}
                modules={[FreeMode]}
                breakpoints={{
                  600: {
                    slidesPerView: 2,
                    spaceBetween: 5,
                  },
                  900: {
                    slidesPerView: 3,
                    spaceBetween: 5,
                  },
                }}
                className='mySwiper'
              >
                {suggested.map((movie, index) => (
                  <SwiperSlide key={index} className='h-full'>
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        className='object-cover w-full max-h-[180px]'
                        src={
                          movie.backdrop_path
                            ? BACKDROP_IMG + movie.backdrop_path
                            : NO_IMAGE
                        }
                        alt={`${
                          movie.title === undefined
                            ? 'No title image'
                            : `${movie.title} image`
                        }`}
                      />
                      <h3>{movie.title}</h3>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MediaCard;
