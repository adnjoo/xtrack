'use client';

import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

import { API_URL } from '@/app/lib/utils';

export type SubscriptionViewProps = {
  id: number;
  title: string;
  amount: number;
  category?: string;
  description: string;
  dateStarted?: Date;
  dateEnded?: Date;
};

export default function SubscriptionView({
  item,
}: {
  item: SubscriptionViewProps;
}) {
  const { getToken } = useAuth();
  const { refetch } = useQuery({
    queryKey: ['subscriptions'],
  });

  const handleDelete = async () => {
    const token = await getToken();

    try {
      await axios.delete(`${API_URL}/subscriptions/delete/${item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Subscription deleted successfully');
      refetch();
    } catch (error) {
      console.error('Error deleting subscription:', error);
      // Handle error gracefully
    }
  };

  return (
    <div key={item.id} className='mb-4 border p-4'>
      <p className='mb-2 text-xl font-bold'>{item.title}</p>
      <p className='mb-2 text-gray-700'>${item.amount}</p>
      <p className='text-gray-800'>{item.description}</p>
      <button
        onClick={handleDelete}
        className='mt-2 rounded-xl bg-red-500 p-2 text-white'
      >
        Delete
      </button>
    </div>
  );
}
