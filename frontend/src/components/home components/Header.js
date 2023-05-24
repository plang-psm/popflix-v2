import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import { useSelector, useDispatch } from 'react-redux';
import { getWatchlists } from '../../features/watchlist/watchlistSlice';
import EmptyWatchlist from '../EmptyWatchlist';

function Header() {
  const { user } = useSelector((state) => state.auth);
  const { watchlists } = useSelector((state) => state.watchlists);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get watchlist
  useEffect(() => {
    dispatch(getWatchlists());
  }, [dispatch]);

  return (
    <div className='header-container my-4'>
      {user ? (
        <div className='my-watchlist-container mb-8'>
          <h1 className='pb-4 px-4 text-2xl content-center'>My Movies</h1>
          <div className='watchlist-flex flex flex-col md:flex-row justify-center content-center w-screen'>
            <div className='watchlist-slide w-full'>
              {watchlists.length !== 0 ? (
                <Swiper
                  slidesPerView={2}
                  spaceBetween={10}
                  freeMode={true}
                  modules={[FreeMode]}
                  breakpoints={{
                    973: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },

                    1024: {
                      slidesPerView: 5,
                      spaceBetween: 10,
                    },
                  }}
                >
                  <div className='container w-100 h-100 mx-auto px-2'>
                    {watchlists.map((movie) => (
                      <SwiperSlide key={movie.title}>
                        <div className='container max-w-[250px] rounded-lg bg-slate-900 bg-blend-normal mx-auto mb-4 p-2 text-center font-thin'>
                          <div className='media-image mx-auto md:w-full max-w-[250px]'>
                            <img
                              src={movie.image}
                              className='w-full max-w-[250px] h-full object-cover'
                            />
                          </div>
                          <div className='media-description w-full h-100 min-h-[80px] text-sm sm:text-md'>
                            <h1 className='title text-xl py-1 font-normal'>
                              {movie.title}
                            </h1>
                          </div>
                          <button
                            className='bg-gray-700 hover:bg-red-600 uppercase p-2 my-2 font-normal'
                            onClick={() =>
                              navigate(`/${movie.type}/${movie.mediaId}`)
                            }
                          >
                            Visit Content
                          </button>
                        </div>
                      </SwiperSlide>
                    ))}
                  </div>
                </Swiper>
              ) : (
                <EmptyWatchlist />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className='title pb-5 text-center'>
          <h1 className='my-2 text-6xl font-bold uppercase text-red-700'>
            Welcome
          </h1>
          <h2 className='my-2 text-xl uppercase'>Grab some popcorn and</h2>
          <h3 className='my-2 text-xl uppercase'>
            <span className='text-4xl uppercase text-red-700 font-semibold'>
              Browse
            </span>{' '}
            through your favorite movies and shows
          </h3>
          <h2 className='my-2 text-xl uppercase'>
            Create your own{' '}
            <span className='text-4xl uppercase text-red-700 font-semibold'>
              Watchlist
            </span>
          </h2>
          <button
            className='p-3 my-2 border-2 border-red-700 uppercase'
            onClick={() => navigate('/users/signup')}
          >
            Sign up
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
