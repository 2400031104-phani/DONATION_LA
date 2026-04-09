import { DonationRecord } from '../types';
import { formatDate } from '../utils';

interface DonationTableProps {
  donations: DonationRecord[];
}

export const DonationTable = ({ donations }: DonationTableProps) => {
  if (donations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No donations found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-6 py-3 text-left font-semibold text-gray-900">Type</th>
            <th className="px-6 py-3 text-left font-semibold text-gray-900">Date</th>
            <th className="px-6 py-3 text-left font-semibold text-gray-900">Status</th>
            <th className="px-6 py-3 text-left font-semibold text-gray-900">ID</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-900 capitalize">{donation.type}</td>
              <td className="px-6 py-4 text-gray-600">{formatDate(donation.createdAt)}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    donation.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : donation.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-600 text-xs">{donation.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
