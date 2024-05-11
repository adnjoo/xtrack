export const APP_NAME = 'XTrack';

export type Page = {
  href: string;
  label: string;
  menu: boolean;
};

export type Pages = Record<string, Page>;

export const PAGES: Pages = {
  HOME: {
    href: '/',
    label: 'Home',
    menu: true,
  },
  ABOUT: {
    href: '/about',
    label: 'About',
    menu: false,
  },
  PRICING: {
    href: '/pricing',
    label: 'Pricing',
    menu: true,
  },
  BLOG: {
    href: '/blog',
    label: 'Blog',
    menu: true,
  },
  CONTACT: {
    href: '/contact',
    label: 'Contact',
    menu: false,
  },
  FAQ: {
    href: '/faq',
    label: 'FAQ',
    menu: false,
  },
  SIGN_IN: {
    href: '/signin',
    label: 'Sign In',
    menu: false,
  },
};

// TODO: reconcile with PAGES in MyAppBar
export const FOOTER: any = {
  PRIVACY: {
    href: '/privacy',
    label: 'Privacy',
  },
  TERMS: {
    href: '/terms',
    label: 'Terms of Service',
  },
};

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}
