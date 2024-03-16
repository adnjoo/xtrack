'use client';

import React from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

import { API_URL } from '@/app/lib/utils';
import SubscriptionForm from '@/app/components/molecules/SubscriptionForm';
import SubscriptionView from '@/app/components/molecules/SubscriptionView';

export default function SubscriptionsHero() {
  const { getToken } = useAuth();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      try {
        const res = await axios.get(`${API_URL}/subscriptions`, {
          headers: { Authorization: `Bearer ${await getToken()}` },
        });
        return res.data;
      } catch (error) {
        console.error(error);
      }
    }
  })

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {data && (
        <div className='mx-4 my-4 max-w-3xl'>
          {data.map((item: any) => (
            <SubscriptionView key={item.id} item={item} />
          ))}
        </div>
      )}
      <SubscriptionForm refetch={refetch} />
    </div>
  );
}
