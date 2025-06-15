import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import { useSelector, useDispatch } from 'react-redux';
import { getWatchlists } from '../features/watchlist/watchlistSlice';
import EmptyWatchlist from '../views/EmptyWatchlist';

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
    <div className="header-container max-w-[1200px] mx-auto mt-6">
      {user ? (
        <div className="my-watchlist-container px-4">
          <h1 className="pb-4 text-2xl content-center">My Movies</h1>
          {watchlists.length !== 0 ? (
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              freeMode={true}
              modules={[FreeMode]}
              breakpoints={{
                600: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                973: {
                  slidesPerView: 3,
                  spaceBetween: 5,
                },

                1024: {
                  slidesPerView: 4,
                  spaceBetween: 5,
                },
              }}
            >
              <div className="container">
                {watchlists.map((movie) => (
                  <SwiperSlide key={movie.title}>
                    <div className="container rounded-lg bg-slate-900 bg-blend-normal mx-auto my-4 p-8 md:p-4 text-center font-thin">
                      <div className="media-image mx-auto">
                        <img src={movie.image} className="w-full h-full object-cover" />
                      </div>
                      <h2 className="title md:h-[5em] p-2 md:p-4 text-xl font-normal">
                        {movie.title}
                      </h2>
                      <button
                        className="bg-gray-700 hover:bg-red-600 uppercase p-2 md:p-4 font-normal m-4"
                        onClick={() => navigate(`/${movie.type}/${movie.mediaId}`)}
                      >
                        Visit Page
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
      ) : (
        <div className="title relative text-center h-[400px] max-w-[1200px] mx-auto overflow-hidden">
          <img
            className="absolute top-0 h-[300px] object-cover object-center w-full blur-[2px] opacity-80"
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <div className="absolute top-[5%] my-2 text-center right-0 left-0">
            <h2 className="text-3xl lg:text-6xl font-bold">Your Ticket to the Best Films!</h2>
            <p className="text-lg md:text-xl lg:text-3xl">Join Our Exclusive Movie Watchlist</p>
          </div>
          <div className="absolute bottom-[5%] left-0 right-0">
            <button
              className=" p-3 my-2 bg-red-700 hover:bg-red-700/80 uppercase"
              onClick={() => navigate('/users/signup')}
            >
              Sign up
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
