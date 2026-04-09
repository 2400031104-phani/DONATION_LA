import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { getSession } from '../utils/auth';
import type { SessionData, DonationRecord } from '../types';

export const AdminPage = () => {
  const [session, setSession] = useState<SessionData | null>(null);
  const [donations, setDonations] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedDonation, setSelectedDonation] = useState<any>(null);

  useEffect(() => {
    const currentSession = getSession();
    if (currentSession?.role !== 'admin' && currentSession?.role !== 'ADMIN') {
      window.location.href = '/';
      return;
    }
    setSession(currentSession);
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/donations', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const donationsList = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
      
      setDonations(donationsList);
      
      // Calculate stats
      setStats({
        total: donationsList.length,
        pending: donationsList.filter((d: any) => d.status === 'PENDING').length,
        approved: donationsList.filter((d: any) => d.status === 'APPROVED').length,
        rejected: donationsList.filter((d: any) => d.status === 'REJECTED').length,
      });
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveDonation = async (donationId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/donations/${donationId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        fetchDonations();
        setSelectedDonation(null);
      }
    } catch (error) {
      console.error('Error approving donation:', error);
    }
  };

  const rejectDonation = async (donationId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/donations/${donationId}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        fetchDonations();
        setSelectedDonation(null);
      }
    } catch (error) {
      console.error('Error rejecting donation:', error);
    }
  };

  if (!session) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <Layout session={session}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white p-8">
          <h1 className="text-4xl font-bold mb-2">Admin Control Hub</h1>
          <p className="text-lg opacity-90">
            Real-time feed of all submissions. Approve or reject donations, and track inventory.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card title="Total Records" className="border-l-4 border-blue-500">
            <p className="text-4xl font-bold text-blue-600">{stats.total}</p>
          </Card>
          <Card title="Pending" className="border-l-4 border-yellow-500">
            <p className="text-4xl font-bold text-yellow-600">{stats.pending}</p>
          </Card>
          <Card title="Approved" className="border-l-4 border-green-500">
            <p className="text-4xl font-bold text-green-600">{stats.approved}</p>
          </Card>
          <Card title="Rejected" className="border-l-4 border-red-500">
            <p className="text-4xl font-bold text-red-600">{stats.rejected}</p>
          </Card>
        </div>

        {/* Status Message */}
        {stats.pending === 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <div className="text-green-600 text-2xl">✅</div>
            <div>
              <h3 className="font-semibold text-green-900">All caught up!</h3>
              <p className="text-green-800">Every submission has been reviewed — no pending donations remain.</p>
            </div>
          </div>
        )}

        {/* Donations Table */}
        <Card title="All Donations">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">Type</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Details</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center p-6 text-gray-500">
                      Loading donations...
                    </td>
                  </tr>
                ) : donations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-6 text-gray-500">
                      No donations found.
                    </td>
                  </tr>
                ) : (
                  donations.map((donation) => (
                    <tr key={donation.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-mono text-sm">{donation.id}</td>
                      <td className="p-3">
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                          {donation.type}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            donation.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-800'
                              : donation.status === 'APPROVED'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {donation.status}
                        </span>
                      </td>
                      <td className="p-3 text-sm">
                        {donation.type === 'FOOD' && (
                          <span>Rice: {donation.riceQuantity}kg, Veg: {donation.vegetableQuantity}kg</span>
                        )}
                        {donation.type === 'MONEY' && <span>${donation.amount}</span>}
                        {donation.type === 'CLOTHING' && (
                          <span>Age: {donation.targetAge}, Qty: {donation.clothingQuantity}</span>
                        )}
                      </td>
                      <td className="p-3">
                        {donation.status === 'PENDING' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => approveDonation(donation.id)}
                              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                            >
                              ✓ Approve
                            </button>
                            <button
                              onClick={() => rejectDonation(donation.id)}
                              className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                            >
                              ✕ Reject
                            </button>
                          </div>
                        )}
                        {donation.status !== 'PENDING' && (
                          <span className="text-gray-500 text-sm">Reviewed</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Inventory Summary */}
        <Card title="Approved Inventory Overview">
          <p className="text-sm text-gray-600 mb-6">Only approved records contribute to these totals.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🍚</div>
              <p className="font-semibold text-gray-900">
                {donations
                  .filter((d) => d.type === 'FOOD' && d.status === 'APPROVED')
                  .reduce((sum, d) => sum + (d.riceQuantity || 0), 0)}
                kg
              </p>
              <p className="text-sm text-gray-600">Rice (Total)</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">🥬</div>
              <p className="font-semibold text-gray-900">
                {donations
                  .filter((d) => d.type === 'FOOD' && d.status === 'APPROVED')
                  .reduce((sum, d) => sum + (d.vegetableQuantity || 0), 0)}
                kg
              </p>
              <p className="text-sm text-gray-600">Vegetables (Total)</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">💰</div>
              <p className="font-semibold text-gray-900">
                ${donations
                  .filter((d) => d.type === 'MONEY' && d.status === 'APPROVED')
                  .reduce((sum, d) => sum + (d.amount || 0), 0)
                  .toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">Transactions</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-3xl mb-2">👕</div>
              <p className="font-semibold text-gray-900">
                {donations
                  .filter((d) => d.type === 'CLOTHING' && d.status === 'APPROVED')
                  .reduce((sum, d) => sum + (d.clothingQuantity || 0), 0)}
              </p>
              <p className="text-sm text-gray-600">Clothing Donations</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
