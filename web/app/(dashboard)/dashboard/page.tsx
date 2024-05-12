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

export default function Dashboard() {
  const { user } = useAuth();
  const supabase = createClient();
  const [expenses, setExpenses] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const getExpenses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('expenses')
        .select()
        .eq('user_id', user?.id);
      if (error) {
        console.error('Error fetching notes:', error.message);
      } else {
        setExpenses(data || []);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
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
        {loading && <div>Loading...</div>}
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
