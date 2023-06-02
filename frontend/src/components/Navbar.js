import { useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu, AiOutlineKey } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './home components/SearchBar';
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

  // sets search to true when window size is at 767px
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 767) {
  //       setSearch(true);
  //     } else {
  //       setSearch(false);
  //     }
  //   };
  //   handleResize();
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

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
      <div className='flex justify-between content-center p-2 md:p-4'>
        <Link to='/'>
          <h1 className='tracking-wider p-2 text-2xl md:text-4xl text-white hover:text-red-700 font-bold'>
            POPFLIIX
          </h1>
        </Link>
        <div className='nav-links'>
          <ul className='gap-x-4 hidden md:flex'>
            <li
              className='p-4 text-white font-semibold hover:text-red-700 cursor-pointer'
              onClick={() => navigate('/')}
            >
              Home
            </li>
            {user ? (
              <li
                className='p-4 text-white font-semibold hover:text-red-700 cursor-pointer'
                onClick={() => navigate('/watchlist')}
              >
                Profile
              </li>
            ) : (
              ''
            )}

            {user ? (
              <li>
                <button
                  className='p-4 text-white font-semibold hover:text-red-700 cursor-pointer'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li
                className='p-4 text-white font-semibold hover:text-red-700 cursor-pointer'
                onClick={() => navigate('/users/login')}
              >
                Log in
              </li>
            )}

            <li className='' onClick={handleSeach}>
              {
                <AiOutlineKey className='m-4 font-bold text-white cursor-pointer text-2xl' />
              }
            </li>
          </ul>
        </div>

        {/* ********** MOBILE NAV ********** */}
        {/* md:hidden - hides at 767px */}
        <div className='p-3 md:hidden flex'>
          <AiOutlineKey
            className='mx-2 font-bold text-white cursor-pointer text-2xl'
            onClick={handleSeach}
          />
          <AiOutlineMenu
            className='mx-2 hover:text-red-700 cursor-pointer text-2xl'
            onClick={handleNav}
          />
        </div>
      </div>
      <div className='search sm:flex h-full'>
        {search && (
          <SearchBar
            handleSearch={handleSeach}
            handleSearchRoute={handleSearchRoute}
          />
        )}
      </div>

      <div
        className={
          !nav
            ? 'md:hidden fixed z-50 left-0 top-0 w-[100%] h-full border-r border-r-gray-700 bg-[#0A0A0A] transition-all text-center'
            : 'md:hidden fixed left-[-100%]'
        }
      >
        <div className='nav-header flex justify-between content-center'>
          <Link to='/'>
            <h1 className='tracking-wider p-6 text-2xl font-bold w-100'>
              POPFLIIX
            </h1>
          </Link>
          <AiOutlineClose
            size={25}
            className='my-auto mx-4 hover:text-red-700 cursor-pointer'
            onClick={handleNav}
          />
        </div>

        <ul className='pt-6 uppercase'>
          <li
            className='px-6 py-4 border-b border-gray-600 hover:text-red-700 cursor-pointer'
            onClick={() => handleRoute('/')}
          >
            Home
          </li>
          {user ? (
            <li
              className='px-6 py-4 border-b border-gray-600  hover:text-red-700 cursor-pointer'
              onClick={() => handleRoute('/watchlist')}
            >
              Profile
            </li>
          ) : (
            ''
          )}
          {user ? (
            <li
              className='px-6 py-4 border-b border-gray-600  hover:text-red-700 cursor-pointer'
              onClick={handleLogout}
            >
              Logout
            </li>
          ) : (
            <li
              className='px-6 py-4 border-b border-gray-600 hover:text-red-700 cursor-pointer'
              onClick={() => handleRoute('/users/login')}
            >
              Log in
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
