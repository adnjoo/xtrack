import { Metadata } from 'next';
import Providers from './Providers';
import './globals.css';

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
  // const user = useUser();

  // console.log(user);
  return (
    <html lang='en'>
      <body>
        <Providers>
          <main className='flex min-h-screen flex-col items-center'>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
