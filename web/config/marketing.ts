import { MainNav } from '@/types';

export const mainNav: MainNav = [
  {
    title: 'Pricing',
    href: '/pricing',
  },
  {
    title: 'Blog',
    href: '/blog',
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
