import Link from 'next/link';
import { GeistSans } from 'geist/font/sans';

import './globals.css';
import { marketingConfig } from '@/config/marketing';
import { MainNav } from '@/components/MainNav';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
    <html lang='en' className={GeistSans.className}>
      <body className='bg-background text-foreground'>
        <header className='container z-40 bg-background'>
          <div className='flex h-20 items-center justify-between py-6'>
            <MainNav items={marketingConfig.mainNav} />
            <nav>
              <Link
                href='/login'
                className={cn(
                  buttonVariants({ variant: 'secondary', size: 'sm' }),
                  'px-4'
                )}
              >
                Login
              </Link>
            </nav>
          </div>
        </header>
        <main className='flex min-h-screen flex-col items-center'>
          {children}
        </main>
      </body>
    </html>
  );
}
