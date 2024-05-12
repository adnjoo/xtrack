'use client';

import { useAuth } from '@/utils/supabase/auth';
import AccountForm from './account-form';

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
