import Header from '@/components/Header';

export default async function Index() {
  return (
    <div className='flex w-full flex-1 flex-col items-center gap-20'>
      <div className='flex max-w-4xl flex-1 flex-col gap-20 px-3 opacity-0 animate-in mt-8 md:mt-16'>
        <Header />
      </div>
    </div>
  );
}
