// import { DataContextProvider } from 'components/context/data-provider';
// import ExpensesSummary from './summary';
// import ExpenseTable from './table';
// import AddButton from '@/components/atoms/add-button';
import { createServerClient } from '@supabase/ssr';
import MySpeedDial from '@/components/organisms/MySpeedDial';
import { useAuth } from '@/utils/supabase/auth';
import { createClient } from '@/utils/supabase/server';
import { useAuthServer } from '@/utils/supabase/useAuthServer';
import { DashboardBody } from './client';

const getExpenses = async () => {
  const supabase = createClient();
  const user = await useAuthServer();
  try {
    const { data, error } = await supabase
      .from('expenses')
      .select()
      .eq('user_id', user?.id);

    return data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
  }
};

export default async function Dashboard() {
  const data = await getExpenses();

  return (
    <>
      <DashboardBody data={data} />
    </>
  );
}
