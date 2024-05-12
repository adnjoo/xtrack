'use client';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Sidebar from '@/components/sidebar';
import { useAuth } from '@/utils/supabase/auth';

// import { apiUrls } from 'lib/apiUrls';
// import { Database } from 'lib/database.types';
// import url from 'constants/url';

// const supabaseOption = {
//   supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//   supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
// };

// export const revalidate = 0;

// async function getUser(cookies: any) {
//   const res = await fetch(`${url.serverApi}/${apiUrls.user.modify}`, {
//     headers: { cookie: cookies },
//   });
//   if (!res.ok) {
//     return {};
//   }
//   return await res.json();
// }

export default function Layout({ children }: any) {
  const { user } = useAuth();

  if (!user) {
    redirect('/');
  }
  //   const supabase = createServerComponentClient<Database>(
  //     { cookies },
  //     supabaseOption
  //   );
  //   const {
  //     data: { session },
  //   } = await supabase.auth.getSession();
  //   const user = await getUser(cookies());

  return (
    <>
      <Sidebar />
      <div className='h-full w-full sm:pl-[64px]'>{children}</div>
    </>
  );
}
