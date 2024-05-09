import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

import MyNavbar from '@/app/components/organisms/MyNavbar';
import MyFooter from '@/app/components/molecules/MyFooter';
import Providers from '@/app/components/Providers';
import { APP_NAME } from '@/app/lib/constants';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Track your expenses',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <ClerkProvider>
      <html lang='en'>
        <body>
          <Providers>
            <>under maintenance</>
            {/* <MyNavbar /> */}
            {/* <main className='hidden min-h-screen'>{children}</main> */}
            {/* <MyFooter /> */}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
