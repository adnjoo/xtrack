import {
  BugAntIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

export default function Contact() {
  return (
    <div className='isolate bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <div className='mx-auto max-w-2xl sm:text-center'>
        <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Contact us
        </h2>
        <p className='mt-2 text-lg leading-8 text-gray-600'>
          Got questions? We&apos;ve got answers.
        </p>
      </div>
      <div className='mx-auto mt-20 max-w-lg space-y-16'>
        <div className='flex gap-x-6'>
          <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600'>
            <ChatBubbleLeftRightIcon
              className='h-6 w-6 text-white'
              aria-hidden='true'
            />
          </div>
          <div>
            <h3 className='text-base font-semibold leading-7 text-gray-900'>
              Support
            </h3>
            <p className='mt-2 leading-7 text-gray-600'>
              We’re here to help. Get in touch if you have any questions.
            </p>
            <p className='mt-4'>
              <a
                href='mailto:adnjoo@gmail.com'
                className='text-sm font-semibold leading-6 text-indigo-600'
              >
                Contact us <span aria-hidden='true'>&rarr;</span>
              </a>
            </p>
          </div>
        </div>
        <div className='flex gap-x-6'>
          <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600'>
            <BugAntIcon className='h-6 w-6 text-white' aria-hidden='true' />
          </div>
          <div>
            <h3 className='text-base font-semibold leading-7 text-gray-900'>
              General Feedback
            </h3>
            <p className='mt-2 leading-7 text-gray-600'>
              We welcome your feedback.
            </p>
            <p className='mt-4'>
              <a
                href='https://xpensetrackr.canny.io/'
                className='text-sm font-semibold leading-6 text-indigo-600'
                target='_blank'
              >
                Report a bug or suggest an improvement <span aria-hidden='true'>&rarr;</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
