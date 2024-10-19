'use client';

import axios from 'axios';
import { useState } from 'react';

import { API_URL } from '@/lib/constants';

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(
    `${API_URL}/users/sign_in`,
    {
      user: {
        email,
        password,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json', // Ensure that JSON is requested
      },
      withCredentials: true,
    }
  );

  return response.data;
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      console.log('Logged in user:', user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
      />
      <button type='submit'>Log In</button>
    </form>
  );
};

export default Login;
