'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
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
            Accept: 'application/json',
          },
          withCredentials: true,
        }
      );

      console.log('Logged in user:', response.data);
      // Redirect or perform any action after successful login
      router.push('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', err);
    }
  };

  return (
    <Card className='mx-auto max-w-sm rounded-none border-2 border-black bg-white p-6 shadow-[8px_8px_0_0_#000] animate-in'>
      <CardHeader className='space-y-2'>
        <CardTitle className='text-3xl font-extrabold text-black'>
          Login
        </CardTitle>
        <CardDescription className='text-lg text-black'>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className='mt-4'>
        <form onSubmit={handleLogin} className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='email' className='font-bold text-black'>
              Email
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='m@example.com'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='rounded-none border-2 border-black bg-white text-black'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password' className='font-bold text-black'>
              Password
            </Label>
            <Input
              id='password'
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='rounded-none border-2 border-black bg-white text-black'
            />
          </div>
          {error && <p className='text-red-500'>{error}</p>}
          <Button
            type='submit'
            className='w-full rounded-none shadow-[4px_4px_0_0_#000] hover:shadow-none'
          >
            Login
          </Button>
          <Link href='/register'>
            <Button
              className='mt-4 w-full rounded-none border-2 shadow-[4px_4px_0_0_#000] hover:bg-gray-100'
              variant='secondary'
            >
              Need an account?
            </Button>
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}
