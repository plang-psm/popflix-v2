import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromWatchlist } from '../features/watchlist/watchlistSlice';
import { toast } from 'react-toastify';

function WatchlistMovies() {
  const { watchlists } = useSelector((state) => state.watchlists);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Removes media from watchlist
  const removeMedia = (e, id) => {
    e.preventDefault();
    dispatch(removeFromWatchlist(id))
      .unwrap()
      .then(() => {
        toast.success(`Item has been removed.`);
      })
      .catch(toast.error);
    navigate('/');
  };

  return (
    <div className="container w-100 mx-auto px-2">
      {watchlists.map((media) => (
        <div
          className="container rounded-lg bg-slate-900 bg-blend-normal mx-auto my-4 p-4 text-center font-thin 
        flex flex-col justify-center md:flex-row md:justify-around"
          key={media.title}
        >
          <div className="media-container mx-auto md:w-full max-w-[300px]">
            <img src={media.image} className="w-full object-cover" />
          </div>
          <div className="media-description w-full my-auto text-sm sm:text-md">
            <h1 className="title text-xl sm:text-2xl font-normal  m-4">{media.title}</h1>
            <button
              className="bg-gray-700 hover:bg-red-600 uppercase p-2 md:p-4 font-normal m-4"
              onClick={() => navigate(`/${media.type}/${media.mediaId}`)}
            >
              Visit Page
            </button>
            <button
              className="bg-red-700 hover:bg-red-600 uppercase p-2 md:p-4 font-normal m-4"
              onClick={(e) => removeMedia(e, media._id)}
            >
              Remove from watchlist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WatchlistMovies;
