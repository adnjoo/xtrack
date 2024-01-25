'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { Table } from 'flowbite-react';
import { FaArrowUp } from 'react-icons/fa';
import { MdEdit, MdDelete } from 'react-icons/md';

import { classNames } from '@/app/lib/utils';

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export const sortExpensesByDate = (expenses: any, sortOrder: SortOrder) => {
  if (sortOrder === SortOrder.DESC) {
    return expenses.sort(
      (a: any, b: any) => +new Date(b.date) - +new Date(a.date)
    );
  } else {
    return expenses.sort(
      (a: any, b: any) => +new Date(a.date) - +new Date(b.date)
    );
  }
};

export default function Component() {
  const [data, setData] = useState<any>([]);
  const [sortOrder, setSortOrder] = useState(SortOrder.DESC);
  const { getToken } = useAuth();

  async function fetchData() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/expenses` as string,
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      // console.log(res.data);
      const sortedData = sortExpensesByDate(res.data, SortOrder.DESC);
      setData(sortedData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSortByDate = () => {
    if (sortOrder === SortOrder.DESC) {
      setData(sortExpensesByDate(data, SortOrder.ASC));
    } else {
      setData(sortExpensesByDate(data, SortOrder.DESC));
    }
    setSortOrder(sortOrder === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this expense?') === false) {
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
      fetchData();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <Table hoverable striped>
      <Table.Head>
        <Table.HeadCell className='sticky top-0' scope='col'>
          Title
        </Table.HeadCell>
        <Table.HeadCell className='sticky top-0' scope='col'>
          Amount
        </Table.HeadCell>
        <Table.HeadCell className='sticky top-0' scope='col'>
          Description
        </Table.HeadCell>
        <Table.HeadCell className='sticky top-0' scope='col'>
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
        <Table.HeadCell className='sticky top-0' scope='col'>
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
            <Table.Cell>
              {expense.title}
            </Table.Cell>
            <Table.Cell>{expense.amount}</Table.Cell>
            <Table.Cell>{expense.description}</Table.Cell>
            <Table.Cell>
              {new Date(expense.date).toLocaleDateString()}
            </Table.Cell>
            <Table.Cell>
              {/* <button>
                <MdEdit className='h-4 w-4' />
              </button> */}
              <button onClick={() => handleDelete(expense.id)}>
                <MdDelete className='h-4 w-4' />
              </button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
