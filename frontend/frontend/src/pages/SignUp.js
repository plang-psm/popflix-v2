import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function SignUp() {
  const { isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const { username, email, password, confirmPassword } = form;

  // Updates data if any fields are changed.
  const handleChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const lowerCase = /[a-z]/g;
  const upperCase = /[A-Z]/g;
  const numbers = /[0-9]/g;
  const special = '[*.!@#$%^&(){}[]:;<>,.?/~_+-=|]';

  // Dispatchs data to authslice
  const handleSubmit = (e) => {
    e.preventDefault();

    // Checks for matching passwaords
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else if (password.length < 8) {
      toast.error('Password must be a minimum of 8 characters');
    } else if (!password.match(lowerCase)) {
      toast.error(`Password must have 1 lowercase character`);
    } else if (!password.match(upperCase)) {
      toast.error(`Password must have 1 uppercase character`);
    } else if (!password.match(numbers)) {
      toast.error(`Password must have 1 number`);
      // } else if (!password.match(special)) {
      //   toast.error(`Password must have 1 special character`);
    } else {
      const userData = {
        username,
        email,
        password,
      };
      dispatch(register(userData))
        .unwrap()
        .then((user) => {
          toast.success(`Registered new user - ${user.username}`);
          navigate('/');
        })
        .catch(toast.error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="">
      <div className="container w-full h-screen py-14 px-10 flex flex-col justify-center text-black max-w-[525px] mx-auto">
        <h1 className="tracking-wider p-2 text-4xl text-white font-bold uppercase text-center mb-4">
          Signup
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center gap-4 w-full relative"
        >
          <input
            data-test="username-input"
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Username"
            className="p-1.5"
            required
          />
          <input
            data-test="email-input"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            className="p-1.5"
            required
          />
          <input
            data-test="pwd-input"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            className="p-1.5"
            required
          />
          <input
            data-test="confirm-pwd-input"
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Password"
            className="p-1.5"
            required
          />
          {/* <button

            className='text-gray-400 p-2 right-0 absolute'
            onClick={() => setShowPassword(!showPassword)}
          >
            Show
          </button>

          <button
            className='text-gray-400 p-2 right-0 bottom-12 absolute'
            onClick={() => setShowPassword(!showPassword)}
          >
            Show
          </button> */}
          <input data-test="submit-button" type="submit" className="p-1.5 bg-red-700 text-white" />
        </form>
        <button
          data-test="login-button"
          className="text-white p-2 my-2 ml-auto"
          onClick={() => navigate('/users/login')}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default SignUp;
