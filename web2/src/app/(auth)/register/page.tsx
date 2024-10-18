'use client';

import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';

import { API_URL } from '@/app/(auth)/login/page';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    try {
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
            Accept: 'application/json',
          },
          withCredentials: true,
        }
      );

      console.log('Registered user:', response.data);
      // Redirect or perform any action after successful registration
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    }
  };

  return (
    <Card className='mx-auto max-w-sm animate-in border-4 border-black shadow-lg bg-white'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-4xl font-extrabold text-black'>
          REGISTER
        </CardTitle>
        <CardDescription className='text-lg font-bold text-black'>
          CREATE AN ACCOUNT
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='email' className='text-lg font-bold text-black'>
              EMAIL
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='m@example.com'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-gray-100 border-2 border-black p-4 text-lg font-bold text-black focus:outline-none'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password' className='text-lg font-bold text-black'>
              PASSWORD
            </Label>
            <Input
              id='password'
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='bg-gray-100 border-2 border-black p-4 text-lg font-bold text-black focus:outline-none'
            />
          </div>
          <div className='space-y-2'>
            <Label
              htmlFor='passwordConfirmation'
              className='text-lg font-bold text-black'
            >
              CONFIRM PASSWORD
            </Label>
            <Input
              id='passwordConfirmation'
              type='password'
              required
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className='bg-gray-100 border-2 border-black p-4 text-lg font-bold text-black focus:outline-none'
            />
          </div>
          {error && <p className='text-lg text-red-500 font-bold'>{error}</p>}
          <Button
            type='submit'
            className='w-full bg-black text-white font-bold p-4 border-2 border-black hover:bg-gray-800 shadow-neo-brutal'
          >
            REGISTER
          </Button>
          <Link href='/login'>
            <Button className='mt-4 w-full bg-white text-black font-bold p-4 border-2 border-black hover:bg-gray-100 shadow-neo-brutal'>
              ALREADY HAVE AN ACCOUNT?
            </Button>
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}
