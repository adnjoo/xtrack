export default function Header() {
  return (
    <div className='flex flex-col items-center gap-16'>
      <h1 className='sr-only'>XTrack</h1>
      <p className='mx-auto max-w-xl text-center text-3xl !leading-tight lg:text-4xl'>
        The fastest way to GSD with{' '}
        <span className='inline-block bg-gradient-to-r from-slate-700 via-gray-800 to-black bg-clip-text font-bold text-transparent'>
          Xtrack
        </span>
      </p>
      <div className='my-8 w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent p-[1px]' />
    </div>
  );
}
