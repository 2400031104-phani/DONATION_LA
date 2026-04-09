import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { getSession } from '../utils/auth';
import type { SessionData, DonationRecord } from '../types';

export const ConfirmationPage = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<SessionData | null>(null);
  const [donation, setDonation] = useState<DonationRecord | null>(null);

  useEffect(() => {
    const currentSession = getSession();
    if (!currentSession) {
      navigate('/login');
      return;
    }
    setSession(currentSession);

    const donationData = sessionStorage.getItem('donationSuccess');
    if (donationData) {
      const parsed = JSON.parse(donationData);
      setDonation(parsed);
      sessionStorage.removeItem('donationSuccess');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Layout session={session}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Thank You for Donating!
          </h1>
          <p className="text-xl text-gray-600">
            Your generous contribution has been received and will make a difference.
          </p>
        </div>

        {donation && (
          <Card title="Donation Details">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Donation ID</p>
                  <p className="font-semibold text-gray-900">{donation.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-semibold text-gray-900 capitalize">{donation.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-semibold text-yellow-600 capitalize">
                    {donation.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <h4 className="font-semibold text-blue-900 mb-2">What Happens Next:</h4>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>✓ Your donation has been recorded in our system</li>
                  <li>✓ Our team will review and approve your donation</li>
                  <li>✓ You'll receive an email notification once approved</li>
                  <li>✓ Your donation will be distributed to those in need</li>
                </ul>
              </div>
            </div>
          </Card>
        )}

        <div className="mt-8 space-y-4">
          <Button
            label="Return to Dashboard"
            onClick={() => navigate('/')}
            className="w-full"
          />
          <Button
            label="Make Another Donation"
            variant="secondary"
            onClick={() => navigate('/donate')}
            className="w-full"
          />
        </div>
      </div>
    </Layout>
  );
};
