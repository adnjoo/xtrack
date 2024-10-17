'use client';

import axios from 'axios';
import Link from 'next/link';
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
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', err);
    }
  };

  return (
    <Card className='mx-auto max-w-sm animate-in'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold'>Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='m@example.com'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className='text-red-500'>{error}</p>}
          <Button type='submit' className='w-full'>
            Login
          </Button>
          <Link href='/register'>
            <Button className='mt-4 w-full' variant='outline'>
              Need an account?
            </Button>
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}
