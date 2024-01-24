export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001';

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};
