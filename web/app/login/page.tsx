'use client';

import React from 'react';
import { useUser } from '@/hooks/useUser';
import { login, signup } from './actions';

export default function LoginPage() {
  const user = useUser();

  if (!user) {
    return (
      <div className='mt-10 flex items-center justify-center sm:mt-20'>
        <form className='mb-4 flex flex-col rounded bg-white px-8 pb-8 pt-6 shadow-md'>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='mb-2 block text-sm font-bold text-gray-700'
            >
              Email:
            </label>
            <input
              id='email'
              name='email'
              type='email'
              required
              className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='mb-2 block text-sm font-bold text-gray-700'
            >
              Password:
            </label>
            <input
              id='password'
              name='password'
              type='password'
              required
              className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              formAction={login}
              className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
            >
              Log in
            </button>
            <button
              formAction={signup}
              className='focus:shadow-outline rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none'
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }

  return <p className='text-center text-xl text-gray-800'>You are logged in</p>;
}