import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { Dialog } from '@headlessui/react';
import { MdEdit, MdDelete } from 'react-icons/md';

import { API_URL } from '@/app/lib/utils';

export interface SubscriptionData {
  id: number;
  title: string;
  amount: number;
  category?: string;
  description: string;
  dateStarted?: Date;
  dateEnded?: Date;
}

interface SubscriptionFormProps {
  initialData?: SubscriptionData; // Optional initial data for editing
  editMode?: boolean;
  refetch?: () => void;
}

export default function SubscriptionForm({
  initialData,
  editMode,
  refetch,
}: SubscriptionFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      amount: '',
      category: '',
      description: '',
      dateStarted: '',
      dateEnded: '',
    }
  );
  const [isOpen, setIsOpen] = useState(false); // State to control modal visibility
  const { getToken } = useAuth();

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
      await upsertSubscription(formData);
      setFormData({
        title: '',
        amount: '',
        category: '',
        description: '',
        dateStarted: '',
        dateEnded: '',
      });
      alert(`Subscription ${editMode ? 'updated' : 'created'} successfully!`);
      if (refetch) {
        refetch();
      }
      setIsOpen(false);
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed to ${editMode ? 'update' : 'create'} subscription`);
    }
  };

  const upsertSubscription = async (formData: any) => {
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

  const handleDelete = async () => {
    if (
      !window.confirm('Are you sure you want to delete this subscription?') ||
      !initialData
    ) {
      return;
    }

    const token = await getToken();

    try {
      await axios.delete(`${API_URL}/subscriptions/delete/${initialData.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Subscription deleted successfully');
      if (refetch) {
        refetch();
      }
    } catch (error) {
      console.error('Error deleting subscription:', error);
      // Handle error gracefully
    }
  };

  return (
    <>
      {!editMode ? (
        <button onClick={() => setIsOpen(true)} className='rounded'>
          Create Subscription
        </button>
      ) : (
        <div className='flex gap-4'>
          <button onClick={() => setIsOpen(true)} className='my-4'>
            <MdEdit className='fill-black' />
          </button>

          <button onClick={handleDelete} className='my-4 '>
            <MdDelete className='fill-black' />
          </button>
        </div>
      )}

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
            <Dialog.Panel>
              <Dialog.Title className='text-2xl font-bold'>
                {editMode ? 'Edit' : 'Create'} Subscription
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
            </Dialog.Panel>
          </form>
        </div>
      </Dialog>
    </>
  );
}
