import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { DonateFoodPage } from './pages/DonateFoodPage';
import { DonateMoneyPage } from './pages/DonateMoneyPage';
import { DonateClothingPage } from './pages/DonateClothingPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { HistoryPage } from './pages/HistoryPage';
import { AdminPage } from './pages/AdminPage';
import { getSession } from './utils/auth';
import './App.css';

const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
  const session = getSession();
  return session ? element : <Navigate to="/login" />;
};

const AdminRoute = ({ element }: { element: React.ReactElement }) => {
  const session = getSession();
  if (!session) return <Navigate to="/login" />;
  if (session.role !== 'admin' && session.role !== 'ADMIN') return <Navigate to="/dashboard" />;
  return element;
};

function App() {
  const session = getSession();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Home Route */}
        <Route path="/" element={session ? <Navigate to="/dashboard" /> : <HomePage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
        <Route path="/donate" element={<ProtectedRoute element={<DonateFoodPage />} />} />
        <Route path="/donate/food" element={<ProtectedRoute element={<DonateFoodPage />} />} />
        <Route path="/donate/money" element={<ProtectedRoute element={<DonateMoneyPage />} />} />
        <Route path="/donate/clothing" element={<ProtectedRoute element={<DonateClothingPage />} />} />
        <Route path="/confirmation" element={<ProtectedRoute element={<ConfirmationPage />} />} />
        <Route path="/history" element={<ProtectedRoute element={<HistoryPage />} />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute element={<AdminPage />} />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
