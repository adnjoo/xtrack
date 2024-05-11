'use client';

import Lottie from 'lottie-react';

import groovyWalk from '@/lib/animations/groovyWalk.json';

export default function MyLottie() {
  return (
    <div className='max-w-sm'>
      <Lottie animationData={groovyWalk} />
    </div>
  );
}
