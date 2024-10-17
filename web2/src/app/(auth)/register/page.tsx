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
    <Card className='mx-auto max-w-sm animate-in'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold'>Register</CardTitle>
        <CardDescription>
          Enter your details to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className='space-y-4'>
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
          <div className='space-y-2'>
            <Label htmlFor='passwordConfirmation'>Confirm Password</Label>
            <Input
              id='passwordConfirmation'
              type='password'
              required
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          {error && <p className='text-red-500'>{error}</p>}
          <Button type='submit' className='w-full'>
            Register
          </Button>
          <Link href='/login'>
            <Button className='mt-4 w-full' variant='outline'>
              Already have an account?
            </Button>
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}
