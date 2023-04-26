import React from 'react';
import { Link } from 'react-router-dom';
import {
  AiFillLinkedin,
  AiFillGithub,
  AiFillRocket,
} from 'react-icons/ai';

function Footer() {
  return (
    <div className=' py-20 text-center bg-red-700'>
      <h3
        className='text-lg
      '
      >
        Designed and developed by plang-psm
      </h3>
      <div className='socials flex justify-center pt-2'>
        <Link
          to={`https://www.linkedin.com/in/plang-psm/`}
          target='_blank'
          className='p-4'
        >
          <i>
            <AiFillLinkedin className='text-3xl text-gray-300 hover:text-white' />
          </i>
        </Link>
        <Link to={`https://github.com/plang-psm`} target='_blank' className='p-4'>
          <i>
            <AiFillGithub className='text-3xl text-gray-300 hover:text-white' />
          </i>
        </Link>
        <Link to={`https://plang-psm.github.io/portfolio/`} target='_blank' className='p-4'>
          <i>
            <AiFillRocket className='text-3xl text-gray-300 hover:text-white' />
          </i>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
