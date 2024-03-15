export type SubscriptionViewProps = {
  id: number;
  title: string;
  amount: number;
  category?: string;
  description: string;
  dateStarted?: Date;
  dateEnded?: Date;
};

export default function SubscriptionView({
  item,
}: {
  item: SubscriptionViewProps;
}) {
  return (
    <div key={item.id} className='mb-4 border p-4'>
      <p className='mb-2 text-xl font-bold'>{item.title}</p>
      <p className='mb-2 text-gray-700'>${item.amount}</p>
      <p className='text-gray-800'>{item.description}</p>
    </div>
  );
}
