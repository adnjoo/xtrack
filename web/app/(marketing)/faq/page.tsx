const faqs = [
  {
    question: 'What is XTrack?',
    answer: 'XTrack is an app designed to help you track and manage your expenses on the go. It provides a user-friendly interface for recording, and analyzing your spending.',
  },
  {
    question: 'Is XTrack free to use?',
    answer: 'Yes, XTrack offers a free version with basic features. However, there may be premium or subscription options available for additional features and benefits.',
  },
  {
    question: 'How do I add an expense in XTrack?',
    answer: 'To add an expense, open the app, and click on the Plus icon on the bottom right of your screen, and enter the necessary details such as amount, category, and description.',
  },
  {
    question: 'Is my financial data secure with XTrack?',
    answer: 'XTrack takes user security seriously. The app uses encryption and follows industry-standard practices to safeguard your financial information.',
  },
  {
    question: 'Can I download my expense reports with XTrack?',
    answer: 'This feature will be available in the near future. Stay tuned!',
  },
  // Add more questions as needed...
];

  
  export default function FAQ() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
              <p className="mt-4 text-base leading-7 text-gray-600">
                Can’t find the answer you’re looking for? Reach out to our{' '}
                <a href="/contact" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  customer support
                </a>{' '}
                team.
              </p>
            </div>
            <div className="mt-10 lg:col-span-7 lg:mt-0">
              <dl className="space-y-10">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <dt className="text-base font-semibold leading-7 text-gray-900">{faq.question}</dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    )
  }
  