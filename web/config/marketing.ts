import { MainNav } from '@/types';

export const mainNav: MainNav = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Notes',
    href: '/notes',
  },
  {
    title: 'Login',
    href: '/login',
    desktopOnly: true,
  }
];

export const authNav = [
  ...mainNav,
  {
    title: 'Account',
    href: '/account',
  },
];
