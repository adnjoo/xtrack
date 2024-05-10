'use client';

import { useUser } from '@/hooks/useUser';
import { login, signup } from './actions';

export default function LoginPage() {
  const user = useUser();
  if (!user) return (
    <form className='mt-8 flex flex-col gap-4'>
      <label htmlFor='email'>Email:</label>
      <input id='email' name='email' type='email' required />
      <label htmlFor='password'>Password:</label>
      <input id='password' name='password' type='password' required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  );

  return <p>You are logged in</p>;
}
