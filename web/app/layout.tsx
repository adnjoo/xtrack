import { Varela_Round } from 'next/font/google';
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
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
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
          <main className='flex min-h-screen flex-col items-center'>
            {children}
          </main>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
