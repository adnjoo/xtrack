import { GeistSans } from 'geist/font/sans';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { ReactQueryClientProvider } from '@/components/RQClientProvider';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Xtrack',
  description: 'To do app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider>
      <html lang='en' className={GeistSans.className}>
        <body className='bg-background text-foreground'>
          <Navbar />
          <main className='min-h-screen flex flex-col items-center'>
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
