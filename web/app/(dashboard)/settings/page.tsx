'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/client';
import Avatar from './avatar';

export default function AccountForm() {
  const { user } = useAuth();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single();

      console.log(data, error, status);

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      // alert('Error loading user data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className='mx-auto max-w-md rounded bg-white p-6 shadow-lg'>
      <Avatar
        uid={user?.id ?? null}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ fullname, username, website, avatar_url: url });
        }}
      />

      <div className='mt-4'>
        <label className='block text-sm font-medium text-gray-700'>Email</label>

        <input
          className='form-input mt-1 block w-full'
          type='text'
          value={user?.email}
          disabled
        />
      </div>

      <div className='mt-4'>
        <label
          className='block text-sm font-medium text-gray-700'
          htmlFor='fullName'
        >
          Full Name
        </label>
        <input
          id='fullName'
          className='form-input mt-1 block w-full border'
          type='text'
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>

      <div className='mt-4'>
        <label
          className='block text-sm font-medium text-gray-700'
          htmlFor='username'
        >
          Username
        </label>
        <input
          id='username'
          className='form-input mt-1 block w-full border'
          type='text'
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className='mt-4'>
        <label
          className='block text-sm font-medium text-gray-700'
          htmlFor='website'
        >
          Website
        </label>
        <input
          id='website'
          className='form-input mt-1 block w-full border'
          type='url'
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className='mt-6'>
        <button
          className={`rounded bg-blue-500 px-4 py-2 font-bold text-white ${
            loading ? 'cursor-not-allowed opacity-50' : ''
          }`}
          onClick={() =>
            updateProfile({ fullname, username, website, avatar_url })
          }
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div className='mt-4'>
        <form action='/auth/signout' method='post'>
          <button
            className='block w-full rounded bg-gray-300 px-4 py-2 font-bold text-gray-800'
            type='submit'
          >
            Sign out
          </button>
        </form>
      </div>
    </section>
  );
}
