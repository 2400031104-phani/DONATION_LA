# Frontend to MySQL Database Connection - Complete Setup Guide

## ✅ What's Changed

### 1. **API Client Layer** (`src/utils/api-client.ts`)
- Created centralized API client for all backend communication
- Handles authentication headers with JWT tokens
- Automatic error handling and response parsing
- Base URL: `http://localhost:8080/api`

### 2. **Authentication System** (`src/utils/auth.ts`)
- Updated to use backend JWT authentication
- Functions now call `/auth/login` and `/auth/register` endpoints
- Stores JWT token in `_authToken` localStorage key
- Session data stored in `_dmsSession` localStorage key

### 3. **Donation Services** (`src/utils/service.ts`)
- **All functions are now async** - they call backend API instead of localStorage
- Food donations: `saveFoodDonation()`, `getFoodDonationsByUser()`
- Money donations: `saveMoneyDonation()`, `getMoneyDonationsByUser()`
- Clothing donations: `saveClothingDonation()`, `getClothingDonationsByUser()`
- Generic records: `getRecordById()`, `getRecordsByUser()`, `getRecordsByType()`
- Notifications: `createNotification()`, `getNotificationsByUser()`

### 4. **Updated Pages** (All now use async/await)
- **LoginPage** - Uses `login()` function with backend
- **RegisterPage** - Uses `register()` function with backend
- **DonateFoodPage** - Awaits `saveFoodDonation()` call
- **DonateMoneyPage** - Awaits `saveMoneyDonation()` call
- **DonateClothingPage** - Awaits `saveClothingDonation()` call
- **DashboardPage** - Fetches donations from backend
- **HistoryPage** - Fetches donations from backend

---

## 🔌 Backend API Endpoints Required

### Authentication Endpoints

```
POST /api/auth/login
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "token": "jwt-token-here",
    "user": {
      "userId": "user-id",
      "email": "user@example.com",
      "name": "User Name",
      "role": "donor"
    }
  }
}

---

POST /api/auth/register
Request:
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name",
  "role": "donor"
}

Response: (same as login)
```

### Donation Endpoints

```
POST /api/donations/food
Request:
{
  "userId": "user-id",
  "riceQty": 5,
  "vegQty": 10,
  "type": "food",
  "status": "pending"
}

Response:
{
  "success": true,
  "data": {
    "id": "donation-id",
    "userId": "user-id",
    "type": "food",
    "status": "pending",
    "riceQty": 5,
    "vegQty": 10,
    "createdAt": "2026-04-09T..."
  }
}

---

POST /api/donations/money
Request:
{
  "userId": "user-id",
  "amount": 50,
  "transactionId": "txn_...",
  "type": "money",
  "status": "pending",
  "paymentStatus": "completed"
}

---

POST /api/donations/clothing
Request:
{
  "userId": "user-id",
  "targetAge": 10,
  "quantity": 5,
  "condition": "good",
  "type": "clothing",
  "status": "pending"
}

---

GET /api/donations/:id
Response: Single donation record

GET /api/donations/user/:userId
Response: Array of all donations for user

GET /api/donations/type/:type
Response: Array of donations by type (food, money, clothing)

GET /api/donations/food/user/:userId
Response: Array of food donations for user

GET /api/donations/money/user/:userId
Response: Array of money donations for user

GET /api/donations/clothing/user/:userId
Response: Array of clothing donations for user
```

### Notification Endpoints

```
POST /api/notifications
Request:
{
  "userId": "user-id",
  "type": "approved|rejected|alert",
  "message": "notification message"
}

GET /api/notifications/user/:userId
Response: Array of notifications for user
```

---

## 🗄️ Data Flow

```
Frontend (React)
    ↓
API Client (api-client.ts)
    ↓
Service Functions (service.ts)
    ↓
Backend API (Spring Boot - localhost:8080)
    ↓
MySQL Database (donatehub_db)
```

---

## ✨ Key Features

✅ **JWT Authentication** - Secure token-based auth
✅ **Async Operations** - All data flows are non-blocking
✅ **Error Handling** - Try-catch blocks in all pages
✅ **Loading States** - `isSubmitting`, `isLoading` flags
✅ **User Feedback** - Error messages displayed to users
✅ **Session Management** - Token stored and used in all requests

---

## 🚀 Next Steps

1. **Backend Implementation** - Implement the API endpoints in your Spring Boot application
2. **Database Schema** - Ensure MySQL tables exist for:
   - `users` - User accounts
   - `donations` - Base donation records
   - `food_donations` - Food-specific details
   - `money_donations` - Money-specific details
   - `clothing_donations` - Clothing-specific details
   - `notifications` - User notifications

3. **CORS Configuration** - Add CORS policy to Spring Boot:
   ```java
   @Configuration
   public class CorsConfig implements WebMvcConfigurer {
       @Override
       public void addCorsMappings(CorsRegistry registry) {
           registry.addMapping("/api/**")
               .allowedOrigins("http://localhost:5173", "http://localhost:3000")
               .allowedMethods("GET", "POST", "PUT", "DELETE")
               .allowedHeaders("*")
               .allowCredentials(true);
       }
   }
   ```

4. **Test the Connection** - Start both frontend and backend, then test login/donation flow

---

## 📝 Environment Configuration

Frontend connects to: `http://localhost:8080/api`

Make sure your Spring Boot backend is running on port `8080` before testing the frontend!

---

## 🔒 Security Notes

- JWT tokens are stored in localStorage
- Change `jwt.secret` in `application.yml` to a secure value for production
- Implement proper CORS policies
- Add rate limiting to prevent abuse
- Validate all inputs on backend

---

**All your data will now be stored in MySQL instead of localStorage! 🎉**
