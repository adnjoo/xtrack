import { CheckIcon } from '@heroicons/react/20/solid';
import { classNames } from '@/app/lib/utils';

const tiers = [
  {
    name: 'Personal',
    id: 'tier-personal',
    href: '/signin',
    priceMonthly: '$0',
    description:
      "The perfect plan if you're just getting started with our product.",
    features: ['Free expense tracking', 'Advanced analytics', 'Email support'],
    featured: true,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '/signin',
    priceMonthly: '$9',
    description: 'A plan that scales with your rapidly growing needs.',
    features: [
      'AI suggestions',
      'Advanced integrations',
      'Custom reporting tools',
      'Priority support',
    ],
    featured: false,
  },
];

export default function Example() {
  return (
    <div className='relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <div className='mx-auto max-w-2xl text-center lg:max-w-4xl'>
        <h2 className='text-base font-semibold leading-7 text-indigo-600'>
          Pricing
        </h2>
        <p className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
          The right price for you, whoever you are
        </p>
      </div>
      <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600'>
        From basic to pro plans, we have the right product for everybody.
      </p>
      <div className='mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2'>
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? 'relative bg-white shadow-2xl'
                : 'bg-white/60 sm:mx-8 lg:mx-0',
              tier.featured
                ? ''
                : tierIdx === 0
                  ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none'
                  : 'sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
              'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10'
            )}
          >
            <h3
              id={tier.id}
              className='text-base font-semibold leading-7 text-indigo-600'
            >
              {tier.name}
            </h3>
            <p className='mt-4 flex items-baseline gap-x-2'>
              <span className='text-5xl font-bold tracking-tight text-gray-900'>
                {tier.priceMonthly}
              </span>
              <span className='text-base text-gray-500'>/month</span>
            </p>
            <p className='mt-6 text-base leading-7 text-gray-600'>
              {tier.description}
            </p>
            <ul
              role='list'
              className='mt-8 space-y-3 text-sm leading-6 text-gray-600 sm:mt-10'
            >
              {tier.features.map((feature) => (
                <li key={feature} className='flex gap-x-3'>
                  <CheckIcon
                    className='h-6 w-5 flex-none text-indigo-600'
                    aria-hidden='true'
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={classNames(
                tier.featured
                  ? 'bg-indigo-600 text-white shadow hover:bg-indigo-500'
                  : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-10'
              )}
            >
              Get started today
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
