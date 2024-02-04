import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

function MediaCard({
  mediaArr,
  genres,
  media,
  credits,
  suggested,
  addMedia,
  trailerKey,
}) {
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
      <div className='container w-100 max-w-[1000px] mx-auto pt-24 px-2 md:text-xl'>
        <div className='backdrop-container mx-auto text-center font-thin flex flex-col md:flex-row md:justify-around'>
          <div
            style={{
              '--image-url': `url(${BACKDROP_IMG + mediaArr.backdrop_path})`,
            }}
            className='absolute bg-image bg-[image:var(--image-url)] bg-center bg-cover top-0 left-0 w-full h-full opacity-[15%]'
          ></div>
        </div>
        <div className='top-container relative px-4'>
          <div className='media-heading w-full flex flex-col justify-center content-center md:flex-row'>
            <div className='media-image mx-auto w-full'>
              <img
                src={POSTER_IMG + mediaArr.poster_path}
                className='w-full mx-auto max-w-[300px]'
              />
            </div>

            <div className='media-description my-2 md:my-auto w-full mx-auto md:mx-4 text-center md:text-center md:max-w-[500px]'>
              <h1 className='title text-3xl font-bold'>
                {mediaArr.original_title || mediaArr.name}
              </h1>
              <div className='detail-container my-4 mx-auto flex flex-row flex-wrap justify-around items-center md:justify-between max-w-[350px]'>
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

                {trailerKey === null ? (
                  <p className='flex flex-rowitems-center'>No Trailer</p>
                ) : (
                  <button className=' hover:text-red-600 font-normal'>
                    <Link
                      to={`https://www.youtube.com/watch?v=${trailerKey}`}
                      target='_blank'
                    >
                      <p className='flex flex-rowitems-center'>
                        <BsFillPlayFill className='text-2xl' />
                        Play Trailer
                      </p>
                    </Link>
                  </button>
                )}
              </div>

              <div className='genre-container max-w-[350px] my-2 mx-auto flex flex-row flex-wrap justify-evenly md:justify-around'>
                {genres.map((genre) => (
                  <p
                    className='py-1 px-3 m-1 md:my-[2px] md:ml-0 md:mr-2 bg-slate-900'
                    key={genre.name}
                  >
                    {genre.name}
                  </p>
                ))}
              </div>

              <div className='watchlist-button'>
                <button
                  className='bg-red-700 hover:bg-red-600 p-2 font-normal my-2 w-full max-w-[350px]'
                  onClick={addMedia}
                >
                  Add to watchlist
                </button>
              </div>
              <div className='media-socials w-full p-4  flex justify-around max-w-[275px] md:max-w-none mx-auto md:mx-0 md:pl-0 md:justify-center'>
                <i>
                  <Link
                    to={`https://www.facebook.com/${media.facebook_id}`}
                    target='_blank'
                  >
                    <AiFillFacebook
                      size='40px'
                      className='m-2 md:ml-0 text-gray-300 hover:text-white'
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
                      className='m-2 md:ml-0 text-gray-300 hover:text-white'
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
                      className='m-2 md:ml-0 text-gray-300 hover:text-white'
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
                      className='m-2 md:ml-0 text-gray-300 hover:text-white'
                    />
                  </Link>
                </i>
              </div>
            </div>
          </div>
          <div className='w-full md:flex md:justify-between items-center'>
            <div className='overview py-4 pr-4 text-start'>
              <span className='font-bold'>Overview: </span>
              {mediaArr.overview}
            </div>
            <div className='side-info-container flex flex-row justify-evenly items-center md:flex-col md:justify-center min-w-[250px] md:w-full my-8 bg-slate-900 rounded-2xl font-thin w-full p-2 md:py-0'>
              <div className='user-rating max-w-[140px] mx-auto flex justify-around items-center py-4'>
                <ReviewBar vote={mediaArr.vote_average} />
                <h2>User Rating</h2>
              </div>

              <div className='status-budget-revenue mx-auto pb-4 text-start'>
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
              </div>
            </div>
          </div>

          {/* Media mid */}
          <div className='mid-container my-2 w-full md:flex md:justify-between'>
            <div className='credits-container text-center md:w-full'>
              {/* Media cast */}
              <h2 className='text-start font-bold mb-2'>Cast</h2>
              <Swiper
                slidesPerView={2}
                spaceBetween={5}
                freeMode={true}
                modules={[FreeMode]}
                breakpoints={{
                  600: {
                    slidesPerView: 3,
                    spaceBetween: 5,
                  },
                  900: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                  },
                }}
                className='mySwiper'
              >
                {' '}
                {/* Media cred */}
                {credits.map((credit, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className='object-contain w-full h-full'
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
                    <div
                      className='h-full w-full
                    '
                    >
                      <h3>{credit.character}</h3>
                      <h3>
                        <span className='font-thin'>
                          {credit.original_name}
                        </span>
                      </h3>
                    </div>
                    {/* </div> */}
                  </SwiperSlide>
                ))}
              </Swiper>
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
