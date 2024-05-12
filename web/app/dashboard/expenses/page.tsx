import { DataContextProvider } from 'components/context/data-provider';
import LayoutHeader from '@/components/layout/header';

import ExpensesSummary from './summary';
// import ExpenseTable from './table';
import AddButton from '@/components/atoms/add-button';
import MySpeedDial from '@/components/organisms/MySpeedDial';

const title = 'Expense.fyi – Expenses';
const description = 'Effortlessly Track and Manage Expenses.';

export const metadata = {
  title,
  description,
};

export default async function Page() {
  return (
    <>
      <LayoutHeader title='expenses' />
      {/* <DataContextProvider name='expenses'> */}
      <div className='w-full overflow-x-auto p-4 pt-3'>
        {/* <ExpensesSummary /> */}
        {/* <ExpenseTable /> */}
        {/* <AddButton /> */}
        <MySpeedDial />
      </div>
      {/* </DataContextProvider> */}
    </>
  );
}
