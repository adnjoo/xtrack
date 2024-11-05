import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CONTACT_EMAIL = 'hello@xtrack.ing';

const TermsOfService: React.FC = () => {
  return (
    <div className='mx-auto p-6'>
      <Card className='shadow-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            Terms of Service for xtrack.ing
          </CardTitle>
          <p className='text-sm text-gray-500'>Effective Date: June 10, 2024</p>
        </CardHeader>
        <CardContent className='space-y-4'>
          <section>
            <h2 className='text-xl font-semibold'>1. Acceptance of Terms</h2>
            <p>
              By using xtrack.ing, you agree to comply with and be bound by the following terms and conditions. If you do not agree to these terms, you are prohibited from using our app.
            </p>
          </section>
          <section>
            <h2 className='text-xl font-semibold'>2. Use of Service</h2>
            <p>
              xtrack.ing grants you a limited, non-exclusive, non-transferable, and revocable license to use the app strictly in accordance with these terms.
            </p>
          </section>
          <section>
            <h2 className='text-xl font-semibold'>3. User Responsibilities</h2>
            <p>
              You are responsible for any activity that occurs under your account and agree to notify us of any unauthorized access. You agree not to misuse the app or use it for unlawful purposes.
            </p>
          </section>
          <section>
            <h2 className='text-xl font-semibold'>4. Account Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to the app at our discretion, without prior notice, for conduct that we believe violates these Terms of Service.
            </p>
          </section>
          <section>
            <h2 className='text-xl font-semibold'>5. Limitation of Liability</h2>
            <p>
              In no event shall xtrack.ing be liable for any damages resulting from your use of, or inability to use, the app. This includes but is not limited to damages for loss of data, profits, or other intangible losses.
            </p>
          </section>
          <section>
            <h2 className='text-xl font-semibold'>6. Changes to Terms</h2>
            <p>
              We may modify these terms at any time. You agree to review the terms periodically to stay informed. Continued use of the app signifies your acceptance of any changes.
            </p>
          </section>
          <section>
            <h2 className='text-xl font-semibold'>7. Governing Law</h2>
            <p>
              These Terms of Service are governed by the laws of the jurisdiction in which xtrack.ing operates, without regard to its conflict of law provisions.
            </p>
          </section>
          <section>
            <h2 className='text-xl font-semibold'>8. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <address>
              <p>
                <strong>Email:</strong> {CONTACT_EMAIL}
              </p>
            </address>
            <p>
              By using xtrack.ing, you agree to abide by these terms. If you do not agree, please discontinue use of the app.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;
