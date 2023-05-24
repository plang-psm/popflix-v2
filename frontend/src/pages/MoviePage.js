import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToWatchlist } from '../features/watchlist/watchlistSlice';
import { toast } from 'react-toastify';
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
} from 'react-icons/ai';
import { FaImdb } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import { ReviewBar } from '../util/utils';
import Spinner from '../components/Spinner';

function MoviePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pull movie id from params for request
  // Pull user/isLoading from state
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  let { isLoading } = useSelector((state) => state.auth);

  // Holds and sets data
  const [moviesArr, setMoviesArr] = useState([]);
  const [genres, setGenres] = useState([]);
  const [media, setMedia] = useState([]);
  const [credits, setCredits] = useState([]);
  const [suggested, setSuggested] = useState([]);

  // URL needed to bring images from TMDB API
  const BACKDROP_IMG = 'https://image.tmdb.org/t/p/original';
  const POSTER_IMG = 'https://image.tmdb.org/t/p/w200';
  const NO_IMAGE =
    'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80';

  // Fetch movies and store in moviesArr.
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const data = await res.json();
      setMoviesArr(data);
      setGenres(data.genres);
    };
    fetchMovies();
  }, [id]);

  // Fetch movie socials and store in media.
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const data = await res.json();
      setMedia(data);
    };
    fetchMovies();
  }, [id]);

  // Fetch movie credits and store in credits.
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const data = await res.json();
      setCredits(data.cast);
    };
    fetchMovies();
  }, [id]);

  // Fetch movie reccomendations and store in suggested.
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const data = await res.json();
      setSuggested(data.results);
    };
    fetchMovies();
  }, [id]);

  // Function to add media to our watchlist
  const addMovie = (e) => {
    e.preventDefault();

    // Checks for user first via state
    if (!user) {
      return toast.error('You need an account to create a watchlist');
    }

    let movieData = {
      image: BACKDROP_IMG + moviesArr.backdrop_path,
      title: moviesArr.original_title,
      mediaId: id.toString(),
      type: 'movie',
      user: user._id,
    };
    // dispatch the data to watchlistslice
    dispatch(addToWatchlist(movieData))
      .unwrap()
      .then(() => {
        navigate('/watchlist');
        toast.success('New Movie added!');
      })
      .catch(toast.error);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className='container w-100 max-w-[1000px] mx-auto py-36 px-2 md:text-xl lg:text-2xl'>
        <div className='top-container mx-auto text-center font-thin flex flex-col md:flex-row md:justify-around'>
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
              <ReviewBar vote={moviesArr.vote_average} />
            </div>
            <div className='overview'>
              <span className='font-bold  my-2'>Overview: </span>
              {moviesArr.overview}
            </div>
            <button
              className='bg-red-700 hover:bg-red-600 p-2 font-normal my-4'
              onClick={addMovie}
            >
              Add to watchlist
            </button>
            <div className='media-socials flex justify-center p-1'>
              <i>
                <Link
                  to={`https://www.facebook.com/${media.facebook_id}`}
                  target='_blank'
                >
                  <AiFillFacebook
                    size='40px'
                    className='m-1 text-gray-300 hover:text-white'
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
                    className='m-1  text-gray-300 hover:text-white'
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
                    className='m-1  text-gray-300 hover:text-white'
                  />
                </Link>
              </i>
              <i>
                <Link
                  to={`https://www.imdb.com/${media.imdb_id}`}
                  target='_blank'
                >
                  <FaImdb
                    size='40px'
                    className='m-1  text-gray-300 hover:text-white'
                  />
                </Link>
              </i>
            </div>
          </div>
        </div>
        <div className='mid-container md:flex my-8'>
          <div className='credits-container md:max-w-[70%] text-center'>
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

          <div className='side-info-container font-thin w-full pl-4'>
            <div className='genre my-8 md:my-0 flex justify-between flex-wrap items-center md:flex-col md:items-end'>
              {' '}
              <h2 className='text-start font-bold mb-2 w-1/5'>Genres:</h2>{' '}
              {genres.map((genre) => (
                <p className='p-1.5 md:my-1 bg-red-700' key={genre.name}>
                  {genre.name}
                </p>
              ))}
            </div>
            <div className='status-budget-revenue my-8 md:my-0 flex text-center justify-between md:flex-col md:items-end pb-2'>
              <p className='md:my-1'>
                {' '}
                <span className='font-bold'>Status: </span> {moviesArr.status}
              </p>
              <p className='md:my-1'>
                {' '}
                <span className='font-bold'>Budget: </span> {moviesArr.budget}
              </p>
              <p className='md:my-1'>
                {' '}
                <span className='font-bold'>Revenue: </span> {moviesArr.revenue}
              </p>
            </div>
          </div>
        </div>

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
    </>
  );
}

export default MoviePage;
