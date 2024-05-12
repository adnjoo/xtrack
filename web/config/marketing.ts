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
  },
];

export const authNav: MainNav = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Account',
    href: '/account',
  },
];
