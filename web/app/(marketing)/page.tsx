import Link from 'next/link';
import { BookOpenIcon } from 'lucide-react';
import { Icons } from '@/components/icons';
import Features from '@/components/molecules/Features';
import Testimonials from '@/components/molecules/Testimonials';
import { useAuthServer } from '@/utils/supabase/useAuthServer';

export default async function Home() {
  const user = await useAuthServer();

  return (
    <section className='relative isolate px-6 pt-14 '>
      <header className='mx-auto flex max-w-2xl flex-col py-8 sm:py-16 lg:max-w-4xl'>
        <div className='text-center'>
          <h1 className='mt-4	text-4xl font-black leading-[1.15] tracking-[-0.03em] text-black sm:text-5xl sm:leading-[1.15]'>
            Effortlessly Track and Manage{' '}
            <span className='bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent'>
              Expenses.
            </span>
          </h1>
          <div className='mt-10 flex justify-center'>
            <Link
              href='/login'
              className='hover:bg-primary/90 inline-flex h-[34px] items-center justify-center rounded-full bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:shadow'
            >
              Login
            </Link>
            <Link
              href='/blog'
              className='ml-6 inline-flex h-[34px] items-center justify-center gap-2 rounded-full bg-white/0 px-4 py-2.5 text-sm font-medium text-slate-900 ring-1 ring-slate-900/10 hover:bg-gray-100 hover:shadow'
            >
              <Icons.book />
              Learn more <span aria-hidden='true'>→</span>
            </Link>
          </div>
        </div>
        {/* <MyLottie /> */}
      </header>

      <article className='mx-auto flex flex-col items-center justify-center py-8 sm:py-16 lg:max-w-4xl'>
        <h2 className='mb-12 mt-8 text-center text-3xl font-extrabold tracking-[-0.03em] text-black sm:text-4xl'>
          Simple yet,&nbsp;
          <span className='bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent'>
            powerful&nbsp;
          </span>
          features.
        </h2>
        <Features />
      </article>

      <article className='py-8 sm:py-16'>
        <Testimonials />
      </article>
    </section>
  );
}
