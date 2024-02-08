import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillLinkedin, AiFillGithub, AiFillRocket } from 'react-icons/ai';

function Footer() {
  return (
    <div className='min-h-100 py-8 text-center bg-transparent'>
      <div className='socials flex justify-center pt-2'>
        <Link
          to={`https://www.linkedin.com/in/plang-psm/`}
          target='_blank'
          className='p-4'
          aria-label='Link to personal linkedin page'
        >
          <i>
            <AiFillLinkedin className='text-3xl text-gray-300 hover:text-white' />
          </i>
        </Link>
        <Link
          to={`https://github.com/plang-psm`}
          target='_blank'
          className='p-4'
          aria-label='Link to personal github page'
        >
          <i>
            <AiFillGithub className='text-3xl text-gray-300 hover:text-white' />
          </i>
        </Link>
        <Link
          to={`https://plang-psm.github.io/portfolio/`}
          target='_blank'
          className='p-4'
          aria-label='Link to personal portfolio page'
        >
          <i>
            <AiFillRocket className='text-3xl text-gray-300 hover:text-white' />
          </i>
        </Link>
      </div>
      <p
        className='text-md
      '
      >
        Designed and developed by plang-psm
      </p>
    </div>
  );
}

export default Footer;
