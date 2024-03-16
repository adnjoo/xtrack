import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

import { API_URL } from '@/app/lib/utils';

export default function SubscriptionForm({refetch}: any) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    dateStarted: '',
    dateEnded: '',
  });
  const { getToken } = useAuth();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createSubscription(formData);
      setFormData({
        title: '',
        amount: '',
        category: '',
        description: '',
        dateStarted: '',
        dateEnded: '',
      });
      alert('Subscription created successfully!');
      refetch();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create subscription');
    }
  };

  const createSubscription = async (formData: any) => {
    const token = await getToken();
    try {
      // Make a POST request to the /subscriptions/upsert endpoint
      const response = await axios.post(
        `${API_URL}/subscriptions/upsert`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      // Handle errors here
      throw error;
    }
  };

  return (
    <div className='max-w-xl'>
      <h1 className='mb-4 text-2xl font-bold'>Create Subscription</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='title' className='block font-medium'>
            Title
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            className='w-full rounded border border-solid border-gray-300 px-3 py-2'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='amount' className='block font-medium'>
            Amount
          </label>
          <input
            type='text'
            id='amount'
            name='amount'
            value={formData.amount}
            onChange={handleChange}
            className='w-full rounded border border-solid border-gray-300 px-3 py-2'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='description' className='block font-medium'>
            Description
          </label>
          <input
            type='text'
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='w-full rounded border border-solid border-gray-300 px-3 py-2'
          />
        </div>

        <button
          type='submit'
          className='rounded bg-blue-500 px-4 py-2 text-white'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
