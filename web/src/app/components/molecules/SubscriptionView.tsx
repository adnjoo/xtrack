'use client';

import SubscriptionForm, { SubscriptionData } from './SubscriptionForm';

type SubscriptionViewProps = {
  item: SubscriptionData;
};

export default function SubscriptionView({ item }: SubscriptionViewProps) {
  return (
    <div key={item.id} className='mb-4 border p-4'>
      <div className='flex flex-row justify-between'>
        <p className='mb-2 text-xl font-bold'>{item.title}</p>
        <SubscriptionForm initialData={item} editMode />
      </div>
      <p className='mb-2 text-gray-700'>${item.amount}</p>
      <p className='text-gray-800'>{item.description}</p>

      <div className='flex flex-row gap-4'></div>
    </div>
  );
}
