'use client';

import Lottie from 'lottie-react';

import groovyWalk from '@/app/lib/animations/groovyWalk.json';

export default function MyLottie() {
  return (
    <div className='max-w-sm'>
      <Lottie animationData={groovyWalk} />
    </div>
  );
}
