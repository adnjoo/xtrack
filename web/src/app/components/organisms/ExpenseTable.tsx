'use client';

import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { Tooltip } from 'react-tooltip';
import { Table } from 'flowbite-react';
import { FaArrowUp } from 'react-icons/fa';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { MdEdit, MdDelete } from 'react-icons/md';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';

import { classNames, calculateTZOffset } from '@/app/lib/utils';
import MyModal from '@/app/components/atoms/MyModal';
import ExpenseForm from '@/app/components/organisms/ExpenseForm';
import { SkeletonTable } from '@/app/components/molecules/SkeletonTable';
import { sortExpensesByDate } from '@/app/lib/utils';
import { SortOrder } from '@/app/lib/constants';

export default function ExpenseTable() {
  const today = useMemo(() => new Date(), []);

  const [data, setData] = useState<any>([]);
  const [sortOrder, setSortOrder] = useState(SortOrder.DESC);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [propExpense, setPropExpense] = useState<any>(null);
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: new Date(today.getFullYear(), today.getMonth(), 1).toISOString(),
    endDate: new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).toISOString(),
  });

  const { getToken } = useAuth();
  const {
    status,
    data: sortedData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      try {
        const { adjustedStartDate, adjustedEndDate } =
          await calculateTZOffset(dateValue);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/expenses` as string,
          {
            headers: { Authorization: `Bearer ${await getToken()}` },
            params: {
              startDate: adjustedStartDate,
              endDate: adjustedEndDate,
            },
          }
        );
        // console.log(res.data);
        const sortedData = sortExpensesByDate(res.data, SortOrder.DESC);
        return sortedData;
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (status === 'success') {
      setData(sortedData);
    }
  }, [status, sortedData]);

  useEffect(() => {
    refetch();
  }, [dateValue, refetch]);

  const handleSortByDate = () => {
    if (sortOrder === SortOrder.DESC) {
      setData(sortExpensesByDate(data, SortOrder.ASC));
    } else {
      setData(sortExpensesByDate(data, SortOrder.DESC));
    }
    setSortOrder(sortOrder === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC);
  };

  const handleDelete = async (id: number) => {
    if (
      window.confirm('Are you sure you want to delete this expense?') === false
    ) {
      return;
    }
    const token = await getToken();
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/expenses/delete/${id}` as string,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Expense deleted successfully', response.data);
      refetch();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEditModal = (id: number) => {
    setPropExpense(data.find((expense: any) => expense.id === id));
    setOpenEditModal(true);
  };

  const handleValueChange = (newValue: DateValueType) => {
    // console.log('newValue:', newValue);
    setDateValue(newValue);
  };

  const handleDownload = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/expenses/export`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob', // Set response type to blob to handle file download
        }
      );

      // Create a temporary URL for the blob object and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expenses.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error('Error downloading expenses:', error);
    }
  };

  if (isLoading) {
    return <SkeletonTable />;
  }

  return (
    <div className='min-h-[450px] overflow-x-scroll'>
      <div className='my-4 flex flex-row items-center justify-between'>
        {/* TODO: should move datepicker outside of h-scrolling container */}
        <Datepicker
          containerClassName='relative max-w-[300px]'
          value={dateValue}
          onChange={handleValueChange}
          showShortcuts
        />

        <button
          onClick={handleDownload}
          className='hidden flex-row sm:flex text-red fill-red'
          data-tooltip-id='download'
        >
          <ArrowDownTrayIcon className='mr-2 h-6 w-6 fill-gray' />
        </button>
        <Tooltip id='download' content='Download as .csv' place='right' />
      </div>

      <Table hoverable striped>
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Amount</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>
            <div className='flex items-center justify-between'>
              Date
              <button onClick={handleSortByDate}>
                <FaArrowUp
                  className={classNames(
                    'h-4 w-4 origin-center transition-all duration-100 ease-in-out',
                    sortOrder === 'desc' ? 'rotate-180' : ''
                  )}
                />
              </button>
            </div>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className='sr-only'>Actions</span>
            Actions
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {data.map((expense: any) => (
            <Table.Row
              className='bg-white dark:border-gray-700 dark:bg-gray-800'
              key={expense.id}
            >
              <Table.Cell>{expense.title}</Table.Cell>
              <Table.Cell>{expense.amount}</Table.Cell>
              <Table.Cell>{expense.category}</Table.Cell>
              <Table.Cell>{expense.description}</Table.Cell>
              <Table.Cell>
                {new Date(expense.date).toLocaleDateString(undefined, {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })}
              </Table.Cell>
              <Table.Cell>
                <button onClick={() => handleEditModal(expense.id)}>
                  <MdEdit className='mr-1 h-4 w-4' />
                </button>
                <button onClick={() => handleDelete(expense.id)}>
                  <MdDelete className='h-4 w-4' />
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
          <Table.Row>
            <Table.Cell>Total:</Table.Cell>
            <Table.Cell>
              {data.reduce(
                (acc: number, expense: any) => acc + +expense.amount,
                0
              )}
            </Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      {/* Edit Modal */}
      <MyModal isOpen={openEditModal} setIsOpen={setOpenEditModal}>
        <ExpenseForm setIsOpen={setOpenEditModal} propExpense={propExpense} />
      </MyModal>
    </div>
  );
}
