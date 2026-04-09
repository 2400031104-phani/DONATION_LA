import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { getSession } from '../utils/auth';
import { saveMoneyDonation } from '../utils/service';
import { formatCurrency } from '../utils';
import type { SessionData } from '../types';

export const DonateMoneyPage = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<SessionData | null>(null);
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState<{ amount?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const currentSession = getSession();
    if (!currentSession) {
      navigate('/login');
    } else {
      setSession(currentSession);
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    const amountNum = parseFloat(amount);

    if (!amount || isNaN(amountNum) || amountNum <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (session) {
        const transactionId = 'txn_' + Date.now();
        const donation = await saveMoneyDonation(session.userId, amountNum, transactionId);
        if (donation) {
          sessionStorage.setItem('donationSuccess', JSON.stringify(donation));
          navigate('/confirmation');
        } else {
          setErrors({ amount: 'Failed to save donation. Please try again.' });
        }
      }
    } catch (error) {
      console.error('Donation error:', error);
      setErrors({ amount: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];

  return (
    <Layout session={session}>
      <div className="max-w-2xl mx-auto">
        <Card title="Make a Monetary Donation">
          <p className="text-gray-600 mb-6">
            Your contribution helps us support communities and provide essential services.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Donation Amount (USD)"
              type="number"
              value={amount}
              onChange={setAmount}
              error={errors.amount}
              placeholder="e.g., 50"
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Quick Select:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {predefinedAmounts.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset.toString())}
                    className={`p-3 rounded-lg font-semibold transition ${
                      amount === preset.toString()
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>
            </div>

            {amount && !errors.amount && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-900">
                  You are about to donate {formatCurrency(parseFloat(amount))}
                </p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Payment Information:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Secure payment processing</li>
                <li>• 100% of your donation goes to helping communities</li>
                <li>• You will receive a receipt via email</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                label={isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                type="submit"
                disabled={isSubmitting || !amount}
                className="flex-1"
              />
              <Button
                label="Cancel"
                variant="secondary"
                onClick={() => navigate('/')}
                className="flex-1"
              />
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};
