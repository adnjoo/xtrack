import { MainNav } from '@/components/layout/MainNav';
import MyFooter from '@/components/layout/MyFooter';

export default async function Layout({ children }: any) {
  return (
    <>
      <MainNav />
      {children}
      <MyFooter />
    </>
  );
}
