'use client';
import { useAuth } from '@clerk/nextjs';

import MySpeedDial from '@/app/components/MySpeedDial';
import ExpenseTable from '@/app/components/ExpenseTable';

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <>
      <section className='mx-auto mt-12 max-w-3xl p-1 sm:p-4'>
        <ExpenseTable />
      </section>
      {isSignedIn && <MySpeedDial />}
    </>
  );
}
