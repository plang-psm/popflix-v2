import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addToWatchlist } from '../features/watchlist/watchlistSlice';
import { toast } from 'react-toastify';
import 'swiper/css';
import 'swiper/css/free-mode';
import MediaCard from '../components/MediaCard';
import MediaSkeleton from '../components/MediaSkeleton';

function TvPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pull show id from params for request
  // Pull user/isLoading from state
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  // Holds and sets data
  const [tvArr, setTvArr] = useState([]);
  const [showsTrailer, setShowsTrailer] = useState([]);
  const [genres, setGenres] = useState([]);
  const [media, setMedia] = useState([]);
  const [credits, setCredits] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(false);

  // URL needed to bring images from TMDB API
  const BACKDROP_IMG = 'https://image.tmdb.org/t/p/original';
  const POSTER_IMG = 'https://image.tmdb.org/t/p/w200';
  const NO_IMAGE =
    'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80';

  // Fetch show socials and store in media.
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      fetchMovies();
      fetchVideos();
      fetchTv();
      fetchCredits();
      fetchSuggested();
    }
    return () => (ignore = true);
  }, [id]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${process.env.REACT_APP_TMDB_KEY}&include_adult=false`
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

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US&api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const data = await res.data;
      const trailers = data.results.filter(
        (show) => show.type.toLowerCase() === 'trailer'
      );
      if (data.results && trailers) {
        setShowsTrailer(trailers[0]?.key);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      throw new Error(err);
    }
  };

  const fetchTv = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const data = await res.data;

      if (data) {
        setTvArr(data);
        setGenres(data.genres);
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
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
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
        `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}&include_adult=false`
      );
      const data = await res.data;

      if (data.results) {
        setSuggested(data.results);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      throw new Error(err);
    }
  };

  // Function to add media to our watchlist
  const addShow = () => {
    // Checks for user first via state
    if (!user) {
      return toast.error('You need an account to create a watchlist');
    }

    let tvData = {
      image: BACKDROP_IMG + tvArr.backdrop_path,
      title: tvArr.name,
      mediaId: id.toString(),
      type: 'tv',
      user: user._id,
    };
    // dispatch the data to watchlistslice
    dispatch(addToWatchlist(tvData))
      .unwrap()
      .then(() => {
        navigate('/watchlist');
        toast.success('New Show added!');
      })
      .catch(toast.error);
  };

  return (
    <>
      {loading ? (
        <MediaSkeleton />
      ) : (
        <MediaCard
          mediaArr={tvArr}
          genres={genres}
          media={media}
          credits={credits}
          suggested={suggested}
          addMedia={() => addShow()}
          trailerKey={showsTrailer}
        />
      )}
    </>
  );
}

export default TvPage;
