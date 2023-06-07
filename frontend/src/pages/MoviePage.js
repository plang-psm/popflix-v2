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
import MediaCard from '../components/MediaCard';

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
  const [moviesTrailer, setMoviesTrailer] = useState([]);
  const [genres, setGenres] = useState([]);
  const [media, setMedia] = useState([]);
  const [credits, setCredits] = useState([]);
  const [suggested, setSuggested] = useState([]);

  // URL needed to bring images from TMDB API
  const BACKDROP_IMG = 'https://image.tmdb.org/t/p/original';

  // Fetch movies and store in moviesArr.
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&include_adult=false`
      );
      const data = await res.json();
      setMoviesArr(data);
      setGenres(data.genres);
    };
    fetchMovies();
  }, [id]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const data = await res.json();
      const trailers = data.results.filter(
        (movie) => movie.type.toLowerCase() === 'trailer'
      );
      setMoviesTrailer(trailers[0].key);
    };
    fetchVideos();
  }, [id, suggested]);

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
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}&include_adult=false`
      );
      const data = await res.json();
      setSuggested(data.results);
    };
    fetchMovies();
  }, [id]);

  // Function to add media to our watchlist
  const addMovie = () => {
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
      <MediaCard
        mediaArr={moviesArr}
        genres={genres}
        media={media}
        credits={credits}
        suggested={suggested}
        addMedia={() => addMovie()}
        trailerKey={moviesTrailer}
      />
    </>
  );
}

export default MoviePage;
