import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { SubmitButton } from '@/app/login/submit-button';
import { createClient } from '@/utils/supabase/server';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/notes');
  };

  const signUp = async (formData: FormData) => {
    'use server';

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/notes');
  };

  return (
    <div className='grid mt-16'>
      <div className='w-full max-w-md border-2 border-black p-8'>
        <Link
          href='/'
          className='mb-8 flex items-center space-x-2 text-black no-underline hover:underline'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='15 18 9 12 15 6' />
          </svg>
          <span>Back</span>
        </Link>

        <form className='space-y-6'>
          <label
            htmlFor='email'
            className='block text-sm font-bold uppercase tracking-wider'
          >
            Email
          </label>
          <input
            className='block w-full border border-black bg-white px-4 py-2 placeholder-black'
            name='email'
            placeholder='you@example.com'
            required
          />

          <label
            htmlFor='password'
            className='block text-sm font-bold uppercase tracking-wider'
          >
            Password
          </label>
          <input
            className='block w-full border border-black bg-white px-4 py-2 placeholder-black'
            type='password'
            name='password'
            placeholder='••••••••'
            required
          />

          <SubmitButton
            formAction={signIn}
            className='block w-full border border-black bg-white px-4 py-2 text-black hover:bg-black hover:text-white'
            pendingText='Signing In...'
          >
            Sign In
          </SubmitButton>

          <SubmitButton
            formAction={signUp}
            className='block w-full border border-black bg-white px-4 py-2 text-black hover:bg-black hover:text-white'
            pendingText='Signing Up...'
          >
            Sign Up
          </SubmitButton>

          {searchParams?.message && (
            <p className='mt-4 border border-black p-4 text-center'>
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
