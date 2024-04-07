'use client';

import Lottie from 'lottie-react';

import financeAnalyst from '@/app/lib/animations/financeAnalyst.json';

export default function MyLottie() {
  return (
    <div className='max-w-sm'>
      <Lottie animationData={financeAnalyst} />
    </div>
  );
}
