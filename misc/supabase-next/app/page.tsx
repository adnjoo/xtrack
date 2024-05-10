import AuthButton from '@/components/AuthButton';

export default async function Index() {
  return (
    <div className='mt-8 flex w-full flex-1 flex-col items-center gap-20'>
      <AuthButton />
    </div>
  );
}
