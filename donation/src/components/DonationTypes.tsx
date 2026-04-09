import { useNavigate } from 'react-router-dom';

export const DonationTypes = () => {
  const navigate = useNavigate();

  const donationTypes = [
    {
      id: 'food',
      title: 'Food Donation',
      description: 'Donate rice, vegetables, and other food items.',
      icon: '🍎',
      path: '/donate/food',
    },
    {
      id: 'money',
      title: 'Monetary Donation',
      description: 'Support our mission with a financial contribution.',
      icon: '💰',
      path: '/donate/money',
    },
    {
      id: 'clothing',
      title: 'Clothing Donation',
      description: 'Donate clothes and apparel for those in need.',
      icon: '👕',
      path: '/donate/clothing',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {donationTypes.map((type) => (
        <div
          key={type.id}
          onClick={() => navigate(type.path)}
          className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition transform hover:scale-105"
        >
          <div className="text-5xl mb-4">{type.icon}</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{type.title}</h3>
          <p className="text-gray-600 mb-4">{type.description}</p>
          <button className="text-blue-600 font-semibold hover:text-blue-700">
            Donate Now →
          </button>
        </div>
      ))}
    </div>
  );
};
