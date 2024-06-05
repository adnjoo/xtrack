import { Varela_Round } from 'next/font/google';

import Footer from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';

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
          <main className='mt-[50px] flex min-h-screen flex-col items-center'>
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
