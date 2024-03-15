'use client';

import React from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { API_URL } from '@/app/lib/utils';

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
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
