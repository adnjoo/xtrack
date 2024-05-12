'use client';

import Lottie from 'lottie-react';
import groovyWalk from '@/lib/animations/groovyWalk.json';

export default function MyLottie() {
  return (
    <div className='mx-auto mt-8 flex max-w-[200px] sm:mt-16 sm:max-w-[300px]'>
      <Lottie animationData={groovyWalk} />
    </div>
  );
}
