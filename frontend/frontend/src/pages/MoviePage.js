import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToWatchlist } from '../features/watchlist/watchlistSlice';
import { toast } from 'react-toastify';
import 'swiper/css';
import 'swiper/css/free-mode';
import Spinner from '../components/Spinner';
import MediaCard from '../components/MediaCard';
import MediaSkeleton from '../components/MediaSkeleton';

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
  const [moviesTrailer, setMoviesTrailer] = useState('');
  const [genres, setGenres] = useState([]);
  const [media, setMedia] = useState([]);
  const [credits, setCredits] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(false);

  // URL needed to bring images from TMDB API
  const BACKDROP_IMG = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      fetchMovies();
      fetchVideos();
      fetchMedia();
      fetchCredits();
      fetchSuggested();
    }
    return () => (ignore = true);
  }, [id]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&include_adult=false`,
      );
      const data = await res.data;

      if (data) {
        setMoviesArr(data);
        setGenres(data.genres);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      throw new Error(err);
    }
  };

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${process.env.REACT_APP_TMDB_KEY}`,
      );

      const data = await res.data.results;
      const trailers = data.filter((movie) => movie.type.toLowerCase() === 'trailer');
      if (trailers.length > 0) {
        setMoviesTrailer(trailers[0].key);
      } else {
        setMoviesTrailer(null);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error(err);
    }
  };

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${process.env.REACT_APP_TMDB_KEY}`,
      );
      const data = await res.data;

      if (data) {
        setMedia(data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      throw new Error(err);
    }
  };

  const fetchCredits = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`,
      );
      const data = await res.data;

      if (data) {
        setCredits(data.cast);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      throw new Error(err);
    }
  };

  const fetchSuggested = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}&include_adult=false`,
      );
      const data = await res.data;

      if (data) {
        setSuggested(data.results);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      throw new Error(err);
    }
  };

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
      {loading ? (
        <MediaSkeleton />
      ) : (
        <MediaCard
          mediaArr={moviesArr}
          genres={genres}
          media={media}
          credits={credits}
          suggested={suggested}
          addMedia={() => addMovie()}
          trailerKey={moviesTrailer}
        />
      )}
    </>
  );
}

export default MoviePage;
