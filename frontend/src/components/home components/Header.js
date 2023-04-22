import React from 'react' 
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <div className='header-container p-4 my-14'>
        <div className="title pb-5 text-center">
        <h1 className='my-2 text-6xl font-bold uppercase text-red-700'>Welcome</h1>
        <h2 className='my-2 text-xl uppercase'>Grab some popcorn and</h2>
        <h3 className='my-2 text-xl uppercase'><span className='text-4xl uppercase text-red-700 font-semibold'>Browse</span> through your favorite movies and shows</h3>
        <h2 className='my-2 text-xl uppercase'>Create your own <span className='text-4xl uppercase text-red-700 font-semibold'>Watchlist</span></h2>
        <button className='p-3 my-2 border-2 border-red-700 uppercase' onClick={() => navigate('/signup')}>Sign up</button>
        </div>
    </div>
  )
}

export default Header
