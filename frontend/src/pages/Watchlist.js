import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getWatchlists } from '../features/watchlist/watchlistSlice';
import { logout } from '../features/auth/authSlice';
import EmptyWatchlist from '../components/EmptyWatchlist';
import WatchlistMovies from '../components/WatchlistMovies';

function Watchlist() {
  // Pull user/isLoading from state
  const { user } = useSelector((state) => state.auth);
  const { watchlists } = useSelector((state) => state.watchlists);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Grabs current watchlist
  useEffect(() => {
    dispatch(getWatchlists());
  }, [dispatch]);

  // Dispatches to log user out
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className='w-full px-4 pt-14 max-w-[1000px] h-100 mx-auto'>
      <div className='container mx-auto'>
        <div className='head-message text-center mt-14'>
          <h2 className='text-white text-3xl my-4'>
            Welcome, {user.username}!
          </h2>
          <div className='flex justify-center'>
            <button
              className='m-4 px-6 py-2 bg-gray-700 hover:bg-red-600 uppercase'
              onClick={() => navigate('/')}
            >
              Browse
            </button>
            <button
              className='m-4 px-6 py-2 bg-red-700 hover:bg-red-600 uppercase'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          {watchlists.length > 0 ? (
            <h3 className='text-2xl my-4'>Here are some of your favorites!</h3>
          ) : (
            ''
          )}
        </div>
        <div className='watchlist-container pt-4'>
          <div className='watchlist-display mb-14'>
            {watchlists.length > 0 ? (
              <WatchlistMovies />
            ) : (
              <div className='text-center h-screen'>
                <EmptyWatchlist />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Watchlist;
