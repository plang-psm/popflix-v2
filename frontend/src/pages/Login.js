import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function LogIn() {
  const { isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Holds form data
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = form;

  // Updates data if any fields are changed.
  const handleChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Dispatchs data to authslice
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData))
      .unwrap()
      .then((user) => {
        toast.success(`Logged in as ${user.username}`);
        navigate('/');
      })
      .catch(toast.error);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className=''>
      <div className='container w-full h-screen py-14 px-10 flex flex-col justify-center text-black max-w-[525px] mx-auto'>
        <h1 className='tracking-wider p-2 text-4xl text-white font-bold uppercase text-center mb-4'>
          Login
        </h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-center gap-4 w-full relative'
        >
          <input
            data-test='email-input'
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            placeholder='Email'
            className='p-1.5'
            required
          />
          <input
            data-test='pwd-input'
            type={showPassword ? 'text' : 'password'}
            name='password'
            value={password}
            onChange={handleChange}
            placeholder='Password'
            className='p-1.5'
            required
          />
          <button
            className='text-gray-400 p-2 right-0 absolute'
            onClick={() => setShowPassword(!showPassword)}
          >
            Show
          </button>
          <input
            data-test='submit-button'
            type='submit'
            className='p-1.5 bg-red-700 text-white'
          />
        </form>
        <button
          data-test='signup-button'
          className='text-white p-2 my-2 ml-auto'
          onClick={() => navigate('/users/signup')}
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default LogIn;
