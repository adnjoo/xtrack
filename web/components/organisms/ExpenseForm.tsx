'use client';

import React from 'react';
import { BsX } from 'react-icons/bs';
import { FaSave } from 'react-icons/fa';
// import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Button, Textarea, Label, TextInput, Datepicker } from 'flowbite-react';
import { useUser } from '@/hooks/useUser';
import { createClient } from '@/utils/supabase/client';

const expenseCategories = [
  '',
  'Other',
  'Groceries',
  'Eating out',
  'Entertainment',
];

export type ExpenseFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  propExpense?: {
    title: string;
    amount: number;
    category: string;
    description: string;
    date: Date;
    id: number | null;
  };
};

export default function ExpenseForm({
  setIsOpen,
  propExpense,
}: ExpenseFormProps) {
  const supabase = createClient();
  const user = useUser();

  console.log('user', user);

  // const { getToken } = useAuth();
  const [expense, setExpense] = React.useState({
    title: propExpense?.title || '',
    amount: propExpense?.amount || 0,
    category: propExpense?.category || '',
    description: propExpense?.description || '',
    date: propExpense?.date || new Date(),
    id: propExpense?.id || null,
  });
  const { refetch } = useQuery({
    queryKey: ['expenses'],
  });

  const handleSubmit = async () => {
    // const token = await getToken();

    const { data, error, status } = await supabase.from('expenses').insert([
      {
        title: expense.title,
        amount: Number(expense.amount),
        category: expense.category,
        description: expense.description,
        date: expense.date,
        user_id: user?.id,
      },
    ]);

    console.log('data', data, status);

    // try {
    //   const response = await axios.post(
    //     `${process.env.NEXT_PUBLIC_API_URL}/expenses/upsert`,
    //     expense,
    //     // {
    //     //   headers: { Authorization: `Bearer ${token}` },
    //     // }
    //   );
    //   console.log('Expense submitted successfully', response.data);
    // } catch (error) {
    //   console.error('Error submitting expense:', error);
    // } finally {
    //   setIsOpen(false);
    //   refetch();
    // }
  };

  const handleInputChange = (e: any) => {
    setExpense((prevData) => {
      if (e instanceof Date) {
        return {
          ...prevData,
          date: e,
        };
      } else {
        const { id, value } = e.target;
        return {
          ...prevData,
          [id]: value,
        };
      }
    });
  };

  return (
    <form className='mx-auto flex max-w-md flex-col gap-4'>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='title' value='Title' />
        </div>
        <TextInput
          id='title'
          type='text'
          placeholder='Title'
          required
          value={expense.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='amount' value='Amount' />
        </div>
        <TextInput
          id='amount'
          type='number'
          placeholder='0.00'
          required
          value={expense.amount}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label
          htmlFor='category'
          className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
        >
          Select an option
        </label>
        <select
          id='category'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          onChange={handleInputChange}
          value={expense.category}
        >
          {expenseCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='description' value='Description' />
        </div>
        <Textarea
          id='description'
          placeholder='Description'
          required
          rows={2}
          value={expense.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='date' value='Date' />
        </div>
        <Datepicker
          id='date'
          placeholder='Select date'
          required
          value={expense.date as any}
          onSelectedDateChanged={handleInputChange}
        />
      </div>
      <Button onClick={handleSubmit}>
        Submit
        <FaSave className='ml-2 h-6 w-6' />
      </Button>
      <Button color='light' onClick={() => setIsOpen(false)}>
        Cancel
        <BsX className='ml-2 h-6 w-6' />
      </Button>
    </form>
  );
}
