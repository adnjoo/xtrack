'use client';

import { useUser } from '@/hooks/useUser';
import AccountForm from './account-form';

export default function Account() {
  const user = useUser();

  if (!user) {
    return (
      <div>
        <p>You are not logged in</p>
      </div>
    )
  }

  return <AccountForm user={user} />;
}
