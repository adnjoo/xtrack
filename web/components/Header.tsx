export default function Header() {
  return (
    <div className='flex flex-col items-center gap-16'>
      <h1 className='sr-only'>XTrack</h1>
      <p className='mx-auto max-w-xl text-center text-3xl !leading-tight lg:text-4xl'>
        The fastest way to GSD with{' '}
        <a
          href='https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs'
          target='_blank'
          className='font-bold hover:underline'
          rel='noreferrer'
        >
          Xtrack
        </a>{' '}
      </p>
      <div className='my-8 w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent p-[1px]' />
    </div>
  );
}
