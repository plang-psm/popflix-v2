import { useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu, AiOutlineKey } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

function Navbar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [nav, setNav] = useState(true);
  const [top, setTop] = useState(true);
  const [search, setSearch] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleSeach = () => {
    setSearch(!search);
  };

  const handleLogout = () => {
    setNav(!nav);
    dispatch(logout());
    navigate('/');
  };

  const handleRoute = (link) => {
    setNav(!nav);
    navigate(link);
  };
  const handleSearchRoute = (link) => {
    setSearch(!search);
    navigate(link);
  };

  // sets a background on the nav bar when you begin scrolling
  useEffect(() => {
    const scrollHandler = () => {
      setTop(window.pageYOffset <= 20);
    };
    window.addEventListener('scroll', scrollHandler);
    scrollHandler();

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <nav
      className={`fixed z-50 w-full min-h-100 text-md bg-blend-screen ${
        !top && 'bg-black bg-opacity-40'
      }`}
    >
      {/* ********** DESKTOP NAV ********** */}
      <div className="flex justify-between content-center p-2 md:p-4">
        <Link to="/">
          <h1
            className="tracking-wider p-2 text-2xl md:text-4xl text-white hover:text-red-700 font-bold"
            data-test="nav-title"
          >
            POPFLIIX
          </h1>
        </Link>
        <div className="nav-links">
          <ul className="gap-x-4 hidden md:flex">
            <li
              className="p-4 text-white font-semibold hover:text-red-700 cursor-pointer"
              onClick={() => navigate('/')}
            >
              Home
            </li>
            <li className="p-4 text-white font-semibold cursor-pointer group block">
              Movies
              <div
                className="dropdown-movie hidden group-hover:block relative"
                data-test="desktop-movies-dropdown"
              >
                <ul className="absolute bg-slate-900 p-4 w-[175px]">
                  <li className="py-1">
                    <a
                      href="/moviehome/now_playing"
                      className="text-white hover:text-red-500"
                      data-test="desktop-movies-now-playing"
                    >
                      Now Playing
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      href="/moviehome/top_rated"
                      className="text-white hover:text-red-500"
                      data-test="desktop-movies-top-rated"
                    >
                      Top Rated
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      href="/moviehome/popular"
                      className="text-white hover:text-red-500"
                      data-test="desktop-movies-popular"
                    >
                      Popular
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="p-4 text-white font-semibold cursor-pointer group block">
              TV
              <div
                className="dropdown-tv  hidden group-hover:block relative"
                data-test="desktop-tv-dropdown"
              >
                <ul className="absolute bg-slate-900 p-4 w-[175px]">
                  <li className="py-1">
                    <a
                      href="/tvhome/on_the_air"
                      className="text-white hover:text-red-500"
                      data-test="desktop-tv-on-the-air"
                    >
                      On The Air
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      href="/tvhome/top_rated"
                      className="text-white hover:text-red-500"
                      data-test="desktop-tv-top-rated"
                    >
                      Top Rated
                    </a>
                  </li>
                  <li className="py-1">
                    <a
                      href="/tvhome/popular"
                      className="text-white hover:text-red-500"
                      data-test="desktop-tv-popular"
                    >
                      Popular
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            {user ? (
              <li
                className="p-4 text-white font-semibold hover:text-red-700 cursor-pointer"
                onClick={() => navigate('/watchlist')}
                data-test="desktop-profile"
              >
                Profile
              </li>
            ) : (
              ''
            )}

            {user ? (
              <li>
                <button
                  className="p-4 text-white font-semibold hover:text-red-700 cursor-pointer"
                  onClick={handleLogout}
                  data-test="desktop-logout"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li
                className="p-4 text-white font-semibold hover:text-red-700 cursor-pointer"
                onClick={() => navigate('/users/login')}
                data-test="desktop-login"
              >
                Login
              </li>
            )}

            <li className="" onClick={handleSeach}>
              {
                <AiOutlineKey
                  className="m-4 font-bold text-white cursor-pointer text-2xl"
                  data-test="desktop-search"
                />
              }
            </li>
          </ul>
        </div>

        {/* ********** MOBILE NAV ********** */}
        {/* md:hidden - hides at 767px */}
        <div className="p-3 md:hidden flex">
          <AiOutlineKey
            className="searchbar-icon mx-2 font-bold text-white cursor-pointer text-2xl"
            onClick={handleSeach}
          />
          <AiOutlineMenu
            className="mobile-hamburger-menu mx-2 hover:text-red-700 cursor-pointer text-2xl"
            onClick={handleNav}
            data-test="mobile-hamburger-menu-open"
          />
        </div>
      </div>
      <div className="search sm:flex h-full">
        {search && <SearchBar handleSearch={handleSeach} handleSearchRoute={handleSearchRoute} />}
      </div>

      <div
        className={
          !nav
            ? 'md:hidden fixed z-50 left-0 top-0 w-full h-full border-r border-r-gray-700 bg-[#0A0A0A] transition-all'
            : 'md:hidden fixed left-[-100%]'
        }
      >
        <div className="nav-header flex justify-between content-center">
          <h1
            className="tracking-wider p-6 text-2xl font-bold w-100"
            onClick={() => handleRoute('/')}
            data-test="mobile-nav-title"
          >
            POPFLIIX
          </h1>
          <AiOutlineClose
            size={25}
            className="my-auto mx-4 hover:text-red-700 cursor-pointer"
            onClick={handleNav}
            data-test="mobile-nav-close"
          />
        </div>

        <ul className="pt-6">
          <li
            className="px-6 pb-4 hover:text-red-700 cursor-pointer"
            onClick={() => handleRoute('/')}
            data-test="mobile-home"
          >
            Home
          </li>
          <li className="px-6 pb-4 cursor-pointer group block" onClick={() => navigate('/')}>
            Movies
            <div className="dropdown-movie">
              <ul className="px-4 w-[175px]">
                <li className="py-2">
                  <a
                    href="moviehome/now_playing"
                    className="text-white hover:text-red-500"
                    data-test="mobile-movies-now-playing"
                  >
                    Now Playing
                  </a>
                </li>
                <li className="py-2">
                  <a
                    href="moviehome/top_rated"
                    className="text-white hover:text-red-500"
                    data-test="mobile-movies-top-rated"
                  >
                    Top Rated
                  </a>
                </li>
                <li className="py-2">
                  <a
                    href="moviehome/popular"
                    className="text-white hover:text-red-500"
                    data-test="mobile-movies-popular"
                  >
                    Popular
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="px-6 pb-4 cursor-pointer group block" onClick={() => navigate('/')}>
            TV
            <div className="dropdown-tv">
              <ul className="px-4 w-[175px]">
                <li className="py-2">
                  <a
                    href="/tvhome/on_the_air"
                    className="text-white hover:text-red-500"
                    data-test="mobile-tv-on-the-air"
                  >
                    On The Air
                  </a>
                </li>
                <li className="py-2">
                  <a
                    href="/tvhome/top_rated"
                    className="text-white hover:text-red-500"
                    data-test="mobile-tv-top-rated"
                  >
                    Top Rated
                  </a>
                </li>
                <li className="py-2">
                  <a
                    href="/tvhome/popular"
                    className="text-white hover:text-red-500"
                    data-test="mobile-tv-popular"
                  >
                    Popular
                  </a>
                </li>
              </ul>
            </div>
          </li>
          {user ? (
            <li
              className="px-6 pb-4 hover:text-red-700 cursor-pointer"
              onClick={() => handleRoute('/watchlist')}
              data-test="mobile-profile"
            >
              Profile
            </li>
          ) : (
            ''
          )}
          {user ? (
            <li
              className="px-6 py-4 w-40 mx-auto absolute left-0 right-0 bottom-10 bg-red-700 hover:bg-red-600 cursor-pointer text-center"
              onClick={handleLogout}
              data-test="mobile-logout"
            >
              Logout
            </li>
          ) : (
            <li
              className="px-6 py-4 w-40 mx-auto absolute left-0 right-0 bottom-10 bg-red-700 hover:bg-red-600 cursor-pointer text-center"
              onClick={() => handleRoute('/users/login')}
              data-test="mobile-login"
            >
              Login
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
