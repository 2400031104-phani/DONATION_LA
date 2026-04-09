import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';
import type { SessionData } from '../types';

interface LayoutProps {
  children: ReactNode;
  session: SessionData | null;
}

export const Layout = ({ children, session }: LayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <h1 className="text-2xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DonateHub
              </h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => navigate('/')}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/donate')}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Donate
              </button>
              <button
                onClick={() => navigate('/history')}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                History
              </button>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {session && (
                <>
                  <div className="hidden md:block">
                    <p className="text-sm text-gray-600">{session.name}</p>
                    <p className="text-xs text-gray-500">{session.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">DonateHub</h3>
              <p className="text-gray-400">Connecting hearts, changing lives through generous donations.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate('/')} className="hover:text-white">Home</button></li>
                <li><button onClick={() => navigate('/donate')} className="hover:text-white">Donate</button></li>
                <li><button onClick={() => navigate('/history')} className="hover:text-white">History</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">Email: info@donatehub.com</p>
              <p className="text-gray-400">Phone: (555) 123-4567</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DonateHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
