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
import { getSession } from './utils/auth';
import './App.css';

const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
  const session = getSession();
  return session ? element : <Navigate to="/login" />;
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

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
