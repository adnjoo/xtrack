import { Metadata } from 'next';

import { MainNav } from '@/components/MainNav';
import './globals.css';
import Providers from './Providers';
import MyFooter from '@/components/molecules/MyFooter';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'XTrack',
  description: 'The fastest way to track your expenses',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <header className='z-40 flex h-20 w-full items-center py-6'>
            <MainNav />
          </header>
          <main className='flex min-h-screen flex-col items-center'>
            {children}
          </main>
          <MyFooter />
        </Providers>
      </body>
    </html>
  );
}
