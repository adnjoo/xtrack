import { Analytics } from '@vercel/analytics/react';
import { Varela_Round } from 'next/font/google';

import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';
import Footer from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

import './globals.css';

const varela = Varela_Round({
  weight: '400',
  subsets: ['latin'],
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Xtrack',
  description: 'Track your weekly progress',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider>
      <html lang='en' className={varela.className}>
        <body className='bg-background text-foreground'>
          <Navbar />
          <main className='mx-auto mt-[50px] flex min-h-screen max-w-7xl flex-col items-center'>
            {children}
          </main>
          <Footer />
          <Analytics />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
