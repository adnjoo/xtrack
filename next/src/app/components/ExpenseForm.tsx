'use client';

import axios from 'axios';
import React from 'react';
import { useAuth } from '@clerk/nextjs';
import { Button, Textarea, Label, TextInput, Datepicker } from 'flowbite-react';
import { BsX } from 'react-icons/bs';
import { FaSave } from 'react-icons/fa';

const expenseCategories = ['Groceries', 'Eating out', 'Entertainment', 'Other'];

export default function ExpenseForm({ setIsOpen }: any) {
  const { getToken } = useAuth();
  const [expense, setExpense] = React.useState({
    title: '',
    amount: 0,
    description: '',
    date: new Date(),
  });

  const handleSubmit = async () => {
    const token = await getToken();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/expenses/upsert`,
        {
          title: expense.title,
          description: expense.description,
          amount: expense.amount,
          date: expense.date,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Expense submitted successfully', response.data);
    } catch (error) {
      console.error('Error submitting expense:', error);
    } finally {
      setIsOpen(false);
    }
  };

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setExpense((prevData) => ({
      ...prevData,
      [id]: value,
    }));
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
          onChange={handleInputChange}
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
