import { redirect } from 'next/navigation';
import { useAuthServer } from '@/utils/supabase/useAuthServer';

export default async function PrivatePage() {
  const user = await useAuthServer();
  if (!user) {
    redirect('/login');
  }

  return <p>Hello {user.email}</p>;
}
