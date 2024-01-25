import { auth } from '@clerk/nextjs';

import MySpeedDial from '@/app/components/MySpeedDial';
import ExpenseTable from '@/app/components/ExpenseTable';

export default function Home() {
  const { userId } = auth();

  return (
    <>
      <section className='mx-auto mt-12 max-w-3xl p-1 sm:p-4 overflow-x-auto'>
        <ExpenseTable />
      </section>
      {userId && <MySpeedDial />}
    </>
  );
}
