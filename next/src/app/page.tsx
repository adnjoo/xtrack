import { auth } from '@clerk/nextjs';

import MySpeedDial from '@/app/components/MySpeedDial';
import ExpenseTable from '@/app/components/ExpenseTable';
import MyTabs from '@/app/components/MyTabs';
import BarChart from '@/app/components/BarChart';

export default function Home() {
  const { userId } = auth();

  return (
    <>
      <section className='mx-auto mt-12 max-w-4xl overflow-x-auto p-1 sm:p-4'>
        <MyTabs tab1={<ExpenseTable />} tab2={<BarChart />} />
      </section>
      {userId && <MySpeedDial />}
    </>
  );
}
