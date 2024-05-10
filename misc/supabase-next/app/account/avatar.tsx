'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | null;
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert('Error uploading avatar!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center space-y-4 rounded-xl border p-4'>
      <h3>Avatar</h3>
      {avatarUrl ? (
        <div className='relative h-[100px] w-[100px] overflow-hidden rounded-full'>
          <Image src={avatarUrl} alt='Avatar' layout='fill' objectFit='cover' />
        </div>
      ) : (
        <div className='h-[100px] w-[100px] rounded-full bg-gray-200'></div>
      )}
      <div className='w-[100px]'>
        <label
          htmlFor='single'
          className='block cursor-pointer rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700'
        >
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          id='single'
          type='file'
          accept='image/*'
          className='hidden'
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
