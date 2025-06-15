import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromWatchlist } from '../features/watchlist/watchlistSlice';
import { toast } from 'react-toastify';

function WatchlistMovies({ movies }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Removes media from watchlist
  const removeMedia = (id) => {
    dispatch(removeFromWatchlist(id))
      .unwrap()
      .then(() => {
        toast.success(`Item has been removed.`);
      })
      .catch(toast.error);
  };

  return (
    <>
      {movies.map((media) => (
        <div
          className="container rounded-lg bg-slate-900 bg-blend-normal mx-auto my-4 p-8 font-thin"
          key={media.title}
        >
          <div className="md:flex md:justify-between gap-10">
            <div className="media-image md:w-[50%]">
              <img src={media.image} alt={`${media.title} image`} className="w-full h-full" />
            </div>
            <div className="media-information mt-2 md:mt-0 content-center w-100 md:w-[50%] text-center md:text-start">
              <h2 className="title p-2 md:p-4 text-xl font-normal">{media.title}</h2>
              <button
                className="bg-gray-700 hover:bg-red-600 uppercase p-2 md:p-4 font-normal m-4"
                onClick={() => navigate(`/${media.type}/${media.mediaId}`)}
              >
                Visit Page
              </button>
              <button
                className="bg-red-700 hover:bg-red-600 uppercase p-2 md:p-4 font-normal m-4"
                onClick={(e) => removeMedia(media._id)}
              >
                Remove from watchlist
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default WatchlistMovies;
