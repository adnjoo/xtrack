'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { Table } from 'flowbite-react';
import { FaArrowUp } from 'react-icons/fa';

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

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/expenses` as string,
          {
            headers: { Authorization: `Bearer ${await getToken()}` },
          }
        );
        console.log(res.data);
        const sortedData = sortExpensesByDate(res.data, SortOrder.DESC);
        setData(sortedData);
      } catch (error) {
        console.error(error);
      }
    }
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

  return (
    <div className='overflow-x-auto'>
      {sortOrder}
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Amount</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell className='flex items-center justify-between'>
            Date
            <button onClick={handleSortByDate}>
              <FaArrowUp
                className={classNames(
                  'h-4 w-4 origin-center transition-all duration-100 ease-in-out',
                  sortOrder === 'desc' ? 'rotate-180' : ''
                )}
              />
            </button>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className='sr-only'>Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {data.map((expense: any) => (
            <Table.Row
              className='bg-white dark:border-gray-700 dark:bg-gray-800'
              key={expense.id}
            >
              <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                {expense.title}
              </Table.Cell>
              <Table.Cell>{expense.amount}</Table.Cell>
              <Table.Cell>{expense.description}</Table.Cell>
              <Table.Cell>
                {new Date(expense.date).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>
                <a
                  href='#'
                  className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
