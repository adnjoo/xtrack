'use client';

import React from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { API_URL } from '@/app/lib/utils';
import Subscription from '@/app/components/Subscription';

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
      <h1>Test Page</h1>
      {data &&
        data.map((item: any) => (
          <p key={item.id}>
            <p>{item.title}</p>
            <p>{item.amount}</p>
            {item.description}
          </p>
        ))}
      <Subscription />
    </div>
  );
}
