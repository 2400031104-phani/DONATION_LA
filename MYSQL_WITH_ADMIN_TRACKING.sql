-- ============================================
-- DonateHub Database Setup with Admin Tracking
-- Username: root | Password: welcome
-- ============================================

DROP DATABASE IF EXISTS donatehub_db;
CREATE DATABASE donatehub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE donatehub_db;

-- ============================================
-- TABLE 1: USERS (All Users - Admin and Donors)
-- ============================================
CREATE TABLE users (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE COMMENT 'Unique login username',
  email VARCHAR(255) NOT NULL UNIQUE COMMENT 'Email address',
  password VARCHAR(255) NOT NULL COMMENT 'Encrypted password',
  first_name VARCHAR(100) NOT NULL COMMENT 'First name',
  last_name VARCHAR(100) NOT NULL COMMENT 'Last name',
  role ENUM('DONOR', 'ADMIN', 'ORGANIZATION') NOT NULL DEFAULT 'DONOR' COMMENT 'User role type',
  active BOOLEAN NOT NULL DEFAULT TRUE COMMENT 'Account status',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Account creation date',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update date',
  
  INDEX idx_email (email),
  INDEX idx_username (username),
  INDEX idx_role (role)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE 2: DONATIONS (All Donation Records)
-- ============================================
CREATE TABLE donations (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL COMMENT 'Donor ID (references users table)',
  donation_reference VARCHAR(50) UNIQUE COMMENT 'Reference number',
  type ENUM('FOOD', 'CLOTHING', 'MONEY', 'APPAREL') NOT NULL COMMENT 'Donation type',
  status ENUM('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED') NOT NULL DEFAULT 'PENDING' COMMENT 'Current status',
  description LONGTEXT COMMENT 'Donation description',
  
  -- Food Fields
  rice_quantity INT COMMENT 'Rice in KG',
  vegetable_quantity INT COMMENT 'Vegetables in KG',
  
  -- Clothing Fields
  target_age_group VARCHAR(50) COMMENT 'Target age group',
  clothing_quantity INT COMMENT 'Number of items',
  clothing_condition VARCHAR(50) COMMENT 'Condition (NEW, GOOD, FAIR)',
  
  -- Money Fields
  amount DECIMAL(12, 2) COMMENT 'Donation amount',
  currency VARCHAR(10) DEFAULT 'USD' COMMENT 'Currency type',
  transaction_id VARCHAR(100) UNIQUE COMMENT 'Payment transaction ID',
  payment_method VARCHAR(50) COMMENT 'Payment method',
  
  -- Admin Review Fields
  approved_by_admin_id BIGINT COMMENT 'Admin ID who approved (references users.id)',
  admin_name VARCHAR(255) COMMENT 'Name of admin who approved',
  rejection_reason TEXT COMMENT 'Reason if rejected',
  
  -- Timestamps
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'When donation was logged',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update',
  approved_at DATETIME COMMENT 'When admin approved',
  completed_at DATETIME COMMENT 'When donation completed',
  
  KEY idx_user_id (user_id),
  KEY idx_type (type),
  KEY idx_status (status),
  KEY idx_admin_id (approved_by_admin_id),
  
  CONSTRAINT fk_donations_user_id 
    FOREIGN KEY (user_id) 
    REFERENCES users(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
    
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE 3: ADMIN_ACTIONS (Track all admin activities)
-- ============================================
CREATE TABLE admin_actions (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  admin_id BIGINT NOT NULL COMMENT 'Admin who performed action',
  admin_name VARCHAR(255) NOT NULL COMMENT 'Admin full name',
  admin_email VARCHAR(255) NOT NULL COMMENT 'Admin email',
  action_type VARCHAR(50) NOT NULL COMMENT 'Type: APPROVE, REJECT, UPDATE, DELETE, CREATE',
  donation_id BIGINT COMMENT 'Related donation ID',
  donation_reference VARCHAR(50) COMMENT 'Donation reference number',
  old_status VARCHAR(20) COMMENT 'Previous status',
  new_status VARCHAR(20) COMMENT 'New status',
  notes TEXT COMMENT 'Admin notes/comments',
  action_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'When action occurred',
  
  KEY idx_admin_id (admin_id),
  KEY idx_admin_name (admin_name),
  KEY idx_action_date (action_date),
  
  CONSTRAINT fk_admin_actions_admin_id 
    FOREIGN KEY (admin_id) 
    REFERENCES users(id)
    
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Complete audit trail of all admin actions';

-- ============================================
-- TABLE 4: DONATION_HISTORY (Version history)
-- ============================================
CREATE TABLE donation_history (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  donation_id BIGINT NOT NULL COMMENT 'Related donation',
  changed_by_admin_id BIGINT NOT NULL COMMENT 'Admin who made change',
  admin_name VARCHAR(255) NOT NULL COMMENT 'Admin full name',
  old_status VARCHAR(20) COMMENT 'Previous status',
  new_status VARCHAR(20) COMMENT 'New status',
  change_description TEXT COMMENT 'What changed',
  changed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'When change happened',
  
  KEY idx_donation_id (donation_id),
  KEY idx_admin_id (changed_by_admin_id),
  KEY idx_admin_name (admin_name),
  KEY idx_changed_at (changed_at),
  
  CONSTRAINT fk_history_donation_id 
    FOREIGN KEY (donation_id) 
    REFERENCES donations(id) 
    ON DELETE CASCADE
    
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Track all donation status changes and admin modifications';

-- ============================================
-- ADMIN VIEWS FOR REPORTING
-- ============================================

-- View 1: Pending Donations with Admin Info
CREATE VIEW v_pending_donations_with_admin AS
SELECT 
  d.id,
  d.donation_reference,
  CONCAT(u.first_name, ' ', u.last_name) AS 'Donor Name',
  u.email AS 'Donor Email',
  d.type,
  d.status,
  d.created_at,
  d.approved_by_admin_id,
  d.admin_name AS 'Approved By Admin',
  d.approved_at
FROM donations d
JOIN users u ON d.user_id = u.id
ORDER BY d.created_at DESC;

-- View 2: Admin Activity Summary
CREATE VIEW v_admin_activity_summary AS
SELECT 
  u.id,
  CONCAT(u.first_name, ' ', u.last_name) AS 'Admin Name',
  u.email AS 'Admin Email',
  u.role,
  COUNT(CASE WHEN d.approved_by_admin_id = u.id THEN 1 END) AS 'Donations Approved',
  COUNT(CASE WHEN aa.admin_id = u.id THEN 1 END) AS 'Total Actions',
  MAX(CASE WHEN d.approved_at IS NOT NULL THEN d.approved_at END) AS 'Last Action Date'
FROM users u
LEFT JOIN donations d ON u.id = d.approved_by_admin_id
LEFT JOIN admin_actions aa ON u.id = aa.admin_id
WHERE u.role = 'ADMIN'
GROUP BY u.id, u.first_name, u.last_name, u.email, u.role;

-- View 3: Complete Admin Audit Trail
CREATE VIEW v_admin_audit_trail AS
SELECT 
  aa.id,
  aa.admin_name,
  aa.admin_email,
  aa.action_type,
  aa.donation_reference,
  aa.old_status,
  aa.new_status,
  aa.notes,
  aa.action_date
FROM admin_actions aa
ORDER BY aa.action_date DESC;

-- ============================================
-- INSERT SAMPLE DATA
-- ============================================

-- Insert Users (1 Admin + 3 Donors)
INSERT INTO users (username, email, password, first_name, last_name, role) 
VALUES 
  ('admin_pavan', 'admin@donatehub.com', 'admin123', 'Pavan', 'Kumar', 'ADMIN'),
  ('john_donor', 'john@example.com', 'john123', 'John', 'Doe', 'DONOR'),
  ('jane_donor', 'jane@example.com', 'jane123', 'Jane', 'Smith', 'DONOR'),
  ('org_ngo', 'ngo@example.com', 'org123', 'NGO', 'Organization', 'ORGANIZATION');

-- Insert Donations
INSERT INTO donations (user_id, type, status, rice_quantity, vegetable_quantity, donation_reference, description, approved_by_admin_id, admin_name, approved_at) 
VALUES 
  (2, 'FOOD', 'APPROVED', 50, 25, 'DN-2024-001', 'Basmati rice and vegetables', 1, 'Pavan Kumar', NOW()),
  (3, 'FOOD', 'PENDING', 30, 15, 'DN-2024-002', 'Organic vegetables', NULL, NULL, NULL),
  (2, 'CLOTHING', 'PENDING', NULL, NULL, 'DN-2024-003', 'Children clothing', NULL, NULL, NULL),
  (3, 'MONEY', 'COMPLETED', NULL, NULL, 'DN-2024-004', 'Monthly donation', 1, 'Pavan Kumar', NOW());

-- Update with clothing and money details
UPDATE donations SET clothing_quantity = 20, target_age_group = 'CHILD', clothing_condition = 'NEW' 
WHERE donation_reference = 'DN-2024-003';

UPDATE donations SET amount = 500, currency = 'USD', transaction_id = 'TXN-2024-001', payment_method = 'CREDIT_CARD' 
WHERE donation_reference = 'DN-2024-004';

-- Insert Admin Actions
INSERT INTO admin_actions (admin_id, admin_name, admin_email, action_type, donation_id, donation_reference, old_status, new_status, notes, action_date)
VALUES 
  (1, 'Pavan Kumar', 'admin@donatehub.com', 'APPROVE', 1, 'DN-2024-001', 'PENDING', 'APPROVED', 'Good quality donation', NOW()),
  (1, 'Pavan Kumar', 'admin@donatehub.com', 'APPROVE', 4, 'DN-2024-004', 'PENDING', 'COMPLETED', 'Payment verified', NOW());

-- Insert Donation History
INSERT INTO donation_history (donation_id, changed_by_admin_id, admin_name, old_status, new_status, change_description, changed_at)
VALUES 
  (1, 1, 'Pavan Kumar', 'PENDING', 'APPROVED', 'Approved by admin after verification', NOW()),
  (4, 1, 'Pavan Kumar', 'PENDING', 'COMPLETED', 'Payment verified and completed', NOW());

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
SELECT '✅ DATABASE WITH ADMIN TRACKING SETUP COMPLETE!' AS message;

SELECT '--- ADMIN USERS ---' AS section;
SELECT id, username, email, first_name, last_name, role FROM users WHERE role = 'ADMIN';

SELECT '--- ALL USERS ---' AS section;
SELECT id, username, email, first_name, last_name, role FROM users;

SELECT '--- DONATIONS WITH ADMIN INFO ---' AS section;
SELECT * FROM v_pending_donations_with_admin;

SELECT '--- ADMIN ACTIVITY SUMMARY ---' AS section;
SELECT * FROM v_admin_activity_summary;

SELECT '--- ADMIN AUDIT TRAIL ---' AS section;
SELECT * FROM v_admin_audit_trail;

SELECT '--- BASIC STATISTICS ---' AS section;
SELECT 
  (SELECT COUNT(*) FROM users WHERE role='ADMIN') AS 'Total Admins',
  (SELECT COUNT(*) FROM users WHERE role='DONOR') AS 'Total Donors',
  (SELECT COUNT(*) FROM donations) AS 'Total Donations',
  (SELECT COUNT(*) FROM admin_actions) AS 'Total Admin Actions';
