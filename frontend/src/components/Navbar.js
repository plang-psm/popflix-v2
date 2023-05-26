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
  // sets search to true when window size is at 767px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 767) {
        setSearch(true);
      } else {
        setSearch(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className='fixed z-50 w-full min-h-100 text-xl bg-black bg-opacity-50'>
      {/* ********** DESKTOP NAV ********** */}
      <div className='flex justify-between content-center p-2'>
        <Link to='/'>
          <h1 className='tracking-wider p-2 text-4xl text-white hover:text-red-700 font-bold'>
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

            <li className='rounded-full bg-slate-900 ' onClick={handleSeach}>
              {!search ? (
                <AiOutlineKey
                  size={25}
                  className='m-4 font-bold text-white cursor-pointer '
                />
              ) : (
                <AiOutlineClose
                  size={25}
                  className='m-4 font-bold text-white cursor-pointer '
                />
              )}
            </li>
          </ul>
          <div className='search hidden md:flex h-full'>
            {search && <SearchBar />}
          </div>
        </div>

        {/* ********** MOBILE NAV ********** */}
        {/* md:hidden - hides at 767px */}
        <div className='p-3 md:hidden' onClick={handleNav}>
          {!nav ? (
            <AiOutlineClose
              size={25}
              className='m-2 hover:text-red-700 cursor-pointer'
            />
          ) : (
            <AiOutlineMenu
              size={25}
              className='m-2 hover:text-red-700 cursor-pointer'
            />
          )}
        </div>
      </div>

      <div
        className={
          !nav
            ? 'md:hidden fixed z-50 left-0 top-0 w-[70%] h-full border-r border-r-gray-700 bg-[#0A0A0A] ease-in-out duration-300'
            : 'md:hidden fixed left-[-100%]'
        }
      >
        <Link to='/'>
          <h1 className='tracking-wider p-4 text-4xl font-bold'>POPFLIIX</h1>
        </Link>
        <ul className='pt-6 uppercase'>
          {/* <li className='search'>{search && <SearchBar />}</li> */}
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
          <li className='search md:hidden'>{search && <SearchBar />}</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
