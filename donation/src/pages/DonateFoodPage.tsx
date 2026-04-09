import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { getSession } from '../utils/auth';
import { saveFoodDonation } from '../utils/service';
import type { SessionData } from '../types';

export const DonateFoodPage = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<SessionData | null>(null);
  const [rice, setRice] = useState('');
  const [vegetables, setVegetables] = useState('');
  const [errors, setErrors] = useState<{ rice?: string; vegetables?: string }>({});
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

    const riceNum = parseFloat(rice);
    const vegNum = parseFloat(vegetables);

    if (!rice || isNaN(riceNum) || riceNum <= 0) {
      newErrors.rice = 'Please enter a valid quantity';
    }
    if (!vegetables || isNaN(vegNum) || vegNum <= 0) {
      newErrors.vegetables = 'Please enter a valid quantity';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (session) {
        const donation = await saveFoodDonation(session.userId, riceNum, vegNum);
        if (donation) {
          // Show success message
          sessionStorage.setItem('donationSuccess', JSON.stringify(donation));
          navigate('/confirmation');
        } else {
          setErrors({ rice: 'Failed to save donation. Please try again.' });
        }
      }
    } catch (error) {
      console.error('Donation error:', error);
      setErrors({ rice: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout session={session}>
      <div className="max-w-2xl mx-auto">
        <Card title="Donate Food Items">
          <p className="text-gray-600 mb-6">
            Help us feed those in need by donating rice, vegetables, and other food items.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Rice Quantity (in kg)"
              type="number"
              value={rice}
              onChange={setRice}
              error={errors.rice}
              placeholder="e.g., 5"
              required
            />

            <Input
              label="Vegetables Quantity (in kg)"
              type="number"
              value={vegetables}
              onChange={setVegetables}
              error={errors.vegetables}
              placeholder="e.g., 10"
              required
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Distribution Information:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Your donation will be reviewed by our team</li>
                <li>• You will receive approval notifications</li>
                <li>• Food will be distributed to local communities</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                label={isSubmitting ? 'Submitting...' : 'Submit Donation'}
                type="submit"
                disabled={isSubmitting}
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
