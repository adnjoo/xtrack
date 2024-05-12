import { MainNav } from '@/components/layout/MainNav';
import MyFooter from '@/components/molecules/MyFooter';

export default async function Layout({ children }: any) {
  return (
    <>
      <MainNav />
      {children}
      <MyFooter />
    </>
  );
}
