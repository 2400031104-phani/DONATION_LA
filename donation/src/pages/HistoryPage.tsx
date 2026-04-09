import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { DonationTable } from '../components/DonationTable';
import { getSession } from '../utils/auth';
import { getRecordsByUser } from '../utils/service';
import type { SessionData, DonationRecord } from '../types';

export const HistoryPage = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<SessionData | null>(null);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [filter, setFilter] = useState<'all' | 'food' | 'money' | 'clothing'>('all');

  useEffect(() => {
    const currentSession = getSession();
    if (!currentSession) {
      navigate('/login');
      return;
    }
    setSession(currentSession);

    // Fetch donations from backend
    const fetchDonations = async () => {
      const userDonations = await getRecordsByUser(currentSession.userId);
      setDonations(userDonations.reverse());
    };

    fetchDonations().catch((error) => {
      console.error('Error fetching donations:', error);
    });
  }, [navigate]);

  const filteredDonations =
    filter === 'all' ? donations : donations.filter((d) => d.type === filter);

  return (
    <Layout session={session}>
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Donation History</h1>

        {/* Filter Buttons */}
        <div className="flex gap-3 flex-wrap">
          {(['all', 'food', 'money', 'clothing'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                filter === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card title="Total Donations">
            <p className="text-3xl font-bold text-blue-600">{donations.length}</p>
          </Card>
          <Card title="Approved">
            <p className="text-3xl font-bold text-green-600">
              {donations.filter((d) => d.status === 'approved').length}
            </p>
          </Card>
          <Card title="Pending">
            <p className="text-3xl font-bold text-yellow-600">
              {donations.filter((d) => d.status === 'pending').length}
            </p>
          </Card>
          <Card title="Rejected">
            <p className="text-3xl font-bold text-red-600">
              {donations.filter((d) => d.status === 'rejected').length}
            </p>
          </Card>
        </div>

        {/* Donations List */}
        <Card title={`${filter.charAt(0).toUpperCase() + filter.slice(1)} Donations`}>
          <DonationTable donations={filteredDonations} />
        </Card>
      </div>
    </Layout>
  );
};
