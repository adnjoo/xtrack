'use client';

import axios from 'axios';
import { useState } from 'react';

import { API_URL } from '@/lib/constants';

// Register user function
export const registerUser = async (
  email: string,
  password: string,
  passwordConfirmation: string
) => {
  const response = await axios.post(
    `${API_URL}/users`,
    {
      user: {
        email,
        password,
        password_confirmation: passwordConfirmation,
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

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      const user = await registerUser(email, password, passwordConfirmation);
      console.log('Registered user:', user);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
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
      <input
        type='password'
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        placeholder='Confirm Password'
      />
      <button type='submit'>Register</button>
    </form>
  );
};

export default Register;
