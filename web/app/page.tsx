import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Component() {
  return (
    <div className='flex flex-col min-h-screen bg-white w-full'>
      <div className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                  Welcome to MyApp
                </h1>
                <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                  The best app for managing your tasks and projects.
                </p>
              </div>

              <div className='space-x-4'>
                <Button asChild variant='outline'>
                  <Link href='/login'>Get Started</Link>
                </Button>
                <Button asChild>
                  <Link href='/blog'>Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
