# DonateHub React Frontend

**Connecting Hearts, Changing Lives** — A modern donation management platform built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Multiple Donation Types**: Food, monetary, and clothing donations
- **Dashboard**: View donation statistics and recent donations at a glance
- **Donation History**: Track all your donations with filtering and sorting
- **Confirmation Tracking**: Instant confirmation after submission
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Local Storage**: All data persists in browser localStorage

## 📦 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client (prepared for API integration)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Steps

1. **Navigate to project directory**:
   ```bash
   cd donation
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:5173`

## 📚 Project Structure

```
src/
├── components/           # Reusable React components
│   ├── Layout.tsx       # Main layout with nav and footer
│   ├── Card.tsx         # Reusable card component
│   ├── Button.tsx       # Custom button component
│   ├── Input.tsx        # Form input component
│   ├── DonationTypes.tsx # Donation type selector
│   └── DonationTable.tsx # Donations table display
├── pages/               # Page components
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── DashboardPage.tsx
│   ├── DonateFoodPage.tsx
│   ├── DonateMoneyPage.tsx
│   ├── DonateClothingPage.tsx
│   ├── ConfirmationPage.tsx
│   └── HistoryPage.tsx
├── utils/               # Utility modules
│   ├── auth.ts         # Authentication helpers
│   ├── service.ts      # Donation service logic
│   └── index.ts        # General utilities
├── types/               # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main app component with routing
├── main.tsx            # Entry point
├── index.css           # Global styles with Tailwind
└── App.css             # App-specific styles
```

## 🔄 Available Routes

| Route | Description |
|-------|-------------|
| `/login` | User login page |
| `/register` | User registration page |
| `/` | Dashboard (protected) |
| `/donate` | Donation type selector (protected) |
| `/donate/food` | Food donation form (protected) |
| `/donate/money` | Monetary donation form (protected) |
| `/donate/clothing` | Clothing donation form (protected) |
| `/confirmation` | Donation confirmation (protected) |
| `/history` | Donation history (protected) |

## 🔐 Authentication

The app uses localStorage to persist user sessions:

- **Login**: Enter any valid email and password (minimum 6 characters)
- **Register**: Create an account with email and password
- **Session**: Automatically stored in `localStorage` under key `_dmsSession`
- **Logout**: Clears session and redirects to login

### Demo Credentials
```
Email: demo@example.com
Password: password123
```

## 💾 Data Storage

All data is stored in `localStorage` with the following keys:

- `_dmsSession` - Current user session
- `dms_donation_records` - Master donation records
- `dms_food_donations` - Food donation details
- `dms_money_donations` - Monetary donation details
- `dms_clothes_donations` - Clothing donation details
- `dms_notifications` - User notifications
- `dms_thanks` - Temporary success flag after donation

## 🎨 Styling

The application uses **Tailwind CSS** for styling with custom configurations:

- **Primary Color**: Blue (#2563eb)
- **Secondary Color**: Purple (#7c3aed)
- **Responsive Breakpoints**: Mobile, tablet, and desktop optimized

## 🚢 Building for Production

```bash
npm run build
```

Outputs optimized files to the `dist/` directory.

## 📝 Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🔄 Integration with Backend

To connect to a real backend API:

1. Update API endpoints in `src/utils/service.ts`
2. Replace localStorage calls with API calls using axios
3. Update authentication in `src/utils/auth.ts`
4. Handle API errors and loading states

## 📳 Features Explanation

### Donation Flow
1. User logs in → Dashboard
2. Selects donation type → Specific form
3. Fills donation details → Submits
4. Views confirmation → Returns to dashboard
5. Tracks donation in history

### Admin Features (Future)
- Donation approval/rejection
- User management
- Donation analytics
- Organization management

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Keep components small and reusable
4. Write descriptive commit messages

## 📄 License

MIT License - Feel free to use this project for your needs.

## 📞 Support

For questions or issues, please open an issue in the repository.

---

**Built with ❤️ for making a difference**
