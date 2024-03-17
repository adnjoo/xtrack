import { SignInButton, auth } from '@clerk/nextjs';

import MySpeedDial from '@/app/components/organisms/MySpeedDial';
import TabsHero from '@/app/components/organisms/TabsHero';
import Testimonials from '@/app/components/molecules/Testimonials';

export default function Home() {
  const { userId } = auth();

  if (!userId) {
    return (
      <section className='relative isolate px-6 pt-14 lg:px-8'>
        <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              Track your expenses
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Supercharge your net worth by tracking your expenses.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <SignInButton>
                <button className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                  Get started
                </button>
              </SignInButton>
              <a
                href='/about'
                className='text-sm font-semibold leading-6 text-gray-900'
              >
                Learn more <span aria-hidden='true'>→</span>
              </a>
            </div>
          </div>
        </div>

        <Testimonials />
      </section>
    );
  }

  return (
    <>
      <section className='mx-auto mt-12 max-w-4xl overflow-x-auto p-1 sm:p-4'>
        <TabsHero />
      </section>
      {userId && <MySpeedDial />}
    </>
  );
}
