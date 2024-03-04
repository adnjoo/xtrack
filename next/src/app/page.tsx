import { auth } from '@clerk/nextjs';

import MySpeedDial from '@/app/components/MySpeedDial';
import TabsHero from '@/app/components/TabsHero';

export default function Home() {
  const { userId } = auth();

  return (
    <>
      <section className='mx-auto mt-12 max-w-4xl overflow-x-auto p-1 sm:p-4'>
        <TabsHero />
      </section>
      {userId && <MySpeedDial />}
    </>
  );
}
