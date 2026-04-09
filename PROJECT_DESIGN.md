# 🎯 DonateHub - Complete Project Design Document

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [System Architecture](#system-architecture)
4. [Project Structure](#project-structure)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Frontend Components & Pages](#frontend-components--pages)
8. [Backend Services & Controllers](#backend-services--controllers)
9. [Authentication & Security](#authentication--security)
10. [User Workflows](#user-workflows)
11. [Deployment & Configuration](#deployment--configuration)

---

## 🚀 Project Overview

**DonateHub** is a comprehensive donation management platform designed to facilitate three types of donations:
- **💰 Money Donations** - Direct monetary contributions
- **🍲 Food Donations** - Rice, vegetables, and food items
- **👕 Clothing Donations** - Apparel for specific age groups

### Key Features
- ✅ User registration and authentication (JWT-based)
- ✅ Multiple donation types with dynamic forms
- ✅ Real-time donation tracking and history
- ✅ Admin portal for donation management
- ✅ Role-based access control (DONOR, ADMIN, ORGANIZATION)
- ✅ Secure data storage with MySQL

---

## 🛠️ Technology Stack

### **Frontend** (Client-Side)
| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | React | 18.2.0 |
| Language | TypeScript | 5.2.2 |
| Build Tool | Vite | 5.0.8 |
| Styling | Tailwind CSS | 4.2.2 |
| HTTP Client | Axios | 1.6.5 |
| Routing | React Router DOM | 6.22.0 |
| Testing | Vitest | 1.0.4 |
| Linting | ESLint | 8.56.0 |

**Frontend Port:** `5173`

---

### **Backend** (Server-Side)
| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | Spring Boot | 3.4.0 |
| Language | Java | 21 (LTS) |
| Build Tool | Maven | 3.8+ |
| Web Server | Apache Tomcat | (Built-in) |
| Security | Spring Security | (Latest) |
| ORM | Hibernate + JPA | (Latest) |
| Authentication | JWT (JJWT) | 0.13.0 |
| Database Driver | MySQL Connector/J | 8.3.0 |

**Backend Port:** `8080`
**API Base Path:** `/api`

---

### **Database**
| Component | Technology | Version |
|-----------|-----------|---------|
| Database | MySQL | 8.0+ |
| Host | localhost | - |
| Port | 3306 | - |
| Character Set | UTF8MB4 | - |

---

## 🏗️ System Architecture

### Three-Tier Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  PRESENTATION LAYER (Frontend)                              │
│  React Components | Tailwind UI | LocalStorage (JWT Token)  │
│  Port: 5173                                                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP/AJAX (Axios)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  APPLICATION LAYER (Backend)                                │
│  Spring Boot REST API | JWT Security | Business Logic       │
│  Controllers → Services → Repositories → Hibernate ORM      │
│  Port: 8080, Path: /api                                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ SQL Queries
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  PERSISTENCE LAYER (Database)                               │
│  MySQL 8.0+ | InnoDB Engine | 3 Main Tables                │
│  Port: 3306                                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

### Frontend Structure
```
donation/
├── src/
│   ├── components/
│   │   ├── Button.tsx          # Reusable button component
│   │   ├── Card.tsx            # Card layout wrapper
│   │   ├── Input.tsx           # Form input component
│   │   ├── Layout.tsx          # Main layout wrapper
│   │   ├── DonationTable.tsx    # Donation history table
│   │   └── DonationTypes.tsx    # Donation type selector
│   │
│   ├── pages/
│   │   ├── LoginPage.tsx       # Authentication
│   │   ├── RegisterPage.tsx    # User registration
│   │   ├── DashboardPage.tsx   # Main dashboard
│   │   ├── HistoryPage.tsx     # Donation history
│   │   ├── DonateMoneyPage.tsx # Money donation form
│   │   ├── DonateFoodPage.tsx  # Food donation form
│   │   ├── DonateClothingPage.tsx # Clothing donation form
│   │   └── ConfirmationPage.tsx   # Success confirmation
│   │
│   ├── utils/
│   │   ├── auth.ts             # Auth token management
│   │   ├── service.ts          # API calls (Axios)
│   │   ├── index.ts            # Helper utilities
│   │
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   │
│   ├── App.tsx                 # Main App component
│   ├── main.tsx                # Entry point
│   ├── index.css               # Global styles
│   └── App.css
│
├── css/
│   ├── styles.css              # Additional CSS
│
├── js/
│   ├── alpine-store.js         # State management
│   ├── auth.js                 # Auth utilities
│   ├── service.js              # API service
│   └── utils.js                # General utilities
│
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite configuration
└── tailwind.config.js          # Tailwind CSS config
```

### Backend Structure
```
donation-backend/
├── src/main/
│   ├── java/com/donatehub/api/
│   │   ├── DonationBackendApplication.java    # Main Spring Boot app
│   │   │
│   │   ├── controller/
│   │   │   ├── AuthController.java            # Login/Register
│   │   │   ├── DonationController.java        # CRUD operations
│   │   │   ├── UserController.java            # User management
│   │   │   └── AdminController.java           # Admin operations
│   │   │
│   │   ├── service/
│   │   │   ├── AuthService.java               # Auth logic
│   │   │   ├── DonationService.java           # Donation logic
│   │   │   ├── UserService.java               # User logic
│   │   │   └── JwtTokenProvider.java          # JWT generation
│   │   │
│   │   ├── repository/
│   │   │   ├── UserRepository.java            # User CRUD
│   │   │   ├── DonationRepository.java        # Donation CRUD
│   │   │   └── DonationHistoryRepository.java # Audit logs
│   │   │
│   │   ├── entity/
│   │   │   ├── User.java                      # User JPA entity
│   │   │   ├── Donation.java                  # Donation JPA entity
│   │   │   └── DonationHistory.java           # Audit JPA entity
│   │   │
│   │   ├── dto/
│   │   │   ├── AuthRequest.java               # Login/Register request
│   │   │   ├── AuthResponse.java              # Auth response
│   │   │   ├── DonationRequest.java           # Donation request
│   │   │   ├── DonationResponse.java          # Donation response
│   │   │   └── UserDto.java                   # User DTO
│   │   │
│   │   ├── security/
│   │   │   ├── JwtAuthenticationFilter.java   # JWT validation filter
│   │   │   ├── SecurityConfig.java            # Spring Security config
│   │   │   └── JwtTokenProvider.java          # JWT utils
│   │   │
│   │   ├── config/
│   │   │   ├── CorsConfig.java                # CORS settings
│   │   │   ├── Jackson​Config.java            # JSON serialization
│   │   │   └── WebConfig.java                 # Web configuration
│   │   │
│   │   ├── exception/
│   │   │   ├── GlobalExceptionHandler.java    # Error handling
│   │   │   ├── ResourceNotFoundException.java
│   │   │   ├── UnauthorizedException.java
│   │   │   └── BadRequestException.java
│   │   │
│   │   └── enums/
│   │       ├── DonationType.java              # FOOD, CLOTHING, MONEY
│   │       ├── DonationStatus.java            # PENDING, APPROVED, etc
│   │       └── UserRole.java                  # DONOR, ADMIN, ORG
│   │
│   └── resources/
│       ├── application.yml                    # Spring Boot config
│       ├── application-dev.yml                # Dev profile
│       └── application-prod.yml               # Production profile
│
├── src/test/
│   └── java/com/donatehub/api/
│       ├── DonationBackendApplicationTests.java
│       ├── controller/
│       ├── service/
│       └── repository/
│
├── pom.xml                                    # Maven dependencies
├── docker-compose.yml                        # Docker config
└── setup-db.sql                               # Database initialization
```

---

## 🗄️ Database Schema

### Entity Relationship Diagram

```
┌──────────────────────────────────┐
│           USERS TABLE            │
├──────────────────────────────────┤
│ PK: id (BIGINT)                  │
│     email (VARCHAR, UNIQUE)      │
│     username (VARCHAR, UNIQUE)   │
│     password (VARCHAR)           │
│     first_name (VARCHAR)         │
│     last_name (VARCHAR)          │
│     role (ENUM)                  │
│     active (BOOLEAN)             │
│     created_at (DATETIME)        │
│     updated_at (DATETIME)        │
└─────────────┬──────────────────┬─┘
              │ 1:N              │
              │                  │
    ┌─────────▼──────────┐       │
    │   DONATIONS        │       │
    │                    │       │
    │ PK: id            │       │
    │ FK: user_id ──────┼───────┘
    │ type (ENUM)       │
    │ status (ENUM)     │
    │ description       │
    │ amount/quantity   │
    │ created_at        │      ┌─────────────────────────────┐
    │ updated_at        │      │  DONATION_HISTORY TABLE     │
    │ approved_at       │      ├─────────────────────────────┤
    └──────┬────────────┘      │ PK: id                      │
           │ 1:N               │ FK: donation_id ────────┐   │
           │                   │ FK: changed_by_admin_id │   │
           │                   │ old_status              │   │
           │                   │ new_status              │   │
           │                   │ changed_at              │   │
           │                   │ change_description      │   │
           │                   └─────────────────────────────┘
           │
           └─────────────────────────┘ (Audit Trail)
```

### Table Details

#### **1. USERS Table**
```sql
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(20) NOT NULL DEFAULT 'DONOR',
  active BOOLEAN DEFAULT TRUE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_username (username),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

**Roles:**
- `DONOR` - Regular user making donations
- `ADMIN` - Administrator managing donations
- `ORGANIZATION` - Organization partner account

---

#### **2. DONATIONS Table**
```sql
CREATE TABLE donations (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  type VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  description LONGTEXT,
  
  -- Food Donation Fields
  rice_quantity INT,
  vegetable_quantity INT,
  
  -- Clothing Donation Fields
  target_age_group VARCHAR(255),
  clothing_quantity INT,
  
  -- Money Donation Fields
  amount DECIMAL(19, 2),
  transaction_id VARCHAR(255),
  
  -- Timestamps
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  approved_at DATETIME,
  
  CONSTRAINT fk_donations_user_id 
    FOREIGN KEY (user_id) 
    REFERENCES users(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  
  INDEX idx_user_id (user_id),
  INDEX idx_type (type),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

**Donation Types:**
- `FOOD` - Rice, vegetables, food items
- `CLOTHING` - Apparel for specific age groups
- `MONEY` - Monetary donations
- `APPAREL` - Additional apparel category

**Donation Status Flow:**
```
PENDING → APPROVED → COMPLETED
   ↓
REJECTED
```

---

#### **3. DONATION_HISTORY Table** (Audit Trail)
```sql
CREATE TABLE donation_history (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  donation_id BIGINT NOT NULL,
  changed_by_admin_id BIGINT,
  old_status VARCHAR(20),
  new_status VARCHAR(20),
  change_description TEXT,
  changed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_history_donation_id 
    FOREIGN KEY (donation_id) 
    REFERENCES donations(id) 
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

#### 1. **Register User** (Public)
```http
POST /auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass@123",
  "firstName": "John",
  "lastName": "Doe"
}

Response (200 OK):
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "type": "Bearer",
  "userId": 1,
  "email": "john@example.com",
  "username": "johndoe",
  "firstName": "John",
  "lastName": "Doe",
  "role": "DONOR"
}
```

#### 2. **Login User** (Public)
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass@123"
}

Response (200 OK):
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "type": "Bearer",
  "userId": 1,
  "email": "john@example.com",
  "username": "johndoe",
  "role": "DONOR"
}
```

---

### Donation Endpoints (Requires JWT Token)

#### 3. **Create Donation**
```http
POST /donations
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json

# For FOOD Donation:
{
  "type": "FOOD",
  "description": "Rice and vegetables",
  "riceQuantity": 50,
  "vegetableQuantity": 25
}

# For CLOTHING Donation:
{
  "type": "CLOTHING",
  "description": "Winter clothing",
  "clothingQuantity": 100,
  "targetAgeGroup": "Children"
}

# For MONEY Donation:
{
  "type": "MONEY",
  "description": "Charity fund",
  "amount": 500.00,
  "currencyCode": "USD"
}

Response (201 Created):
{
  "id": 1,
  "userId": 1,
  "type": "FOOD",
  "status": "PENDING",
  "description": "Rice and vegetables",
  "riceQuantity": 50,
  "vegetableQuantity": 25,
  "createdAt": "2026-04-09T10:30:00Z",
  "updatedAt": "2026-04-09T10:30:00Z"
}
```

#### 4. **Get All Donations (Current User)**
```http
GET /donations
Authorization: Bearer {JWT_TOKEN}

Response (200 OK):
[
  {
    "id": 1,
    "type": "FOOD",
    "status": "PENDING",
    "description": "Rice and vegetables",
    "createdAt": "2026-04-09T10:30:00Z",
    "updatedAt": "2026-04-09T10:30:00Z"
  },
  {
    "id": 2,
    "type": "MONEY",
    "status": "APPROVED",
    "amount": 500.00,
    "approvedAt": "2026-04-09T11:00:00Z"
  }
]
```

#### 5. **Get Single Donation**
```http
GET /donations/{id}
Authorization: Bearer {JWT_TOKEN}

Response (200 OK):
{
  "id": 1,
  "userId": 1,
  "type": "FOOD",
  "status": "PENDING",
  "description": "Rice and vegetables",
  "riceQuantity": 50,
  "vegetableQuantity": 25,
  "createdAt": "2026-04-09T10:30:00Z",
  "updatedAt": "2026-04-09T10:30:00Z"
}
```

#### 6. **Update Donation**
```http
PUT /donations/{id}
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json

{
  "description": "Updated rice and vegetables",
  "riceQuantity": 60
}

Response (200 OK):
{
  "id": 1,
  "type": "FOOD",
  "status": "PENDING",
  "description": "Updated rice and vegetables",
  "riceQuantity": 60
}
```

#### 7. **Delete Donation**
```http
DELETE /donations/{id}
Authorization: Bearer {JWT_TOKEN}

Response (204 No Content)
```

---

### Admin Endpoints (Requires ADMIN Role)

#### 8. **Get All Donations (Admin)**
```http
GET /admin/donations
Authorization: Bearer {JWT_TOKEN}

Response (200 OK):
[
  // All donations from all users
]
```

#### 9. **Approve Donation**
```http
POST /admin/donations/{id}/approve
Authorization: Bearer {JWT_TOKEN}

Response (200 OK):
{
  "id": 1,
  "status": "APPROVED",
  "approvedAt": "2026-04-09T11:30:00Z"
}
```

#### 10. **Reject Donation**
```http
POST /admin/donations/{id}/reject
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json

{
  "reason": "Insufficient quantity"
}

Response (200 OK):
{
  "id": 1,
  "status": "REJECTED",
  "rejectionReason": "Insufficient quantity"
}
```

---

### User Endpoints

#### 11. **Get Current User**
```http
GET /users/me
Authorization: Bearer {JWT_TOKEN}

Response (200 OK):
{
  "id": 1,
  "email": "john@example.com",
  "username": "johndoe",
  "firstName": "John",
  "lastName": "Doe",
  "role": "DONOR",
  "active": true,
  "createdAt": "2026-04-09T09:00:00Z"
}
```

#### 12. **Update User Profile**
```http
PUT /users/me
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json

{
  "firstName": "Jonathan",
  "lastName": "Smith"
}

Response (200 OK):
{
  "id": 1,
  "email": "john@example.com",
  "firstName": "Jonathan",
  "lastName": "Smith",
  "role": "DONOR"
}
```

---

## 🎨 Frontend Components & Pages

### Component Hierarchy
```
App.tsx
├── Layout
│   ├── Header
│   ├── Navbar
│   ├── Sidebar (Admin)
│   └── Footer
├── Routes
│   ├── Home
│   ├── LoginPage
│   ├── RegisterPage
│   ├── DashboardPage
│   │   ├── DonationTable
│   │   ├── Card (Summary)
│   │   └── Button (Actions)
│   ├── DonateMoneyPage
│   │   ├── Card
│   │   ├── Input
│   │   └── Button
│   ├── DonateFoodPage
│   │   ├── Card
│   │   ├── Input
│   │   └── Button
│   ├── DonateClothingPage
│   │   ├── Card
│   │   ├── Input
│   │   └── Button
│   ├── HistoryPage
│   │   └── DonationTable
│   ├── ConfirmationPage
│   └── AdminPage
│       ├── DonationTable
│       ├── Button (Approve/Reject)
│       └── Card (Statistics)
```

### Key React Components

#### **Button Component**
```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ ... }) => { ... }
```

#### **Card Component**
```typescript
interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ ... }) => { ... }
```

#### **Input Component**
```typescript
interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ ... }) => { ... }
```

#### **DonationTable Component**
```typescript
interface DonationTableProps {
  donations: Donation[];
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
  isAdmin?: boolean;
}

export const DonationTable: React.FC<DonationTableProps> = ({ ... }) => { ... }
```

---

### Frontend Pages

| Page | Route | Purpose | Auth Required |
|------|-------|---------|---------------|
| Home | `/` | Landing page | No |
| Login | `/login` | User authentication | No |
| Register | `/register` | New user signup | No |
| Dashboard | `/dashboard` | Main user dashboard | Yes |
| Donate Money | `/donate/money` | Money donation form | Yes |
| Donate Food | `/donate/food` | Food donation form | Yes |
| Donate Clothing | `/donate/clothing` | Clothing donation form | Yes |
| History | `/history` | View donation history | Yes |
| Confirmation | `/confirmation` | Donation success page | Yes |
| Admin Portal | `/admin` | Admin dashboard | Yes (Admin) |

---

## ⚙️ Backend Services & Controllers

### Service Layer

#### **AuthService**
```java
public interface AuthService {
    AuthResponse register(AuthRequest request);
    AuthResponse login(AuthRequest request);
    User getCurrentUser();
    void logout();
    boolean isTokenValid(String token);
}
```

**Responsibilities:**
- User registration and validation
- Password hashing and verification
- JWT token generation and validation
- Current user context management

---

#### **DonationService**
```java
public interface DonationService {
    DonationResponse createDonation(DonationRequest request);
    List<DonationResponse> getUserDonations(Long userId);
    DonationResponse getDonationById(Long id);
    DonationResponse updateDonation(Long id, DonationRequest request);
    void deleteDonation(Long id);
    List<DonationResponse> getAllDonations(); // Admin only
    DonationResponse approveDonation(Long id); // Admin only
    DonationResponse rejectDonation(Long id, String reason); // Admin only
}
```

**Responsibilities:**
- Donation creation and validation
- Business logic for different donation types
- Status management and transitions
- Admin operations (approve/reject)
- Audit trail management

---

#### **UserService**
```java
public interface UserService {
    UserDto getUserById(Long id);
    UserDto updateUser(UserDto dto);
    List<UserDto> getAllUsers(); // Admin only
    void deleteUser(Long id); // Admin only
    void changePassword(Long userId, String newPassword);
}
```

**Responsibilities:**
- User CRUD operations
- Profile management
- Password management
- User role management

---

### Controller Layer

#### **AuthController**
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

#### **DonationController**
```
POST   /api/donations              # Create donation
GET    /api/donations              # Get user's donations
GET    /api/donations/{id}         # Get single donation
PUT    /api/donations/{id}         # Update donation
DELETE /api/donations/{id}         # Delete donation
```

#### **AdminController**
```
GET    /api/admin/donations        # Get all donations
POST   /api/admin/donations/{id}/approve
POST   /api/admin/donations/{id}/reject
GET    /api/admin/users            # Get all users
POST   /api/admin/reports          # Generate reports
```

#### **UserController**
```
GET    /api/users/me               # Current user profile
PUT    /api/users/me               # Update profile
GET    /api/users/{id}             # Get user details
POST   /api/users/change-password
```

---

## 🔐 Authentication & Security

### JWT Authentication Flow

```
1. User Registration/Login
        ↓
2. Credentials Validated in AuthService
        ↓
3. JWT Token Generated using JwtTokenProvider
        ↓
4. Token stored in Frontend LocalStorage
        ↓
5. Subsequent Requests include:
   Authorization: Bearer {JWT_TOKEN}
        ↓
6. JwtAuthenticationFilter intercepts request
        ↓
7. Token validated and extracted
        ↓
8. User context set in SecurityContext
        ↓
9. Request proceeds to Controller
```

### Security Features

- **JWT (JSON Web Tokens)**
  - Algorithm: HS256
  - Expiration: 24 hours
  - Custom secret key (configurable)

- **Password Security**
  - Bcrypt hashing (Spring Security)
  - Min 8 characters required
  - Special characters recommended

- **CORS Configuration**
  - Frontend: http://localhost:5173
  - Backend: http://localhost:8080
  - Allowed methods: GET, POST, PUT, DELETE, OPTIONS

- **HTTP-Only Cookies** (Optional)
  - Token stored in secure, HTTP-only cookie
  - XSS protection

- **Role-Based Access Control (RBAC)**
  - DONOR - Create own donations, view own data
  - ADMIN - Full donation management, user management
  - ORGANIZATION - Limited access to donation data

### Example JWT Payload
```json
{
  "sub": "1",
  "email": "john@example.com",
  "username": "johndoe",
  "role": "DONOR",
  "iat": 1712662200,
  "exp": 1712748600
}
```

---

## 👥 User Workflows

### Workflow 1: New User Registration & First Donation

```
┌─ User opens FrontEnd (localhost:5173)
│
├─ User clicks "Register" →  RegisterPage
│
├─ User fills:
│  ├─ Username
│  ├─ Email
│  ├─ Password
│  ├─ First Name
│  └─ Last Name
│
├─ POST /api/auth/register
│  └─ AuthService validates & creates user
│
├─ JWT token returned → Stored in localStorage
│
├─ User redirected to Dashboard
│
├─ User starts donation:
│  ├─ Selects donation type (FOOD/MONEY/CLOTHING)
│  ├─ Fills donation details
│  └─ Submits form
│
├─ POST /api/donations
│  └─ DonationService creates donation (Status: PENDING)
│
├─ Donation saved to database
│
├─ Success confirmation displayed
│
└─ User views donation in /history
```

---

### Workflow 2: Admin Approval Process

```
┌─ Admin logs in with ADMIN credentials
│
├─ Admin navigates to /admin
│
├─ GET /api/admin/donations →  Fetches all pending donations
│
├─ Admin reviews donation details
│
├─ Admin clicks "Approve" or "Reject"
│
├─ Backend validates admin role
│
├─ Donation status updated in database
│  └─ donation_history record created (audit trail)
│
├─ Frontend receives update
│
└─ Donation marked as APPROVED/REJECTED
```

---

### Workflow 3: Donation Tracking

```
┌─ User at Dashboard (/dashboard)
│
├─ GET /api/donations (user's donations only)
│
├─ Frontend displays DonationTable with:
│  ├─ Donation ID
│  ├─ Type (FOOD/MONEY/CLOTHING)
│  ├─ Status (PENDING/APPROVED/REJECTED)
│  ├─ Amount/Quantity
│  └─ Date Created
│
├─ User can:
│  ├─ View details → Click row
│  ├─ Edit → If PENDING
│  └─ Delete → If PENDING
│
├─ Real-time updates as admin approves
│
└─ History filtered by status (if needed)
```

---

## 🚀 Deployment & Configuration

### Development Environment Setup

#### **Backend Setup**
```bash
# Navigate to backend
cd donation-backend

# Set MySQL credentials in application.yml
spring.datasource.url=jdbc:mysql://localhost:3306/donatehub_db
spring.datasource.username=root
spring.datasource.password=Phani@200656

# Build project
mvn clean install

# Run Spring Boot app
mvn spring-boot:run
# Runs on http://localhost:8080/api
```

#### **Frontend Setup**
```bash
# Navigate to frontend
cd donation

# Install dependencies
npm install

# Run development server
npm run dev
# Runs on http://localhost:5173
```

#### **Database Setup**
```bash
# Connect to MySQL
mysql -u root -p

# Run setup script
source setup-db.sql

# Or use complete setup
source MYSQL_SETUP_COMPLETE.sql
```

---

### Application Configuration Files

#### **Backend Configuration** (`application.yml`)
```yaml
spring:
  application:
    name: DonateHub API
  datasource:
    url: jdbc:mysql://localhost:3306/donatehub_db?useSSL=false&serverTimezone=UTC
    username: root
    password: Phani@200656
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQLDialect
        format_sql: true

server:
  port: 8080
  servlet:
    context-path: /api

jwt:
  secret: your-secret-key-change-this
  expiration: 86400000

logging:
  level:
    root: INFO
    com.donatehub: DEBUG
```

#### **Frontend Configuration** (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
```

---

### Production Deployment Considerations

#### **Docker Deployment**
```dockerfile
# Backend Dockerfile
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:resolve
COPY . .
RUN mvn clean package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

#### **Environment Secrets (Production)**
- Store JWT secret in environment variables
- Use encrypted database passwords
- Enable SSL/TLS certificates
- Configure firewall rules

#### **Database Backup**
```bash
# MySQL backup
mysqldump -u root -p donatehub_db > backup.sql

# Restore
mysql -u root -p donatehub_db < backup.sql
```

#### **Scaling Considerations**
- Load balancer for multiple backend instances
- Database connection pooling (HikariCP configured)
- Caching layer (Redis for session/donation data)
- CDN for frontend static assets

---

## 📊 Performance Optimization

### Frontend
- ✅ Code splitting with React lazy loading
- ✅ Image optimization with Tailwind CSS
- ✅ Minimize bundle size with Tree shaking
- ✅ Caching with Vite's ETag

### Backend
- ✅ Database indexing on frequently queried columns
- ✅ Connection pooling (10 max pool size)
- ✅ Batch operations for large imports
- ✅ Lazy loading with JPA relationships

### Database
- ✅ Indexed foreign keys (user_id)
- ✅ Indexed enum columns (type, status)
- ✅ Datetime indexing for time-based queries
- ✅ Composite indexes for common filters

---

## 🧪 Testing Strategy

### Frontend Tests (Vitest)
```typescript
describe('DonationForm', () => {
  it('should submit donation when valid', () => {
    // Test implementation
  });
});
```

### Backend Tests (JUnit)
```java
@SpringBootTest
public class DonationServiceTest {
    @Test
    public void testCreateDonation() {
        // Test implementation
    }
}
```

---

## 📝 Summary

**DonateHub** is a complete, full-stack donation management platform with:

- ✅ **Modern Frontend:** React 18 + TypeScript + Tailwind CSS
- ✅ **Robust Backend:** Spring Boot 3.4 + Java 21 + JWT Security
- ✅ **Reliable Database:** MySQL 8.0 with proper schema design
- ✅ **API-First Design:** RESTful endpoints with clear contracts
- ✅ **Security First:** JWT authentication, role-based access control
- ✅ **Scalable Architecture:** Three-tier design, optimized for growth
- ✅ **Complete Workflows:** From user registration to donation tracking
- ✅ **Admin Features:** Donation approval/rejection workflow
- ✅ **Audit Trail:** Complete donation history tracking

The project is ready for development, testing, and eventual production deployment!

---

**Project Status:** ✅ Complete  
**Last Updated:** April 9, 2026  
**Version:** 1.0.0
