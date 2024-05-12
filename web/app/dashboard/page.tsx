'use client';

import React, { useEffect } from 'react';
// import { DataContextProvider } from 'components/context/data-provider';
import LayoutHeader from '@/components/layout/header';
// import ExpensesSummary from './summary';
// import ExpenseTable from './table';
// import AddButton from '@/components/atoms/add-button';
import MySpeedDial from '@/components/organisms/MySpeedDial';
// import { useUser } from '@/hooks/useUser';
import { useAuth } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/client';

export default function Page() {
  const [expenses, setExpenses] = React.useState<any[]>([]);
  const supabase = createClient();
  const { user } = useAuth();

  const getExpenses = async () => {
    const { data, error } = await supabase
      .from('expenses')
      .select()
      .eq('user_id', user?.id);
    if (error) {
      console.error('Error fetching notes:', error.message);
    } else {
      setExpenses(data || []);
    }
  };

  React.useEffect(() => {
    if (!user) return;
    getExpenses();
  }, [user]);

  return (
    <>
      <LayoutHeader title='expenses' />
      {/* <DataContextProvider name='expenses'> */}
      <div className='w-full overflow-x-auto p-4 pt-3'>
        {expenses &&
          expenses.map((expense) => (
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
