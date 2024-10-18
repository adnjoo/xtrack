import { APP_NAME } from '@/lib/constants';

export default function Header() {
  return (
    <div className='shadow-neo-brutal flex flex-col items-center gap-16 border-4 border-black bg-white p-8'>
      <h1 className='sr-only'>{APP_NAME}</h1>
      <h1 className='mx-auto max-w-xl text-center text-5xl font-extrabold text-black lg:text-6xl'>
        The fastest way to GTD with{' '}
        <span className='inline-block font-extrabold text-black underline underline-offset-4'>
          {APP_NAME}
        </span>
      </h1>
      {/* Animated line */}
      <div className='animate-grow my-8 h-2 w-full bg-black' />
    </div>
  );
}
