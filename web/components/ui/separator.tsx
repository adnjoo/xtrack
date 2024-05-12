import { cn } from '@/lib/utils';

export const Separator = ({ className }: { className?: string }) => (
  <div
    className={cn('border-b border-gray-200 dark:border-gray-700', className)}
  />
);
