import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillFacebook, AiFillInstagram, AiFillTwitterSquare } from 'react-icons/ai';
import { FaImdb } from 'react-icons/fa';
import { BsFillPlayFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import { ReviewBar } from '../util/utils';

function MediaCard({ mediaArr, genres, media, credits, suggested, addMedia, trailerKey }) {
  const BACKDROP_IMG = 'https://image.tmdb.org/t/p/w500';
  const POSTER_IMG = 'https://image.tmdb.org/t/p/w200';
  const NOIMAGE =
    'https://images.unsplash.com/photo-1469982866068-278880140412?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  // Returns the year for media release dates
  const getYear = (date) => {
    const movieDate = new Date(date);
    return movieDate.getFullYear().toString();
  };

  // Returns seaon or seasons for the tv page.
  const returnSeason = (season) => {
    return season > 1 ? 'seasons' : 'season';
  };

  return (
    <>
      <div className="container w-full mx-auto  px-2 md:text-xl">
        <div className="backdrop-container relative mx-auto text-center font-thin flex flex-col md:flex-row md:justify-around">
          <div className="absolute top-0 w-screen">
            <picture>
              <source
                type="image/webp"
                srcSet={`${mediaArr.backdrop_path == null ? NOIMAGE : BACKDROP_IMG + mediaArr.backdrop_path}.webp`}
              />
              <source
                type="image/jpeg"
                srcSet={`${mediaArr.backdrop_path == null ? NOIMAGE : BACKDROP_IMG + mediaArr.backdrop_path}.jpeg`}
              />
              <img
                className="object-cover w-full opacity-10"
                srcSet={`
            ${mediaArr.backdrop_path == null ? NOIMAGE : BACKDROP_IMG + mediaArr.backdrop_path}.jpg?width=100 100w,
            ${mediaArr.backdrop_path == null ? NOIMAGE : BACKDROP_IMG + mediaArr.backdrop_path}.jpg?width=200 200w,
            ${mediaArr.backdrop_path == null ? NOIMAGE : BACKDROP_IMG + mediaArr.backdrop_path}.jpg?width=400 400w,
            ${mediaArr.backdrop_path == null ? NOIMAGE : BACKDROP_IMG + mediaArr.backdrop_path}.jpg?width=800 800w
            `}
                src={
                  mediaArr.backdrop_path == null ? NOIMAGE : BACKDROP_IMG + mediaArr.backdrop_path
                }
                alt={`${mediaArr.title === undefined ? 'No title for image' : `${mediaArr.title} image`}`}
              />
            </picture>
          </div>
        </div>
        <div className="max-w-[1100px] mx-auto">
          <div className="top-container relative pt-24 px-4">
            <div className="media-heading w-full flex flex-col justify-center content-center md:flex-row">
              <div className="media-image mx-auto">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${mediaArr.poster_path === null ? NOIMAGE : POSTER_IMG + mediaArr.poster_path}.webp`}
                  />
                  <source
                    type="image/jpeg"
                    srcSet={`${mediaArr.poster_path === null ? NOIMAGE : POSTER_IMG + mediaArr.poster_path}.jpeg`}
                  />
                  <img
                    srcSet={`
                    ${mediaArr.poster_path === null ? NOIMAGE : POSTER_IMG + mediaArr.poster_path}.jpg?width=100 100w,
                    ${mediaArr.poster_path === null ? NOIMAGE : POSTER_IMG + mediaArr.poster_path}.jpg?width=200 200w,
                    ${mediaArr.poster_path === null ? NOIMAGE : POSTER_IMG + mediaArr.poster_path}.jpg?width=300 300w
                  `}
                    src={
                      mediaArr.poster_path === null ? NOIMAGE : POSTER_IMG + mediaArr.poster_path
                    }
                    alt={`${mediaArr.title === undefined ? 'No title for image' : `${mediaArr.title} image`}`}
                    className=" mx-auto w-[250px] h-[400px]"
                    loading="lazy"
                  />
                </picture>
              </div>

              <div className="media-description my-2 md:my-auto w-full mx-auto md:mx-4 text-center md:text-center md:max-w-[500px]">
                <h1 className="title text-3xl font-bold">
                  {mediaArr.original_title || mediaArr.name}
                </h1>
                <div className="detail-container my-4 mx-auto flex flex-row flex-wrap justify-around items-center md:justify-between max-w-[350px]">
                  <p className="font-thin">
                    {getYear(mediaArr.release_date || mediaArr.first_air_date)}
                  </p>
                  <p className="font-thin">
                    {mediaArr.number_of_seasons
                      ? `${mediaArr.number_of_seasons} ${returnSeason(mediaArr.number_of_seasons)}`
                      : `${mediaArr.runtime} mins`}
                  </p>

                  {trailerKey === null ? (
                    <p className="flex flex-rowitems-center">No Trailer</p>
                  ) : (
                    <button className=" hover:text-red-600 font-normal">
                      <Link to={`https://www.youtube.com/watch?v=${trailerKey}`} target="_blank">
                        <p className="flex flex-rowitems-center">
                          <BsFillPlayFill className="text-2xl" />
                          Play Trailer
                        </p>
                      </Link>
                    </button>
                  )}
                </div>

                <div className="genre-container max-w-[350px] my-2 mx-auto flex flex-row flex-wrap justify-evenly md:justify-around">
                  {genres.map((genre, index) => (
                    <p
                      className="py-1 px-3 m-1 md:my-[2px] md:ml-0 md:mr-2 bg-slate-900"
                      key={index}
                    >
                      {genre.name}
                    </p>
                  ))}
                </div>

                <div className="watchlist-button">
                  <button
                    className="bg-red-700 hover:bg-red-600 p-2 font-normal my-2 w-full max-w-[350px]"
                    onClick={addMedia}
                  >
                    Add to watchlist
                  </button>
                </div>
                <div className="media-socials w-full p-4  flex justify-around max-w-[275px] md:max-w-none mx-auto md:mx-0 md:pl-0 md:justify-center">
                  <i>
                    <Link to={`https://www.facebook.com/${media.facebook_id}`} target="_blank">
                      <AiFillFacebook
                        size="40px"
                        className="m-2 md:ml-0 text-gray-300 hover:text-white"
                      />
                    </Link>
                  </i>
                  <i>
                    <Link to={`https://www.instagram.com/${media.instagram_id}`} target="_blank">
                      <AiFillInstagram
                        size="40px"
                        className="m-2 md:ml-0 text-gray-300 hover:text-white"
                      />
                    </Link>
                  </i>
                  <i>
                    <Link to={`https://www.twitter.com/${media.twitter_id}`} target="_blank">
                      <AiFillTwitterSquare
                        size="40px"
                        className="m-2 md:ml-0 text-gray-300 hover:text-white"
                      />
                    </Link>
                  </i>
                  <i>
                    <Link to={`https://www.imdb.com/title/${media.imdb_id}`} target="_blank">
                      <FaImdb size="40px" className="m-2 md:ml-0 text-gray-300 hover:text-white" />
                    </Link>
                  </i>
                </div>
              </div>
            </div>
            <div className="w-full md:flex md:justify-between items-center">
              <div className="overview py-4 pr-4 text-start max-w-[720px] w-full">
                <span className="font-bold ">Overview: </span>
                {mediaArr.overview ? mediaArr.overview : 'No overview found'}
              </div>
              <div className="side-info-container flex flex-row justify-evenly items-center md:flex-col md:justify-center min-w-[250px] md:max-w-[350px] md:w-full my-8 bg-slate-900 rounded-2xl font-thin w-full p-2 md:py-0">
                <div className="user-rating max-w-[140px] mx-auto flex justify-around items-center py-4">
                  <ReviewBar vote={mediaArr.vote_average} />
                  <h2>User Rating</h2>
                </div>

                <div className="status-budget-revenue mx-auto pb-4 text-start">
                  <p className="md:my-4">
                    <span className="font-bold">Status: </span> {mediaArr.status}
                  </p>
                  <p className="md:my-4">
                    <span className="font-bold">Budget: </span>
                    {mediaArr.budget || mediaArr.first_air_date}
                  </p>
                  <p className="md:my-4">
                    <span className="font-bold">Revenue: </span>
                    {mediaArr.revenue || mediaArr.last_air_date}
                  </p>
                </div>
              </div>
            </div>

            {/* Media mid */}
            <div className="mid-container my-2 w-full md:flex md:justify-between">
              <div className="credits-container text-center md:w-full">
                {/* Media cast */}
                <h2 className="text-start pb-4 text-2xl font-bold">Casting</h2>
                {credits.length === 0 ? (
                  <div className="h-[250px] w-full flex justify-center items-center">
                    <h2> No Cast Members</h2>
                  </div>
                ) : (
                  <Swiper
                    slidesPerView={2}
                    spaceBetween={5}
                    freeMode={true}
                    modules={[FreeMode]}
                    breakpoints={{
                      450: {
                        slidesPerView: 3,
                        spaceBetween: 5,
                      },
                      700: {
                        slidesPerView: 4,
                        spaceBetween: 5,
                      },
                      900: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                      },
                    }}
                    className="mySwiper"
                  >
                    {/* Media cred */}
                    {credits.map((credit, index) => (
                      <SwiperSlide key={index}>
                        <picture>
                          <source
                            type="image/webp"
                            srcSet={`${credit.profile_path === null ? NOIMAGE : POSTER_IMG + credit.profile_path}.webp`}
                          />
                          <source
                            type="image/jpeg"
                            srcSet={`${credit.profile_path === null ? NOIMAGE : POSTER_IMG + credit.profile_path}.jpeg`}
                          />
                          <img
                            className="object-cover mx-auto w-full h-[250px]"
                            loading="lazy"
                            srcSet={`
                          ${credit.profile_path === null ? NOIMAGE : POSTER_IMG + credit.profile_path}.jpg?width=100 100w,
                          ${credit.profile_path === null ? NOIMAGE : POSTER_IMG + credit.profile_path}.jpg?width=200 200w,
                          ${credit.profile_path === null ? NOIMAGE : POSTER_IMG + credit.profile_path}.jpg?width=300 300w
                          `}
                            src={
                              credit.profile_path === null
                                ? NOIMAGE
                                : POSTER_IMG + credit.profile_path
                            }
                            alt={`${
                              credit.title === undefined
                                ? 'No title image'
                                : `${credit.title} image`
                            }`}
                          />
                        </picture>
                        <div
                          className="h-full w-full
                    "
                        >
                          <h3>{credit.character}</h3>
                          <h3>
                            <span className="font-thin">{credit.original_name}</span>
                          </h3>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>

            {/* Media suggest */}
            <div className="bottom-container w-full md:flex my-8 border-t-[.001px] py-8 border-gray-100">
              <div className="suggestion-container text-center w-full">
                <h2 className="text-start pb-4 text-2xl font-bold">Suggestions</h2>
                {suggested.length === 0 ? (
                  <div className="h-[200px] flex justify-center items-center">
                    <h2> No Suggested Movies</h2>
                  </div>
                ) : (
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    freeMode={true}
                    modules={[FreeMode]}
                    breakpoints={{
                      300: {
                        slidesPerView: 2,
                        spaceBetween: 5,
                      },
                      450: {
                        slidesPerView: 3,
                        spaceBetween: 5,
                      },
                      700: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                      },
                    }}
                    className="mySwiper"
                  >
                    {suggested.map((media, index) => (
                      <SwiperSlide key={index} className="h-full">
                        <Link to={`/${media.media_type}/${media.id}`}>
                          <picture>
                            <source
                              type="image/webp"
                              srcSet={`${media.backdrop_path === null ? NOIMAGE : BACKDROP_IMG + media.backdrop_path}.webp`}
                            />
                            <source
                              type="image/jpeg"
                              srcSet={`${media.backdrop_path === null ? NOIMAGE : BACKDROP_IMG + media.backdrop_path}.jpeg`}
                            />
                            <img
                              className="object-cover w-full h-[200px]"
                              loading="lazy"
                              srcSet={`
                          ${media.backdrop_path === null ? NOIMAGE : BACKDROP_IMG + media.backdrop_path}.jpg?width=100 100w,
                          ${media.backdrop_path === null ? NOIMAGE : BACKDROP_IMG + media.backdrop_path}.jpg?width=200 200w,
                          ${media.backdrop_path === null ? NOIMAGE : BACKDROP_IMG + media.backdrop_path}.jpg?width=300 300w
                        `}
                              src={
                                media.backdrop_path === null
                                  ? NOIMAGE
                                  : BACKDROP_IMG + media.backdrop_path
                              }
                              alt={`${
                                media.title === undefined || media.name
                                  ? 'No title image'
                                  : `${media.title || media.name} image`
                              }`}
                            />
                          </picture>
                          <h3>{media.title || media.name}</h3>
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MediaCard;
