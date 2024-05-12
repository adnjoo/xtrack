'use client';

import AccountForm from './account-form';
import { useAuth } from '@/utils/supabase/auth';

export default function Account() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div>
        <p>You are not logged in</p>
      </div>
    );
  }

  return <AccountForm user={user} />;
}
