-- ============================================
-- DonateHub Database - Admin-Friendly Schema
-- Clear, Organized, Easy to Understand
-- ============================================

DROP DATABASE IF EXISTS donatehub_db;
CREATE DATABASE donatehub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE donatehub_db;

-- ============================================
-- TABLE 1: USERS (Donor Information)
-- ============================================
CREATE TABLE users (
  -- Primary Information
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE COMMENT 'Unique username for login',
  email VARCHAR(255) NOT NULL UNIQUE COMMENT 'Email address',
  password VARCHAR(255) NOT NULL COMMENT 'Encrypted password',
  
  -- Personal Information
  first_name VARCHAR(100) NOT NULL COMMENT 'First name',
  last_name VARCHAR(100) NOT NULL COMMENT 'Last name',
  
  -- Account Status
  role ENUM('DONOR', 'ADMIN', 'ORGANIZATION') NOT NULL DEFAULT 'DONOR' COMMENT 'User role: DONOR, ADMIN, ORGANIZATION',
  active BOOLEAN NOT NULL DEFAULT TRUE COMMENT 'Account active status',
  
  -- Audit Fields
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Account creation date',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update date',
  
  -- Indexes for fast queries
  INDEX idx_email (email),
  INDEX idx_username (username),
  INDEX idx_role (role),
  INDEX idx_active (active),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='User accounts and authentication information';

-- ============================================
-- TABLE 2: DONATIONS (All Donation Records)
-- ============================================
CREATE TABLE donations (
  -- Primary Information
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL COMMENT 'Donor ID (references users table)',
  donation_reference VARCHAR(50) UNIQUE COMMENT 'Reference number for tracking (e.g., DN-2024-001)',
  
  -- Donation Type & Status
  type ENUM('FOOD', 'CLOTHING', 'MONEY', 'APPAREL') NOT NULL COMMENT 'Type of donation',
  status ENUM('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED') NOT NULL DEFAULT 'PENDING' COMMENT 'Current status',
  
  -- Description
  description LONGTEXT COMMENT 'Detailed description of donation',
  
  -- ===== FOOD DONATION FIELDS =====
  rice_quantity INT COMMENT 'Rice quantity in KG',
  vegetable_quantity INT COMMENT 'Vegetables quantity in KG',
  
  -- ===== CLOTHING DONATION FIELDS =====
  target_age_group VARCHAR(50) COMMENT 'Target age group: INFANT, CHILD, TEENAGER, ADULT, ELDERLY',
  clothing_quantity INT COMMENT 'Number of clothing items',
  clothing_condition VARCHAR(50) COMMENT 'Condition: NEW, LIKE_NEW, GOOD, FAIR',
  
  -- ===== MONEY DONATION FIELDS =====
  amount DECIMAL(12, 2) COMMENT 'Donation amount',
  currency VARCHAR(10) DEFAULT 'USD' COMMENT 'Currency type',
  transaction_id VARCHAR(100) UNIQUE COMMENT 'Payment transaction ID',
  payment_method VARCHAR(50) COMMENT 'Payment method: CREDIT_CARD, DEBIT_CARD, BANK_TRANSFER, CASH',
  
  -- Approval Information
  approved_by_admin_id BIGINT COMMENT 'Admin who approved (references users table)',
  rejection_reason TEXT COMMENT 'Reason if rejected',
  
  -- Timestamps
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'When donation was recorded',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update',
  approved_at DATETIME COMMENT 'When approved by admin',
  completed_at DATETIME COMMENT 'When donation was completed',
  
  -- Indexes for Admin Queries
  KEY idx_user_id (user_id),
  KEY idx_type (type),
  KEY idx_status (status),
  KEY idx_created_at (created_at),
  KEY idx_approved_at (approved_at),
  KEY idx_donation_ref (donation_reference),
  KEY idx_user_status (user_id, status),
  KEY idx_type_status (type, status),
  
  -- Foreign Key Constraint
  CONSTRAINT fk_donations_user_id 
    FOREIGN KEY (user_id) 
    REFERENCES users(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
    
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='All donation records - main tracking table';

-- ============================================
-- TABLE 3: DONATION_HISTORY (Audit Trail)
-- ============================================
CREATE TABLE donation_history (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  donation_id BIGINT NOT NULL COMMENT 'Link to donation',
  changed_by_admin_id BIGINT NOT NULL COMMENT 'Admin who made the change',
  old_status VARCHAR(20) COMMENT 'Previous status',
  new_status VARCHAR(20) COMMENT 'New status',
  change_description TEXT COMMENT 'What changed',
  changed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'When change happened',
  
  KEY idx_donation_id (donation_id),
  KEY idx_changed_at (changed_at),
  
  CONSTRAINT fk_history_donation_id 
    FOREIGN KEY (donation_id) 
    REFERENCES donations(id) 
    ON DELETE CASCADE
    
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Track all changes to donations for audit purposes';

-- ============================================
-- ADMIN VIEWS (For Easy Reporting)
-- ============================================

-- VIEW 1: Pending Donations Summary (For Admin Dashboard)
CREATE VIEW v_pending_donations AS
SELECT 
  d.id,
  d.donation_reference AS 'Reference #',
  u.first_name AS 'Donor First Name',
  u.last_name AS 'Donor Last Name',
  u.email AS 'Donor Email',
  d.type AS 'Donation Type',
  CASE 
    WHEN d.type = 'FOOD' THEN CONCAT(d.rice_quantity, ' kg rice + ', d.vegetable_quantity, ' kg vegetables')
    WHEN d.type = 'CLOTHING' THEN CONCAT(d.clothing_quantity, ' items for ', d.target_age_group)
    WHEN d.type = 'MONEY' THEN CONCAT(d.amount, ' ', d.currency)
    ELSE d.description
  END AS 'Donation Details',
  d.created_at AS 'Date Submitted',
  d.status AS 'Status'
FROM donations d
JOIN users u ON d.user_id = u.id
WHERE d.status = 'PENDING'
ORDER BY d.created_at DESC;

-- VIEW 2: Donation Statistics (For Admin Reports)
CREATE VIEW v_donation_statistics AS
SELECT 
  d.type AS 'Type',
  COUNT(*) AS 'Total Count',
  SUM(CASE WHEN d.status = 'PENDING' THEN 1 ELSE 0 END) AS 'Pending',
  SUM(CASE WHEN d.status = 'APPROVED' THEN 1 ELSE 0 END) AS 'Approved',
  SUM(CASE WHEN d.status = 'REJECTED' THEN 1 ELSE 0 END) AS 'Rejected',
  SUM(CASE WHEN d.status = 'COMPLETED' THEN 1 ELSE 0 END) AS 'Completed'
FROM donations d
GROUP BY d.type;

-- VIEW 3: User Activity (For Admin Monitoring)
CREATE VIEW v_user_activity AS
SELECT 
  u.id AS 'User ID',
  u.username AS 'Username',
  u.email AS 'Email',
  u.first_name AS 'First Name',
  u.last_name AS 'Last Name',
  u.role AS 'Role',
  COUNT(d.id) AS 'Total Donations',
  MAX(d.created_at) AS 'Last Donation Date',
  u.active AS 'Active'
FROM users u
LEFT JOIN donations d ON u.id = d.user_id
WHERE u.role = 'DONOR'
GROUP BY u.id
ORDER BY COUNT(d.id) DESC;

-- ============================================
-- SAMPLE DATA (For Testing)
-- ============================================

-- Insert Sample Users
INSERT INTO users (username, email, password, first_name, last_name, role, active)
VALUES 
  ('admin_user', 'admin@donatehub.com', 'hashed_password_admin', 'Admin', 'User', 'ADMIN', TRUE),
  ('john_donor', 'john@example.com', 'hashed_password_john', 'John', 'Doe', 'DONOR', TRUE),
  ('jane_donor', 'jane@example.com', 'hashed_password_jane', 'Jane', 'Smith', 'DONOR', TRUE),
  ('org_ngo', 'ngo@example.com', 'hashed_password_org', 'NGO', 'Organization', 'ORGANIZATION', TRUE);

-- Insert Sample Food Donations
INSERT INTO donations (user_id, type, status, rice_quantity, vegetable_quantity, description, donation_reference)
VALUES 
  (2, 'FOOD', 'PENDING', 50, 25, 'Basmati rice and fresh vegetables', 'DN-2024-001'),
  (3, 'FOOD', 'APPROVED', 30, 15, 'Organic vegetables from farm', 'DN-2024-002'),
  (2, 'FOOD', 'COMPLETED', 100, 50, 'Rice donation for community', 'DN-2024-003');

-- Insert Sample Clothing Donations
INSERT INTO donations (user_id, type, status, target_age_group, clothing_quantity, clothing_condition, description, donation_reference)
VALUES 
  (2, 'CLOTHING', 'PENDING', 'CHILD', 20, 'NEW', 'Children clothing - new condition', 'DN-2024-004'),
  (3, 'CLOTHING', 'APPROVED', 'TEENAGER', 15, 'GOOD', 'Teenage clothing - good condition', 'DN-2024-005');

-- Insert Sample Money Donations
INSERT INTO donations (user_id, type, status, amount, currency, transaction_id, payment_method, description, donation_reference)
VALUES 
  (2, 'MONEY', 'COMPLETED', 500.00, 'USD', 'TXN-2024-001', 'CREDIT_CARD', 'Monthly donation', 'DN-2024-006'),
  (3, 'MONEY', 'PENDING', 1000.00, 'USD', 'TXN-2024-002', 'BANK_TRANSFER', 'Large donation', 'DN-2024-007');

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
SELECT '✅ DATABASE SETUP COMPLETE!' AS message;

-- Show all tables
SHOW TABLES;

-- Show data
SELECT '--- USERS DATA ---';
SELECT id, username, email, first_name, last_name, role, active FROM users;

SELECT '--- PENDING DONATIONS ---';
SELECT * FROM v_pending_donations;

SELECT '--- DONATION STATISTICS ---';
SELECT * FROM v_donation_statistics;

SELECT '--- USER ACTIVITY ---';
SELECT * FROM v_user_activity;

-- ============================================
-- USEFUL ADMIN QUERIES (Copy & Paste)
-- ============================================

/*
-- Query 1: All Pending Donations
SELECT * FROM v_pending_donations;

-- Query 2: Total Money Donated
SELECT SUM(amount) as 'Total Money Donated' FROM donations WHERE type = 'MONEY' AND status = 'COMPLETED';

-- Query 3: Top Donors
SELECT 
  u.first_name, 
  u.last_name, 
  COUNT(d.id) as 'Donation Count'
FROM donations d
JOIN users u ON d.user_id = u.id
GROUP BY d.user_id
ORDER BY COUNT(d.id) DESC
LIMIT 10;

-- Query 4: Recent Donations (Last 7 days)
SELECT * FROM donations
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
ORDER BY created_at DESC;

-- Query 5: Food Donation Summary
SELECT 
  d.id,
  u.first_name,
  u.last_name,
  d.rice_quantity,
  d.vegetable_quantity,
  (d.rice_quantity + d.vegetable_quantity) as 'Total KG',
  d.status,
  d.created_at
FROM donations d
JOIN users u ON d.user_id = u.id
WHERE d.type = 'FOOD'
ORDER BY d.created_at DESC;
*/
