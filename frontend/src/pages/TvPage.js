import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToWatchlist } from '../features/watchlist/watchlistSlice';
import { toast } from 'react-toastify';
import 'swiper/css';
import 'swiper/css/free-mode';
import Spinner from '../components/Spinner';
import MediaCard from '../components/MediaCard';

function TvPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pull show id from params for request
  // Pull user/isLoading from state
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  let { isLoading } = useSelector((state) => state.auth);

  // Holds and sets data
  const [tvArr, setTvArr] = useState([]);
  const [showsTrailer, setShowsTrailer] = useState([]);
  const [genres, setGenres] = useState([]);
  const [media, setMedia] = useState([]);
  const [credits, setCredits] = useState([]);
  const [suggested, setSuggested] = useState([]);

  // URL needed to bring images from TMDB API
  const BACKDROP_IMG = 'https://image.tmdb.org/t/p/original';

  // Fetch show socials and store in media.
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${process.env.REACT_APP_TMDB_KEY}&include_adult=false`
      );
      const data = await res.json();
      setMedia(data);
    };
    fetchMovies();
  }, [id]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US&api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const data = await res.json();
      const trailers = data.results.filter(
        (show) => show.type.toLowerCase() === 'trailer'
      );
      setShowsTrailer(trailers[0].key);
    };
    fetchVideos();
  }, [id]);

  // Fetch shows and store in tvArr.
  useEffect(() => {
    const fetchTv = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const data = await res.json();
      setTvArr(data);
      setGenres(data.genres);
    };
    fetchTv();
  }, [id]);

  // Fetch show creadits and store in credits.
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const data = await res.json();
      setCredits(data.cast);
    };
    fetchMovies();
  }, [id]);
  // Fetch reccommened and store in suggestions.
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}&include_adult=false`
      );
      const data = await res.json();
      setSuggested(data.results);
    };
    fetchMovies();
  }, [id]);

  // Function to add media to our watchlist
  const addShow = (e) => {
    e.preventDefault();

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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <MediaCard
        mediaArr={tvArr}
        genres={genres}
        media={media}
        credits={credits}
        suggested={suggested}
        addMedia={() => addShow()}
        trailerKey={showsTrailer}
      />
    </>
  );
}

export default TvPage;
