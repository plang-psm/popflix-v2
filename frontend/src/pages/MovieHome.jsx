import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MovieAndTvSkeleton from './skeletons/MovieAndTvSkeleton';

const MovieHome = () => {
  const moviesPerPage = 12;
  const [moviesArr, setMoviesArr] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const BACKDROP_IMG = 'https://image.tmdb.org/t/p/w500';
  const { id } = useParams();
  const navigate = useNavigate();
  const pageTitle = id.trim().toUpperCase().replace('_', ' ');
  const NOIMAGE =
    'https://images.unsplash.com/photo-1469982866068-278880140412?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const maxMoviePages = Math.ceil(moviesArr.length / moviesPerPage);
  const startIndex = (currPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currMovies = moviesArr.slice(startIndex, endIndex);

  const previousPageIndex = () => {
    setCurrPage(Math.max(currPage - 1, 1));
  };
  const nextPageIndex = () => {
    setCurrPage(Math.min(currPage + 1, maxMoviePages));
  };

  useEffect(() => {
    let ignore = false;
    if (!ignore) fetchMovies();

    return () => (ignore = true);
  }, [id]);

  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`;

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      const data = res.data.results;

      if (data) {
        setMoviesArr(data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      toast.error(`Error loading data: ${err}`);
    }
  };

  console.log(moviesArr);

  return (
    <>
      {loading ? (
        <MovieAndTvSkeleton />
      ) : (
        <div className="container w-full max-w-[1200px] mx-auto pt-24 px-2 md:text-xl">
          <h1 className="text-3xl font-bold text-center pb-12">{pageTitle}</h1>
          <div className="grid justify-around gap-[2em] md:grid-cols-2 lg:grid-cols-3 ">
            {currMovies.map((movie) => {
              return (
                <div
                  className="relative mx-auto"
                  key={movie.id}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <picture className="w-full group block rounded-3xl">
                    <source
                      type="image/webp"
                      srcSet={`${movie.backdrop_path ? BACKDROP_IMG + movie.backdrop_path : NOIMAGE}.webp`}
                    />
                    <source
                      type="image/jpeg"
                      srcSet={`${movie.backdrop_path ? BACKDROP_IMG + movie.backdrop_path : NOIMAGE}.jpeg`}
                    />
                    <img
                      srcSet={`
                  ${movie.backdrop_path === null ? NOIMAGE : BACKDROP_IMG + movie.backdrop_path}?width=100 100w,
                  ${movie.backdrop_path === null ? NOIMAGE : BACKDROP_IMG + movie.backdrop_path}?width=200 200w,
                  ${movie.backdrop_path === null ? NOIMAGE : BACKDROP_IMG + movie.backdrop_path}?width=300 300w
                `}
                      src={
                        movie.backdrop_path === null ? NOIMAGE : BACKDROP_IMG + movie.backdrop_path
                      }
                      className=" mx-auto w-[350px] h-[400px] object-cover"
                      loading="lazy"
                      alt={`${movie.title} image`}
                    />
                    <div className="absolute hidden inset-0 group-hover:flex items-center justify-center cursor-pointer bg-slate-800/90">
                      <p className="font-semibold text-xl text-center px-2">{movie.title}</p>
                    </div>
                  </picture>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <button
              className="p-4 hover:text-red-500 cursor-pointer"
              onClick={previousPageIndex}
              disabled={currPage === 1}
            >
              Previous
            </button>
            <span>
              Page <span className="text-red-500">{currPage}</span> of {maxMoviePages}
            </span>
            <button
              className="p-4 hover:text-red-500 cursor-pointer"
              onClick={nextPageIndex}
              disabled={currPage === maxMoviePages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieHome;
