import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { Dialog } from '@headlessui/react'; // Import Dialog from headlessui
import { API_URL } from '@/app/lib/utils';

export default function SubscriptionForm({ refetch }: any) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    dateStarted: '',
    dateEnded: '',
  });
  const { getToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // State to control modal visibility

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      setIsOpen(false); // Close the modal after submission
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create subscription');
    }
  };

  const createSubscription = async (formData: any) => {
    const token = await getToken();
    try {
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
      throw error;
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='my-4 rounded bg-blue-500 px-4 py-2 text-white'
      >
        Create Subscription
      </button>

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='fixed inset-0 z-10 overflow-y-auto border border-solid border-gray-300 bg-gray-800 bg-opacity-50'
      >
        <div className='flex min-h-screen flex-col items-center justify-center'>
          <form
            onSubmit={handleSubmit}
            className='max-w-xl rounded bg-white p-8 shadow-lg'
          >
            <Dialog.Title className='text-2xl font-bold'>
              Create Subscription
            </Dialog.Title>
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

            <div className='flex justify-between'>
              <button
                type='submit'
                className='rounded bg-blue-500 px-4 py-2 text-white'
              >
                Submit
              </button>
              <button
                className='rounded bg-red-500 px-4 py-2 text-white'
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
}
