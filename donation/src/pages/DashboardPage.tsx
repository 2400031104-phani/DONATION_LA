import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { DonationTypes } from '../components/DonationTypes';
import { DonationTable } from '../components/DonationTable';
import { getSession } from '../utils/auth';
import { getRecordsByUser } from '../utils/service';
import type { SessionData, DonationRecord } from '../types';

export const DashboardPage = () => {
  const [session, setSession] = useState<SessionData | null>(null);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [stats, setStats] = useState({ food: 0, money: 0, clothing: 0 });

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);

    if (currentSession) {
      // Fetch donations from backend
      const fetchDonations = async () => {
        const userDonations = await getRecordsByUser(currentSession.userId);
        setDonations(userDonations);

        const newStats = {
          food: userDonations.filter((d) => d.type === 'food').length,
          money: userDonations.filter((d) => d.type === 'money').length,
          clothing: userDonations.filter((d) => d.type === 'clothing').length,
        };
        setStats(newStats);
      };

      fetchDonations().catch((error) => {
        console.error('Error fetching donations:', error);
      });
    }
  }, []);

  return (
    <Layout session={session}>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white p-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to DonateHub</h1>
          <p className="text-xl opacity-90">
            Your platform for making a positive impact. Donate food, money, or clothing to those in need.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Food Donations">
            <p className="text-4xl font-bold text-blue-600">{stats.food}</p>
            <p className="text-gray-600 mt-2">Total food donations made</p>
          </Card>
          <Card title="Monetary Donations">
            <p className="text-4xl font-bold text-purple-600">{stats.money}</p>
            <p className="text-gray-600 mt-2">Total monetary donations</p>
          </Card>
          <Card title="Clothing Donations">
            <p className="text-4xl font-bold text-green-600">{stats.clothing}</p>
            <p className="text-gray-600 mt-2">Total clothing items donated</p>
          </Card>
        </div>

        {/* Donation Types */}
        <Card title="How Would You Like to Donate?">
          <DonationTypes />
        </Card>

        {/* Recent Donations */}
        <Card title="Your Recent Donations">
          <DonationTable donations={donations.slice(0, 10)} />
        </Card>
      </div>
    </Layout>
  );
};
