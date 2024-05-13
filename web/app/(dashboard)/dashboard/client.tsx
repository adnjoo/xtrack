'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
// import { DataContextProvider } from 'components/context/data-provider';
// import ExpensesSummary from './summary';
// import ExpenseTable from './table';
// import AddButton from '@/components/atoms/add-button';
import MySpeedDial from '@/components/organisms/MySpeedDial';
// import { useUser } from '@/hooks/useUser';
import { useAuth } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/client';

export type DashboardBodyProps = {
    data: any;
}

export function DashboardBody({ data }: DashboardBodyProps) {
//   const [expenses, setExpenses] = React.useState<any[]>([]);
//   const [loading, setLoading] = React.useState<boolean>(false);


  return (
    <>
      {/* <DataContextProvider name='expenses'> */}
      <div className='w-full overflow-x-auto p-4 pt-3'>
        {/* {loading && <div>Loading...</div>} */}
        {data &&
          data.map((expense) => (
            <div>
              {expense.title} {expense.amount}
            </div>
          ))}
        {/* <ExpensesSummary /> */}
        {/* <ExpenseTable /> */}
        {/* <AddButton /> */}
        <MySpeedDial />
      </div>
      {/* </DataContextProvider> */}
    </>
  );
}
