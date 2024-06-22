import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MovieAndTvSkeleton from './skeletons/MovieAndTvSkeleton';

const TvHome = () => {
  const [tvShowArr, setTvShowArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const BACKDROP_IMG = 'https://image.tmdb.org/t/p/w500';
  const { id } = useParams();
  const navigate = useNavigate();
  const pageTitle = id.trim().toUpperCase().replace('_', ' ');
  const NOIMAGE =
    'https://images.unsplash.com/photo-1469982866068-278880140412?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  useEffect(() => {
    let ignore = false;
    if (!ignore) fetchTvShows();

    return () => (ignore = true);
  }, [id]);

  const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`;

  const fetchTvShows = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      const data = res.data.results;

      if (data) {
        setTvShowArr(data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      toast.error(`Error loading data: ${err}`);
    }
  };

  return (
    <>
      {loading ? (
        <MovieAndTvSkeleton />
      ) : (
        <div className="container w-full max-w-[1200px] mx-auto pt-24 px-2 md:text-xl">
          <h1 className="text-3xl font-bold text-center pb-12">{pageTitle}</h1>
          <div className="flex flex-wrap gap-4">
            {tvShowArr.map((show) => {
              return (
                <div
                  className="relative lg:basis-[21%] mx-auto"
                  key={show.id}
                  onClick={() => navigate(`/tv/${show.id}`)}
                >
                  <picture className="w-full group block rounded-3xl">
                    <source
                      type="image/webp"
                      srcSet={`${show.backdrop_path ? BACKDROP_IMG + show.backdrop_path : NOIMAGE}.webp`}
                    />

                    <source
                      type="image/jpeg"
                      srcSet={`${show.backdrop_path ? BACKDROP_IMG + show.backdrop_path : NOIMAGE}.jpeg`}
                    />
                    <img
                      srcSet={`
                  ${show.backdrop_path === null ? NOIMAGE : BACKDROP_IMG + show.backdrop_path}?width=100 100w,
                  ${show.backdrop_path === null ? NOIMAGE : BACKDROP_IMG + show.backdrop_path}?width=200 200w,
                  ${show.backdrop_path === null ? NOIMAGE : BACKDROP_IMG + show.backdrop_path}?width=300 300w
                `}
                      src={
                        show.backdrop_path === null ? NOIMAGE : BACKDROP_IMG + show.backdrop_path
                      }
                      className=" mx-auto w-[300px] h-[300px] object-cover"
                      loading="lazy"
                      alt={`${show.original_name} image`}
                    />
                    <div className="absolute hidden inset-0 group-hover:flex items-center justify-center cursor-pointer bg-slate-800/90">
                      <p className="font-semibold text-xl text-center px-2">{show.original_name}</p>
                    </div>
                  </picture>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default TvHome;
