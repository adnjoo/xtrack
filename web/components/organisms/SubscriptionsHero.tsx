'use client';

import React from 'react';
import axios from 'axios';
// import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

import { API_URL } from '@/lib/utils';
import SubscriptionForm from '@/components/molecules/SubscriptionForm';
import SubscriptionView from '@/components/molecules/SubscriptionView';

export default function SubscriptionsHero() {
  // const { getToken } = useAuth();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      try {
        const res = await axios.get(`${API_URL}/subscriptions`, {
          // headers: { Authorization: `Bearer ${await getToken()}` },
        });
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const calculateTotalAmount = (subscriptionData: any) => {
    return subscriptionData.reduce(
      (total: number, item: any) => total + Number(item.amount),
      0
    );
  };

  return (
    <div className='rounded-md bg-white p-4 shadow-md'>
      {isLoading && <p>Loading...</p>}
      {data && (
        <p className='mb-2'>Total Amount: ${calculateTotalAmount(data)}</p>
      )}
      <SubscriptionForm refetch={refetch} />
      <div className='grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
        {data &&
          data.map((item: any) => (
            <SubscriptionView key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}
