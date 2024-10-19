import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CONTACT_EMAIL = 'hello@xtrack.ing';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className='mx-auto p-6'>
      <Card className='shadow-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            Privacy Policy for xtrack.ing
          </CardTitle>
          <p className='text-sm text-gray-500'>Effective Date: June 10, 2024</p>
        </CardHeader>
        <CardContent className='space-y-4'>
          <section>
            <h2 className='text-xl font-semibold'>1. Information We Collect</h2>
            <p>
              We collect only the information that is necessary for the
              operation of our app:
            </p>
            <ul className='list-inside list-disc'>
              <li>
                <strong>Email Address:</strong> We collect your email address to
                create and manage your account, send you important updates, and
                provide customer support.
              </li>
              <li>
                <strong>Password:</strong> We collect and store your password in
                an encrypted format to ensure the security of your account.
              </li>
            </ul>
          </section>
          <section>
            <h2 className='text-xl font-semibold'>
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className='list-inside list-disc'>
              <li>
                <strong>Account Creation and Management:</strong> To create and
                manage your user account.
              </li>
              <li>
                <strong>Communication:</strong> To communicate with you about
                your account, security updates, and any other important
                information.
              </li>
              <li>
                <strong>Customer Support:</strong> To provide you with customer
                support and address any inquiries or issues you may have.
              </li>
            </ul>
          </section>
          <section>
            <h2 className='text-xl font-semibold'>
              3. Information Sharing and Disclosure
            </h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal
              information to outside parties except as described below:
            </p>
            <ul className='list-inside list-disc'>
              <li>
                <strong>Service Providers:</strong> We may share your
                information with third-party service providers who assist us in
                operating our app and providing services to you. These third
                parties are contractually obligated to maintain the
                confidentiality of your information.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose your
                information if required to do so by law or in response to valid
                requests by public authorities (e.g., a court or government
                agency).
              </li>
            </ul>
          </section>
          <section>
            <h2 className='text-xl font-semibold'>
              4. Security of Your Information
            </h2>
            <p>
              We use administrative, technical, and physical security measures
              to protect your personal information. While we have taken
              reasonable steps to secure the personal information you provide to
              us, please be aware that no security measures are perfect or
              impenetrable, and no method of data transmission can be guaranteed
              against any interception or other type of misuse.
            </p>
          </section>
          <section>
            <h2 className='text-xl font-semibold'>5. Data Retention</h2>
            <p>
              We will retain your personal information for as long as necessary
              to provide you with our services and as needed to comply with our
              legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>
          <section>
            <h2 className='text-xl font-semibold'>6. Your Privacy Rights</h2>
            <p>
              You have the right to access, correct, update, or delete your
              personal information. You can do so by logging into your account
              and visiting the "Account Settings" section of the app.
            </p>
          </section>
          <section>
            <h2 className='text-xl font-semibold'>
              7. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by updating the "Effective Date" at the
              top of this policy. We encourage you to review this Privacy Policy
              periodically to stay informed about how we are protecting your
              information.
            </p>
          </section>
          <section>
            <h2 className='text-xl font-semibold'>8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at: 
            </p>
            <address>
              <p>
                <strong>Email:</strong> {CONTACT_EMAIL}
              </p>
            </address>
            <p>
              By using xtrack.ing, you agree to the terms of this Privacy
              Policy. If you do not agree with these terms, please do not use
              our app.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
