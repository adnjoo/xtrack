'use client';

import { useState } from 'react';
import {
  ChevronUpIcon,
  LockIcon,
  FingerprintIcon,
  FileIcon,
  BanknoteIcon,
  Smartphone,
  FileDown,
} from 'lucide-react';

const features = [
  {
    name: 'Secure Sign in',
    Icon: () => (
      <FingerprintIcon
        className='ml-[-6px] mr-2 mt-[1px]'
        height={20}
        width={20}
      />
    ),
    description:
      'Use your email to securely log in to the application; no password is required.',
    screenshotUrl: '/demo/signin.jpg',
    demoUrl: '/demo/signin.mp4',
  },
  {
    name: 'Privacy',
    description:
      'Your private data, such as name, price, and notes, etc., is securely encrypted in the database.',
    Icon: () => (
      <LockIcon className='ml-[-6px] mr-2 mt-[-1px]' height={20} width={20} />
    ),
    screenshotUrl: '/demo/expenses.jpg',
  },
  {
    name: 'Reports',
    description:
      'You can understand your spending habits by viewing detailed reports on the overview page. ',
    Icon: () => (
      <FileIcon className='ml-[-6px] mr-2 mt-[-1px]' height={20} width={20} />
    ),
    screenshotUrl: '/demo/overview.jpg',
  },
  {
    name: 'Recurring Subscriptions',
    description:
      'Easily track subscriptions; no need to remember renewal dates or maintain a messy spreadsheet.',
    Icon: () => (
      <BanknoteIcon
        className='ml-[-6px] mr-2 mt-[-1px]'
        height={20}
        width={20}
      />
    ),
    screenshotUrl: '/demo/subscriptions.jpg',
    demoUrl: '/demo/subscriptions.mp4',
  },

  {
    name: 'Multi-device & Cross-platform',
    description:
      'Access from multiple devices, including smartphones and laptops, makes it easy to track expenses on-the-go from any device.',
    Icon: () => (
      <Smartphone className='ml-[-6px] mr-2 mt-[-1px]' height={20} width={20} />
    ),
    screenshotUrl: '/demo/responsive.jpg',
  },
  {
    name: 'Export Data',
    description:
      'Export your data in the CSV file format, which is widely supported.',
    Icon: () => (
      <FileDown className='ml-[-6px] mr-2 mt-[-1px]' height={20} width={20} />
    ),
    screenshotUrl: '/demo/export.jpg',
    demoUrl: '/demo/export.mp4',
  },
];

export default function Features() {
  const [selected, setSelected] = useState(0);
  return (
    <section className='flex w-full flex-row justify-center gap-4'>
      <div className='block h-fit max-w-sm rounded-2xl border-[1px] bg-white p-2'>
        {features.map((feature, index) => {
          const isSelected = index === selected;
          return (
            <div key={`${feature.name}-${index}`}>
              <button
                className={
                  'flex w-full justify-between rounded-lg bg-orange-100 px-4 py-3 text-left text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75'
                }
                onClick={() => {
                  setSelected(index);
                }}
              >
                <div className='flex w-full items-center justify-between '>
                  <div className='flex w-full items-center justify-between'>
                    <div className='flex items-center'>
                      <feature.Icon />
                      <h3 className='font-sans font-medium text-black'>
                        {feature.name}
                      </h3>
                    </div>
                    {
                      <ChevronUpIcon
                        className={`${isSelected ? 'rotate-180 transform' : ''} h-5 w-5 text-orange-600`}
                      />
                    }
                  </div>
                </div>
              </button>

              <p
                className={`mb-[6px] mt-[6px] overflow-hidden  border-gray-700 bg-white pl-[10px] text-[14px] font-medium text-gray-700 transition-all duration-500 ${
                  isSelected ? 'max-h-28' : 'max-h-0'
                } `}
              >
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
