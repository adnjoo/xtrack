'use client';

import React from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

import { API_URL } from '@/app/lib/utils';
import SubscriptionForm from '@/app/components/SubscriptionForm';
import SubscriptionView from '@/app/components/SubscriptionView';

export default function Page() {
  const [data, setData] = React.useState<any>([]);
  const { getToken } = useAuth();

  const getSubs = async () => {
    const token = await getToken();
    let res = await axios.get(`${API_URL}/subscriptions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('subs', res.data);
    setData(res.data);
  };

  React.useEffect(() => {
    getSubs();
  }, []);

  return (
    <div>
      <h1>Subscriptions</h1>
      {data && (
        <div className='mx-4 my-4 max-w-3xl'>
          {data.map((item: any) => (
            <SubscriptionView key={item.id} item={item} />
          ))}
        </div>
      )}
      <SubscriptionForm />
    </div>
  );
}
