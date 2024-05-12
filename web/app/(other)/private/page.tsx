import { redirect } from 'next/navigation';
import { useAuthServer } from '@/utils/supabase/useAuthServer';

export default async function PrivatePage() {
  const user = await useAuthServer();
  if (!user) {
    return (
      <div>
        not auth go to <a href='/login'>login</a>
      </div>
    );
  }

  return <p>Hello {user.email}</p>;
}
