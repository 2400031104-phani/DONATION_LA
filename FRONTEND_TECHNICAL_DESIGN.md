# 🎨 DonateHub Frontend - Complete Technical Design

---

## 📑 Table of Contents
1. [Frontend Architecture Overview](#frontend-architecture-overview)
2. [Technology Stack Analysis](#technology-stack-analysis)
3. [Project Structure & Module Organization](#project-structure--module-organization)
4. [Component Architecture](#component-architecture)
5. [State Management Strategy](#state-management-strategy)
6. [Data Flow & API Integration](#data-flow--api-integration)
7. [Routing Architecture](#routing-architecture)
8. [TypeScript Type System](#typescript-type-system)
9. [Styling & Theme System](#styling--theme-system)
10. [Authentication Flow](#authentication-flow)
11. [Form Handling & Validation](#form-handling--validation)
12. [Performance Optimization](#performance-optimization)
13. [Error Handling & Loading States](#error-handling--loading-states)
14. [Testing Strategy](#testing-strategy)
15. [Build & Development Workflow](#build--development-workflow)

---

## 🏗️ Frontend Architecture Overview

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                          │
│                   (React Components)                            │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │               Layout & Page Components                   │  │
│  │  (App.tsx, LoginPage, DashboardPage, etc.)               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           ▲                                     │
│                           │ Uses                                │
│                           ▼                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │            Reusable UI Components                        │  │
│  │  (Button, Input, Card, Table, Modal, etc.)               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           ▲                                     │
│                           │ Styled with                         │
│                           ▼                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          Tailwind CSS + Custom CSS                       │  │
│  │  (Responsive Design, Theme, Animations)                  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                           ▲
                           │ Manages State with
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   STATE MANAGEMENT LAYER                        │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           React Hooks & Context API                      │  │
│  │  (useState, useContext, useReducer, useCallback)          │  │
│  │  AuthContext, DonationContext, UserContext               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           ▲                                     │
│                           │ Calls                               │
│                           ▼                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │            Custom Hooks & Utilities                      │  │
│  │  (useAuth, useDonation, useFetch, useForm)               │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                           ▲
                           │ Fetches Data from
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SERVICE LAYER                                │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         API Service & HTTP Client                        │  │
│  │  (Axios Instance, Interceptors, Error Handling)          │  │
│  │  service.ts - All API calls centralized                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           ▲                                     │
│                           │ Makes HTTP Requests to              │
│                           ▼                                     │
┌─────────────────────────────────────────────────────────────────┐
│                   APPLICATION SERVER                            │
│         Spring Boot Backend (http://localhost:8080/api)         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 💻 Technology Stack Analysis

### Core Technologies

| Technology | Version | Purpose | Why? |
|-----------|---------|---------|------|
| **React** | 18.2.0 | UI Framework | Component-based, Virtual DOM, Hooks support |
| **TypeScript** | 5.2.2 | Type Safety | Catch errors at compile-time, better IDE support |
| **Vite** | 5.0.8 | Build Tool | Lightning-fast HMR, optimized builds |
| **React Router** | 6.22.0 | Client-side Routing | SPA navigation without page reloads |
| **Axios** | 1.6.5 | HTTP Client | Promise-based, interceptors, request cancellation |
| **Tailwind CSS** | 4.2.2 | Styling | Utility-first, responsive design, customizable |

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| **Vitest** | 1.0.4 | Unit Testing | Vite-native, fast test execution |
| **ESLint** | 8.56.0 | Code Quality | Catch bugs, enforce standards |
| **TypeScript ESLint** | 6.15.0 | TS Linting | TypeScript-aware lint rules |
| **PostCSS** | 8.5.8 | CSS Processing | Tailwind, Autoprefixer support |

---

## 📁 Project Structure & Module Organization

### Detailed Directory Structure

```
donation/
│
├── 📂 src/
│   │
│   ├── 📂 components/          # Reusable UI Components
│   │   ├── 📁 common/          # Shared across entire app
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── index.ts        # Barrel export
│   │   │
│   │   ├── 📁 donation/        # Donation-specific components
│   │   │   ├── DonationForm.tsx
│   │   │   ├── DonationTable.tsx
│   │   │   ├── DonationCard.tsx
│   │   │   ├── DonationStatus.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── 📁 auth/            # Auth-specific components
│   │   │   ├── AuthForm.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── 📂 pages/               # Page Components (Route targets)
│   │   ├── HomePage.tsx        # / route
│   │   ├── LoginPage.tsx       # /login
│   │   ├── RegisterPage.tsx    # /register
│   │   ├── DashboardPage.tsx   # /dashboard
│   │   ├── DonatePage.tsx      # Parent donation page
│   │   ├── DonateMoneyPage.tsx # /donate/money
│   │   ├── DonateFoodPage.tsx  # /donate/food
│   │   ├── DonateClothingPage.tsx # /donate/clothing
│   │   ├── HistoryPage.tsx     # /history
│   │   ├── ConfirmationPage.tsx # /confirmation/:id
│   │   ├── AdminPage.tsx       # /admin
│   │   ├── NotFoundPage.tsx    # 404
│   │   └── index.ts
│   │
│   ├── 📂 context/             # Context API & State
│   │   ├── AuthContext.tsx     # Auth state & methods
│   │   ├── DonationContext.tsx # Donation state & methods
│   │   ├── UIContext.tsx       # UI state (notifications, modals)
│   │   ├── ThemeContext.tsx    # Theme (light/dark mode)
│   │   └── index.ts
│   │
│   ├── 📂 hooks/               # Custom React Hooks
│   │   ├── useAuth.ts          # Auth context hook
│   │   ├── useDonation.ts      # Donation context hook
│   │   ├── useFetch.ts         # Generic data fetching
│   │   ├── useForm.ts          # Form state management
│   │   ├── useNotification.ts  # Notification handling
│   │   ├── useLocalStorage.ts  # LocalStorage sync
│   │   ├── useDebounce.ts      # Debounce util
│   │   └── index.ts
│   │
│   ├── 📂 services/            # API & Business Logic
│   │   ├── api.ts              # Axios instance & config
│   │   ├── authService.ts      # Auth API calls
│   │   ├── donationService.ts  # Donation API calls
│   │   ├── userService.ts      # User API calls
│   │   ├── adminService.ts     # Admin API calls
│   │   └── index.ts
│   │
│   ├── 📂 types/               # TypeScript Types & Interfaces
│   │   ├── index.ts            # All type definitions
│   │   ├── auth.ts             # Auth related types
│   │   ├── donation.ts         # Donation related types
│   │   ├── user.ts             # User related types
│   │   ├── api.ts              # API response types
│   │   └── common.ts           # Common types
│   │
│   ├── 📂 utils/               # Utility Functions
│   │   ├── auth.ts             # JWT token management
│   │   ├── validation.ts       # Form validation rules
│   │   ├── formatters.ts       # Date, currency formatting
│   │   ├── constants.ts        # App constants & configs
│   │   ├── errorHandler.ts     # Centralized error handling
│   │   └── index.ts
│   │
│   ├── 📂 styles/              # Global Styles
│   │   ├── globals.css         # Global styles & CSS vars
│   │   ├── tailwind.css        # Tailwind directives
│   │   ├── animations.css      # Custom animations
│   │   └── responsive.css      # Media query helpers
│   │
│   ├── 📂 assets/              # Static Assets
│   │   ├── 📁 images/
│   │   ├── 📁 icons/
│   │   └── 📁 fonts/
│   │
│   ├── App.tsx                 # Root component
│   ├── main.tsx                # Entry point
│   ├── index.css               # Global CSS
│   └── App.css                 # App styles
│
├── 📂 public/                  # Static files (served as-is)
│   ├── index.html
│   └── favicon.ico
│
├── 🔧 Configuration Files
│   ├── vite.config.ts          # Vite build config
│   ├── tsconfig.json           # TypeScript config
│   ├── tsconfig.node.json      # TS config for Node files
│   ├── tailwind.config.js      # Tailwind CSS config
│   ├── postcss.config.js       # PostCSS config
│   ├── package.json            # NPM dependencies
│   ├── vitest.config.ts        # Vitest config
│   └── .eslintrc.json          # ESLint config
│
├── 📚 Documentation
│   ├── README.md
│   ├── SETUP.md
│   └── CONTRIBUTING.md
│
└── 🔗 Environment
    └── .env.example            # Environment variables template
```

---

## 🧩 Component Architecture

### Component Hierarchy & Dependencies

```
App (Root)
│
├── Layout
│   ├── Header
│   │   └── Navigation
│   ├── Sidebar (conditional)
│   ├── MainContent (children routes)
│   └── Footer
│
├── Routes
│   ├── /
│   │   └── HomePage
│   ├── /login
│   │   └── LoginPage
│   │       └── AuthForm (email/password)
│   ├── /register
│   │   └── RegisterPage
│   │       └── AuthForm (full form)
│   ├── /dashboard
│   │   └── DashboardPage
│   │       ├── Card (stats)
│   │       ├── DonationTable
│   │       │   └── DonationCard (each row)
│   │       └── Button (quick donate)
│   ├── /donate
│   │   ├── /donate/money
│   │   │   └── DonateMoneyPage
│   │   │       └── DonationForm
│   │   │           ├── Input (amount)
│   │   │           ├── Input (description)
│   │   │           └── Button (submit)
│   │   ├── /donate/food
│   │   │   └── DonateFoodPage
│   │   │       └── DonationForm
│   │   │           ├── Input (quantity)
│   │   │           └── Button (submit)
│   │   └── /donate/clothing
│   │       └── DonateClothingPage
│   │           └── DonationForm
│   │               ├── Input (quantity)
│   │               ├── Select (age group)
│   │               └── Button (submit)
│   ├── /history
│   │   └── HistoryPage (filters + DonationTable)
│   ├── /confirmation/:id
│   │   └── ConfirmationPage
│   │       └── Card (success message)
│   ├── /admin
│   │   └── AdminPage (admin-only)
│   │       ├── DonationTable
│   │       │   ├── Button (approve)
│   │       │   ├── Button (reject)
│   │       │   └── Modal (reject reason)
│   │       └── Statistics
│   └── /* (not found)
│       └── NotFoundPage
│
└── ErrorBoundary (wraps everything)
```

### Component Specifications

#### **Button Component**
```typescript
// components/common/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  tooltip?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  // ... other props
}) => {
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-800',
  };

  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        rounded-lg font-medium transition-colors duration-200
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};
```

#### **Card Component**
```typescript
// components/common/Card.tsx
interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  hoverable = false,
  // ... others
}) => {
  return (
    <div
      className={`
        bg-white rounded-lg shadow-md p-6 border border-gray-100
        ${hoverable ? 'hover:shadow-lg transition-shadow cursor-pointer' : ''}
        ${className}
      `}
    >
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      {children}
    </div>
  );
};
```

#### **Input Component**
```typescript
// components/common/Input.tsx
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  pattern?: string;
  className?: string;
  icon?: React.ReactNode;
  hint?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  error,
  className = '',
  // ... others
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`
          w-full px-4 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {hint && <p className="text-gray-500 text-sm mt-1">{hint}</p>}
    </div>
  );
};
```

#### **DonationTable Component**
```typescript
// components/donation/DonationTable.tsx
interface DonationTableProps {
  donations: Donation[];
  loading?: boolean;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  isAdmin?: boolean;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
  };
  onPageChange?: (page: number) => void;
}

export const DonationTable: React.FC<DonationTableProps> = ({
  donations,
  loading,
  isAdmin,
  // ... others
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left">ID</th>
            <th className="px-6 py-3 text-left">Type</th>
            <th className="px-6 py-3 text-left">Amount/Qty</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Date</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">#{donation.id}</td>
              <td className="px-6 py-4">{donation.type}</td>
              <td className="px-6 py-4">
                {donation.amount || donation.quantity}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={donation.status} />
              </td>
              <td className="px-6 py-4">{formatDate(donation.createdAt)}</td>
              <td className="px-6 py-4 space-x-2">
                {/* Action buttons */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

---

## 🔄 State Management Strategy

### Context API Structure

#### **AuthContext**
```typescript
// context/AuthContext.tsx
interface AuthContextType {
  // State
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  
  // Methods
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
  
  // Error handling
  error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load token from localStorage on mount
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
      // Validate token and fetch user
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await authService.login(email, password);
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('authToken', response.token);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      isAuthenticated: !!token,
      login,
      register,
      logout,
      updateProfile,
      clearError,
      error,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### **DonationContext**
```typescript
// context/DonationContext.tsx
interface DonationContextType {
  // State
  donations: Donation[];
  selectedDonation: Donation | null;
  loading: boolean;
  filters: DonationFilters;
  
  // Methods
  fetchDonations: (filters?: DonationFilters) => Promise<void>;
  fetchDonationById: (id: number) => Promise<void>;
  createDonation: (data: CreateDonationData) => Promise<Donation>;
  updateDonation: (id: number, data: UpdateDonationData) => Promise<void>;
  deleteDonation: (id: number) => Promise<void>;
  
  // Admin methods
  approveDonation: (id: number) => Promise<void>;
  rejectDonation: (id: number, reason: string) => Promise<void>;
  
  // Pagination
  pagination: PaginationState;
  setPage: (page: number) => void;
  
  // Error
  error: string | null;
}

export const DonationContext = createContext<DonationContextType | undefined>(undefined);
```

#### **UIContext**
```typescript
// context/UIContext.tsx
interface UIContextType {
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  
  // Modals
  openModal: (type: string, data?: any) => void;
  closeModal: () => void;
  currentModal: { type: string; data?: any } | null;
  
  // Loading states
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
  
  // Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const UIContext = createContext<UIContextType | undefined>(undefined);
```

---

## 📊 Data Flow & API Integration

### Complete Data Flow Diagram

```
USER ACTION (Button Click)
        │
        ▼
   EVENT HANDLER (onClick)
        │
        ▼
   VALIDATE / PRE-PROCESS
        │
        ▼
   SET LOADING STATE (Context)
        │
        ▼
   CALL API SERVICE (Axios)
        │
        ├─ Add Authorization Header (JWT Token)
        │
        ├─ Add Request Interceptor
        │
        ▼
   HTTP REQUEST (POST/GET/PUT/DELETE)
        │
        ▼
   BACKEND (Spring Boot API)
        │
        ├─ JWT Filter Validation
        │
        ├─ Business Logic
        │
        ├─ Database Query
        │
        ▼
   HTTP RESPONSE
        │
        ├─ Success (200/201)
        │ ├─ Response Interceptor
        │ ├─ Parse Data
        │ ├─ Update Context State
        │ ├─ Show Notification
        │ └─ Navigate/Redirect
        │
        └─ Error (4xx/5xx)
            ├─ Error Interceptor
            ├─ Extract Error Message
            ├─ Check if 401 (Token Expired)
            │   └─ Logout & Redirect to Login
            ├─ Show Error Notification
            └─ Update UI for Retry
```

### API Service Implementation

```typescript
// services/api.ts
import axios, { AxiosError, AxiosInstance } from 'axios';

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Add JWT Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle Errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired - logout
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

### Service Layer

```typescript
// services/authService.ts
import api from './api';

export const authService = {
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async logout() {
    // Server-side logout if needed
    localStorage.removeItem('authToken');
  },

  async getCurrentUser() {
    const response = await api.get('/users/me');
    return response.data;
  },
};

// services/donationService.ts
export const donationService = {
  async getDonations(filters?: DonationFilters) {
    const queryParams = new URLSearchParams();
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.type) queryParams.append('type', filters.type);
    
    const response = await api.get(`/donations?${queryParams}`);
    return response.data;
  },

  async createDonation(data: CreateDonationData) {
    const response = await api.post('/donations', data);
    return response.data;
  },

  async updateDonation(id: number, data: UpdateDonationData) {
    const response = await api.put(`/donations/${id}`, data);
    return response.data;
  },

  async deleteDonation(id: number) {
    await api.delete(`/donations/${id}`);
  },
};
```

---

## 🗺️ Routing Architecture

### React Router Configuration

```typescript
// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DonationProvider>
          <UIProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* Donation Routes */}
              <Route
                path="/donate/*"
                element={
                  <ProtectedRoute>
                    <Routes>
                      <Route path="money" element={<DonateMoneyPage />} />
                      <Route path="food" element={<DonateFoodPage />} />
                      <Route path="clothing" element={<DonateClothingPage />} />
                      <Route path="*" element={<Navigate to="/donate/money" />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <HistoryPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/confirmation/:id"
                element={
                  <ProtectedRoute>
                    <ConfirmationPage />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="ADMIN">
                    <AdminPage />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </UIProvider>
        </DonationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
```

### Protected Route Component

```typescript
// components/auth/ProtectedRoute.tsx
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'DONOR' | 'ADMIN' | 'ORGANIZATION';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};
```

---

## 📦 TypeScript Type System

### Type Definitions

```typescript
// types/index.ts

// ============ USER TYPES ============
export enum UserRole {
  DONOR = 'DONOR',
  ADMIN = 'ADMIN',
  ORGANIZATION = 'ORGANIZATION',
}

export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterData extends AuthRequest {
  username: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  user: User;
}

// ============ DONATION TYPES ============
export enum DonationType {
  FOOD = 'FOOD',
  CLOTHING = 'CLOTHING',
  MONEY = 'MONEY',
  APPAREL = 'APPAREL',
}

export enum DonationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
}

export interface Donation {
  id: number;
  userId: number;
  type: DonationType;
  status: DonationStatus;
  description: string;
  
  // Food fields
  riceQuantity?: number;
  vegetableQuantity?: number;
  
  // Clothing fields
  clothingQuantity?: number;
  targetAgeGroup?: string;
  
  // Money fields
  amount?: number;
  currency?: string;
  transactionId?: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  rejectionReason?: string;
}

export interface CreateDonationData {
  type: DonationType;
  description: string;
  riceQuantity?: number;
  vegetableQuantity?: number;
  clothingQuantity?: number;
  targetAgeGroup?: string;
  amount?: number;
}

export interface UpdateDonationData extends Partial<CreateDonationData> {}

export interface DonationFilters {
  status?: DonationStatus;
  type?: DonationType;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  pageSize?: number;
}

// ============ API TYPES ============
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  code: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;
  timestamp: string;
  path: string;
}

// ============ UI TYPES ============
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

export interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
}

// ============ PAGINATION ============
export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
```

---

## 🎨 Styling & Theme System

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#f9fafb',
          500: '#6b7280',
          600: '#4b5563',
        },
        success: {
          500: '#10b981',
          600: '#059669',
        },
        danger: {
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      spacing: {
        'safe': 'max(1rem, env(safe-area-inset-bottom))',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '0.75rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        slideUp: 'slideUp 0.3s ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
```

### Global Styles

```css
/* styles/globals.css */
:root {
  --color-primary: #3b82f6;
  --color-primary-dark: #1d4ed8;
  --color-secondary: #6b7280;
  --color-success: #10b981;
  --color-danger: #ef4444;
  --color-warning: #f59e0b;
  --color-info: #0ea5e9;
  
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.5rem;
  --border-radius-lg: 0.75rem;
  
  --transition-duration: 200ms;
  --transition-timing: ease-in-out;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #1f2937;
  background: #f9fafb;
}

/* Smooth transitions */
button, a, input, select, textarea {
  transition: all var(--transition-duration) var(--transition-timing);
}

/* Focus styles */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
```

---

## 🔐 Authentication Flow

### Complete Authentication Sequence

```
┌─ User opens App
│
├─ Check localStorage for authToken
│
├─ If token exists:
│  ├─ Load token
│  │
│  ├─ Validate token expiration
│  │
│  ├─ If valid:
│  │  ├─ Fetch current user data
│  │  │
│  │  ├─ Set AuthContext state
│  │  │
│  │  └─ Allow access to protected routes
│  │
│  └─ If invalid:
│     ├─ Clear localStorage
│     │
│     └─ Redirect to /login
│
└─ If no token:
   ├─ Show public routes
   │
   └─ Redirect to /login for protected routes
```

### Auth Hook Implementation

```typescript
// hooks/useAuth.ts
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
};
```

### Login Flow

```typescript
// pages/LoginPage.tsx
export const LoginPage: React.FC = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      // Error handled in context
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <Card title="Login">
        <form onSubmit={handleSubmit}>
          {error && <ErrorAlert message={error} />}
          
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          
          <Button type="submit" fullWidth loading={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Card>
    </div>
  );
};
```

---

## 📝 Form Handling & Validation

### Custom useForm Hook

```typescript
// hooks/useForm.ts
interface UseFormOptions {
  initialValues: Record<string, any>;
  onSubmit: (values: Record<string, any>) => Promise<void> | void;
  validationSchema?: Record<string, ValidationRule[]>;
}

export const useForm = ({
  initialValues,
  onSubmit,
  validationSchema,
}: UseFormOptions) => {
  const [formState, setFormState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  });

  const validateField = (name: string, value: any) => {
    const rules = validationSchema?.[name] || [];
    
    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormState((prev) => ({
      ...prev,
      values: { ...prev.values, [name]: value },
      errors: {
        ...prev.errors,
        [name]: validateField(name, value),
      },
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    
    setFormState((prev) => ({
      ...prev,
      touched: { ...prev.touched, [name]: true },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormState((prev) => ({ ...prev, isSubmitting: true }));
    
    try {
      await onSubmit(formState.values);
    } catch (error) {
      console.error(error);
    } finally {
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const resetForm = () => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
    });
  };

  return {
    ...formState,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
};
```

### Validation Rules

```typescript
// utils/validation.ts
export type ValidationRule = (value: any) => string | undefined;

export const validators = {
  required: (message = 'This field is required'): ValidationRule => (value) => {
    return !value || (typeof value === 'string' && value.trim() === '') ? message : undefined;
  },

  email: (message = 'Invalid email address'): ValidationRule => (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return value && !emailRegex.test(value) ? message : undefined;
  },

  minLength: (min: number, message?: string): ValidationRule => (value) => {
    return value && value.length < min ? (message || `Minimum ${min} characters`) : undefined;
  },

  maxLength: (max: number, message?: string): ValidationRule => (value) => {
    return value && value.length > max ? (message || `Maximum ${max} characters`) : undefined;
  },

  phone: (message = 'Invalid phone number'): ValidationRule => (value) => {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return value && !phoneRegex.test(value) ? message : undefined;
  },
};
```

### Form Usage Example

```typescript
// pages/DonateMoneyPage.tsx
export const DonateMoneyPage: React.FC = () => {
  const { createDonation } = useDonation();
  const navigate = useNavigate();
  
  const form = useForm({
    initialValues: {
      amount: '',
      description: '',
    },
    
    validationSchema: {
      amount: [
        validators.required('Amount is required'),
        validators.number('Amount must be a number'),
        validators.min(10, 'Minimum amount is $10'),
      ],
      description: [
        validators.maxLength(500, 'Description too long'),
      ],
    },
    
    onSubmit: async (values) => {
      const donation = await createDonation({
        type: DonationType.MONEY,
        ...values,
      });
      navigate(`/confirmation/${donation.id}`);
    },
  });

  return (
    <Card title="Donate Money">
      <form onSubmit={form.handleSubmit}>
        <Input
          type="number"
          name="amount"
          label="Amount (USD)"
          placeholder="Enter amount"
          value={form.values.amount}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={form.touched.amount ? form.errors.amount : undefined}
          required
        />
        
        <textarea
          name="description"
          {...form}
          placeholder="Optional message"
          className="w-full p-2 border rounded"
        />
        
        <Button
          type="submit"
          fullWidth
          loading={form.isSubmitting}
        >
          Donate Now
        </Button>
      </form>
    </Card>
  );
};
```

---

## ⚡ Performance Optimization

### Code Splitting

```typescript
// App.tsx
import { Suspense, lazy } from 'react';

const HomePage = lazy(() => import('./pages/HomePage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

export const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Suspense>
  );
};
```

### Memoization

```typescript
// Prevent unnecessary re-renders
export const DonationTable = React.memo((props: DonationTableProps) => {
  return /* render */;
}, (prevProps, nextProps) => {
  // Custom comparison
  return prevProps.donations === nextProps.donations;
});

// useCallback for function memoization
const handleApprove = useCallback((id: number) => {
  approveDonation(id);
}, [approveDonation]);
```

### Lazy Loading Images

```typescript
export const DonationCard: React.FC<DonationCardProps> = ({ donation }) => {
  return (
    <img
      src={donation.image}
      alt={donation.title}
      loading="lazy"
      decoding="async"
    />
  );
};
```

### Virtual Scrolling for Large Lists

```typescript
// For large donation tables
import { FixedSizeList } from 'react-window';

export const LargeDonationList: React.FC<{ donations: Donation[] }> = ({ donations }) => {
  const Row = ({ index, style }: any) => (
    <div style={style}>
      {/* Render single row */}
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={donations.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
};
```

---

## ⚠️ Error Handling & Loading States

### Error Boundary

```typescript
// components/common/ErrorBoundary.tsx
interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error:', error, errorInfo);
    // Send to error tracking service (Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card title="Something went wrong">
          <p>{this.state.error?.message}</p>
          <Button onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </Card>
      );
    }

    return this.props.children;
  }
}
```

### Centralized Error Handling

```typescript
// utils/errorHandler.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
  }
}

export const handleApiError = (error: AxiosError): AppError => {
  if (error.response?.status === 401) {
    return new AppError('Unauthorized. Please login again.', 'UNAUTHORIZED', 401);
  }
  
  if (error.response?.status === 403) {
    return new AppError('You do not have permission.', 'FORBIDDEN', 403);
  }
  
  if (error.response?.status === 404) {
    return new AppError('Resource not found.', 'NOT_FOUND', 404);
  }
  
  if (error.response?.status === 500) {
    return new AppError('Server error. Please try again later.', 'SERVER_ERROR', 500);
  }
  
  return new AppError(
    error.message || 'An unexpected error occurred.',
    'UNKNOWN_ERROR'
  );
};
```

### Loading States UI

```typescript
// components/common/LoadingSpinner.tsx
export const LoadingSpinner: React.FC<{ message?: string }> = ({
  message = 'Loading...',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
};

// Skelleton loader for content
export const SkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
};
```

---

## 🧪 Testing Strategy

### Unit Tests

```typescript
// components/common/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('should render button with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Hook Tests

```typescript
// hooks/useForm.test.ts
import { renderHook, act } from '@testing-library/react';
import { useForm } from './useForm';

describe('useForm Hook', () => {
  it('should update form values on change', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: { email: '' },
        onSubmit: vi.fn(),
      })
    );

    act(() => {
      result.current.handleChange({
        target: { name: 'email', value: 'test@example.com' },
      } as any);
    });

    expect(result.current.values.email).toBe('test@example.com');
  });
});
```

### Integration Tests

```typescript
// tests/integration/donation-flow.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('Donation Flow', () => {
  it('should complete donation creation flow', async () => {
    const mockCreateDonation = vi.fn().mockResolvedValue({ id: 1 });
    
    render(<DonateMoneyPage onCreate={mockCreateDonation} />);
    
    await userEvent.type(screen.getByLabelText(/amount/i), '100');
    await userEvent.click(screen.getByRole('button', { name: /donate/i }));
    
    await waitFor(() => {
      expect(mockCreateDonation).toHaveBeenCalledWith(
        expect.objectContaining({ amount: 100 })
      );
    });
  });
});
```

---

## 🔨 Build & Development Workflow

### Development Server Setup

```bash
# Install dependencies
npm install

# Start development server (with HMR)
npm run dev
# Vite runs on http://localhost:5173

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
    cors: true,
  },

  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['axios'],
        },
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Environment Variables

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=DonateHub
VITE_DEBUG=true

# .env.production
VITE_API_BASE_URL=https://api.donatehub.com
VITE_APP_NAME=DonateHub
VITE_DEBUG=false
```

---

## 📊 Summary: Frontend Technical Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **UI Components** | React 18 + TSX | Component-based architecture |
| **State Management** | Context API + Hooks | Global & local state |
| **Styling** | Tailwind CSS 4 | Utility-first design |
| **Routing** | React Router 6 | Client-side navigation |
| **HTTP Client** | Axios | API communication |
| **Type Safety** | TypeScript 5 | Static type checking |
| **Build Tool** | Vite 5 | Fast dev & production builds |
| **Testing** | Vitest + RTL | Unit & integration tests |
| **Code Quality** | ESLint + TypeScript | Standards enforcement |
| **Performance** | Code splitting, Memoization | Optimized loading & rendering |

---

**Technical Documentation Status:** ✅ Complete
**Last Updated:** April 9, 2026
**Frontend Version:** 1.0.0
