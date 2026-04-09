# 🗄️ Data Storage Guide - DonateHub Application

## Overview
Your application uses **MySQL 8.0** database to store all data. The backend uses **Spring Data JPA** with **Hibernate** ORM for database operations.

---

## 📊 Database Configuration

### Connection Details
- **Database Name:** `donatehub_db`
- **Host:** `localhost` (default)
- **Port:** `3306` (default MySQL port)
- **Username:** `root`
- **Password:** `password`
- **Driver:** MySQL Connector/J (JDBC)

### Location
- File: `src/main/resources/application.yml`
- ORM: Hibernate with MySQL 8 Dialect

---

## 🎯 Data Model (Entity Relationship)

### 1️⃣ **USERS Table**
Stores user account information

```
Table: users
├── id (Long, Primary Key, Auto-increment)
├── email (String, Unique, NOT NULL)
├── password (String, NOT NULL)
├── firstName (String, NOT NULL)
├── lastName (String, NOT NULL)
├── username (String, NOT NULL, Unique)
├── role (Enum: DONOR, ADMIN, ORGANIZATION)
├── active (Boolean, Default: TRUE)
├── createdAt (DateTime, Auto-set on create)
├── updatedAt (DateTime, Auto-update)
└── Indexes: email, username
```

**Relationships:**
- One User can have Many Donations (1:N)

**Enum Values:**
- `DONOR` - Regular user giving donations
- `ADMIN` - Administrator account
- `ORGANIZATION` - Organization account

---

### 2️⃣ **DONATIONS Table**
Stores all donation records

```
Table: donations
├── id (Long, Primary Key, Auto-increment)
├── user_id (Long, Foreign Key → users.id)
├── type (Enum: FOOD, CLOTHING, MONEY, APPAREL)
├── status (Enum: PENDING, APPROVED, REJECTED, COMPLETED)
├── description (Text, Optional)
│
├── FOOD DONATION FIELDS:
│   ├── rice_quantity (Integer) - kg
│   └── vegetable_quantity (Integer) - kg
│
├── CLOTHING DONATION FIELDS:
│   ├── target_age_group (String) - age group
│   └── clothing_quantity (Integer) - number of items
│
├── MONEY DONATION FIELDS:
│   ├── amount (BigDecimal) - currency amount
│   └── transaction_id (String) - transaction reference
│
├── createdAt (DateTime, Auto-set)
├── updatedAt (DateTime, Auto-update)
├── approvedAt (DateTime, Set when approved)
└── Index: user_id
```

**Donation Types:**
- `FOOD` - Food items (rice, vegetables, etc.)
- `CLOTHING` - Clothing items for specific age groups
- `MONEY` - Monetary donations
- `APPAREL` - Apparel/clothing items

**Donation Status Flow:**
```
PENDING → APPROVED → COMPLETED
      ↓
    REJECTED
```

---

## 🔑 Key Features

### Auto-Generated Values
- **IDs:** Automatically increment starting from 1
- **Created At:** Auto-set when record is created
- **Updated At:** Auto-updated on any change
- **Status:** Default to `PENDING` when created
- **Active:** Users default to active (`true`)

### Data Constraints
- Email must be unique per user
- Username must be unique per user
- User ID is required for every donation
- Donation type is required
- All text fields support UTF-8 characters

### Relationships
```
USER (1) ──── (Many) DONATION
   ↓
   └── Can make multiple donations
```

---

## 💾 Database Management

### Automatic Schema Creation
- **DDL Auto:** `update` (Hibernate auto-creates/updates tables)
- Tables are automatically created on first startup
- **No manual SQL scripts needed** - Hibernate handles migrations

### Logging
- **SQL Logging:** Disabled in production
- **Log Level:** DEBUG for `com.donatehub` package
- You can enable SQL in `application.yml` with `show-sql: true`

---

## 🚀 Setup Instructions

### Step 1: Install MySQL
```bash
# Windows - using chocolatey
choco install mysql

# Or download from: https://dev.mysql.com/downloads/mysql/
```

### Step 2: Start MySQL Server
```bash
# Windows
net start MySQL80

# Or use MySQL Workbench GUI
```

### Step 3: Create Database (Optional - Auto-created)
```sql
-- Manual creation (if needed)
CREATE DATABASE donatehub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'root'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON donatehub_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### Step 4: Start Backend
```bash
cd donation-backend
mvn spring-boot:run
```

**Hibernate will automatically:**
- Create all tables
- Create indexes
- Set up relationships
- Initialize the schema

---

## 📝 SQL View (What Gets Created)

```sql
-- These tables are created automatically by Hibernate

CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(10) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    INDEX idx_email (email),
    INDEX idx_username (username)
);

CREATE TABLE donations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    type VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    description TEXT,
    rice_quantity INT,
    vegetable_quantity INT,
    target_age_group VARCHAR(255),
    clothing_quantity INT,
    amount DECIMAL(19,2),
    transaction_id VARCHAR(255),
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    approved_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_id (user_id)
);
```

---

## 🔐 Data Access

### API Endpoints
All data is accessed through REST APIs:

```
POST   /api/auth/login        - User login
POST   /api/auth/register     - Create new user
POST   /api/donations         - Create donation
GET    /api/donations         - Get user's donations
GET    /api/donations/{id}    - Get specific donation
PUT    /api/donations/{id}    - Update donation
DELETE /api/donations/{id}    - Delete donation
```

### Authentication
- JWT tokens are generated on login
- Token expires in 24 hours
- Frontend stores token in localStorage
- Every request includes `Authorization: Bearer {token}`

---

## 📊 Data Flow

```
1. User Registration
   └─ POST /api/auth/register
      └─ Creates User in DB
      └─ Returns JWT token & user info

2. User Login
   └─ POST /api/auth/login
      └─ Validates credentials
      └─ Returns JWT token

3. Make Donation
   └─ POST /api/donations
      └─ Creates Donation record
      └─ Links to User via user_id
      └─ Sets status to PENDING

4. View Donations
   └─ GET /api/donations
      └─ Returns all donations for logged-in user

5. Admin Approval
   └─ PUT /api/donations/{id}
      └─ Updates status to APPROVED
      └─ Sets approvedAt timestamp
```

---

## ⚙️ Storage Specifications

| Property | Value |
|----------|-------|
| **Database** | MySQL 8.0+ |
| **ORM** | Spring Data JPA + Hibernate |
| **Storage Type** | Relational Database |
| **Character Set** | utf8mb4 (full Unicode support) |
| **Auto-Schema** | Yes (Hibernate DDL) |
| **Transactions** | ACID compliant |
| **Backup** | MySQL native backup tools |

---

## 🛡️ Data Safety

✅ **Currently Implemented:**
- Passwords are encrypted with BCrypt
- JPA handles SQL injection prevention
- Foreign keys enforce referential integrity
- Unique constraints on email & username
- Timestamps track changes

---

## 📈 Future Enhancements

You can add:
1. **Audit Logging** - Track who changed what
2. **Soft Deletes** - Mark records as deleted without removing them
3. **Database Indexes** - Optimize query performance
4. **Backups** - Automated MySQL backups
5. **Replication** - Multi-server setup
6. **Caching** - Redis for frequently accessed data

---

## 🆘 Troubleshooting

### Connection Error?
```
Error: Connection refused (localhost:3306)
Solution: Make sure MySQL is running
```

### Password Error?
```
Error: Access denied for user 'root'@'localhost'
Solution: Update password in application.yml
```

### Table not created?
```
Error: Table not found
Solution: Check application.yml has ddl-auto: update
Restart the application - Hibernate will create tables
```

---

**Your data is safe, secure, and automatically managed!** ✅
