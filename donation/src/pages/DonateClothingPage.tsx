import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { getSession } from '../utils/auth';
import { saveClothingDonation } from '../utils/service';
import type { SessionData } from '../types';

export const DonateClothingPage = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<SessionData | null>(null);
  const [targetAge, setTargetAge] = useState('');
  const [quantity, setQuantity] = useState('');
  const [condition, setCondition] = useState('good');
  const [errors, setErrors] = useState<{ targetAge?: string; quantity?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ageGroups = [10, 19, 20, 30, 45];

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

    const ageNum = parseInt(targetAge, 10);
    const quantityNum = parseInt(quantity, 10);

    if (!targetAge) {
      newErrors.targetAge = 'Please select a target age group';
    }
    if (!quantity || isNaN(quantityNum) || quantityNum <= 0) {
      newErrors.quantity = 'Please enter a valid quantity';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (session) {
        const donation = await saveClothingDonation(
          session.userId,
          ageNum,
          quantityNum,
          condition
        );
        if (donation) {
          sessionStorage.setItem('donationSuccess', JSON.stringify(donation));
          navigate('/confirmation');
        } else {
          setErrors({ quantity: 'Failed to save donation. Please try again.' });
        }
      }
    } catch (error) {
      console.error('Donation error:', error);
      setErrors({ quantity: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout session={session}>
      <div className="max-w-2xl mx-auto">
        <Card title="Donate Clothing Items">
          <p className="text-gray-600 mb-6">
            Help clothe those in need with your gently used or new clothing items.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Age Group *
              </label>
              <select
                value={targetAge}
                onChange={(e) => setTargetAge(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.targetAge ? 'border-red-600' : 'border-gray-300'
                }`}
              >
                <option value="">Select an age group</option>
                {ageGroups.map((age) => (
                  <option key={age} value={age.toString()}>
                    {age === 10 ? 'Ages 0-10' : age === 19 ? 'Ages 10-19' : age === 20 ? 'Ages 20-30' : age === 30 ? 'Ages 30-40' : 'Ages 45+'}
                  </option>
                ))}
              </select>
              {errors.targetAge && (
                <p className="text-red-600 text-sm mt-1">{errors.targetAge}</p>
              )}
            </div>

            <Input
              label="Number of Items"
              type="number"
              value={quantity}
              onChange={setQuantity}
              error={errors.quantity}
              placeholder="e.g., 5"
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition
              </label>
              <div className="space-y-2">
                {['excellent', 'good', 'fair'].map((cond) => (
                  <label key={cond} className="flex items-center">
                    <input
                      type="radio"
                      value={cond}
                      checked={condition === cond}
                      onChange={(e) => setCondition(e.target.value)}
                      className="mr-3"
                    />
                    <span className="text-gray-700 capitalize">{cond}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Guidelines:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Items should be clean and in acceptable condition</li>
                <li>• Please include all pieces (buttons, zippers intact)</li>
                <li>• No items with severe damage or stains</li>
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
