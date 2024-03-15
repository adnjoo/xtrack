import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

import { API_URL } from '@/app/lib/utils';



export default function Subscription() {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    dateStarted: '',
    dateEnded: '',
  });
  const { getToken } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSubscription(formData);
      // Optionally, you can reset the form after submission
      setFormData({
        title: '',
        amount: '',
        category: '',
        description: '',
        dateStarted: '',
        dateEnded: '',
      });
      alert('Subscription created successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create subscription');
    }
  };

  const createSubscription = async (formData) => {
    const token = await getToken();
    try {
      // Make a POST request to the /subscriptions/upsert endpoint
      const response = await axios.post(
        `${API_URL}/subscriptions/upsert`,
        formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      // Return the response data if needed
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
          <label htmlFor='category' className='block font-medium'>
            Category
          </label>
          <input
            type='text'
            id='category'
            name='category'
            value={formData.category}
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
        <div className='mb-4'>
          <label htmlFor='dateStarted' className='block font-medium'>
            Start Date
          </label>
          <input
            type='date'
            id='dateStarted'
            name='dateStarted'
            value={formData.dateStarted}
            onChange={handleChange}
            className='w-full rounded border border-solid border-gray-300 px-3 py-2'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='dateEnded' className='block font-medium'>
            End Date
          </label>
          <input
            type='date'
            id='dateEnded'
            name='dateEnded'
            value={formData.dateEnded}
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
