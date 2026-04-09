-- MySQL Setup Code for DonateHub
-- Username: root
-- Password: welcome

-- Step 1: Create Database
DROP DATABASE IF EXISTS donatehub_db;
CREATE DATABASE donatehub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE donatehub_db;

-- Step 2: Create USERS Table
CREATE TABLE users (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role ENUM('DONOR', 'ADMIN', 'ORGANIZATION') NOT NULL DEFAULT 'DONOR',
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_username (username),
  INDEX idx_role (role),
  INDEX idx_active (active)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

-- Step 3: Create DONATIONS Table
CREATE TABLE donations (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  donation_reference VARCHAR(50) UNIQUE,
  type ENUM('FOOD', 'CLOTHING', 'MONEY', 'APPAREL') NOT NULL,
  status ENUM('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
  description LONGTEXT,
  
  rice_quantity INT,
  vegetable_quantity INT,
  
  target_age_group VARCHAR(50),
  clothing_quantity INT,
  clothing_condition VARCHAR(50),
  
  amount DECIMAL(12, 2),
  currency VARCHAR(10) DEFAULT 'USD',
  transaction_id VARCHAR(100) UNIQUE,
  payment_method VARCHAR(50),
  
  approved_by_admin_id BIGINT,
  rejection_reason TEXT,
  
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  approved_at DATETIME,
  completed_at DATETIME,
  
  KEY idx_user_id (user_id),
  KEY idx_type (type),
  KEY idx_status (status),
  KEY idx_created_at (created_at),
  
  CONSTRAINT fk_donations_user_id 
    FOREIGN KEY (user_id) 
    REFERENCES users(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
    
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

-- Step 4: Create DONATION_HISTORY Table
CREATE TABLE donation_history (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  donation_id BIGINT NOT NULL,
  changed_by_admin_id BIGINT NOT NULL,
  old_status VARCHAR(20),
  new_status VARCHAR(20),
  change_description TEXT,
  changed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  KEY idx_donation_id (donation_id),
  
  CONSTRAINT fk_history_donation_id 
    FOREIGN KEY (donation_id) 
    REFERENCES donations(id) 
    ON DELETE CASCADE
    
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

-- Step 5: Insert Sample Users
INSERT INTO users (username, email, password, first_name, last_name, role) 
VALUES 
  ('admin', 'admin@donatehub.com', 'admin123', 'Admin', 'User', 'ADMIN'),
  ('john', 'john@example.com', 'john123', 'John', 'Doe', 'DONOR'),
  ('jane', 'jane@example.com', 'jane123', 'Jane', 'Smith', 'DONOR');

-- Step 6: Insert Sample Donations
INSERT INTO donations (user_id, type, status, rice_quantity, vegetable_quantity, donation_reference, description) 
VALUES 
  (2, 'FOOD', 'PENDING', 50, 25, 'DN-001', 'Rice and vegetables donation'),
  (3, 'FOOD', 'APPROVED', 30, 15, 'DN-002', 'Organic vegetables'),
  (2, 'CLOTHING', 'PENDING', NULL, NULL, 'DN-003', 'Children clothing');

UPDATE donations SET clothing_quantity = 20, target_age_group = 'CHILD' WHERE donation_reference = 'DN-003';

INSERT INTO donations (user_id, type, status, amount, currency, transaction_id, donation_reference) 
VALUES 
  (3, 'MONEY', 'COMPLETED', 500, 'USD', 'TXN-001', 'DN-004');

-- Step 7: Verify
SELECT '✅ DATABASE SETUP COMPLETE!' AS message;

SHOW TABLES;

SELECT '--- USERS ---' AS '';
SELECT * FROM users;

SELECT '--- DONATIONS ---' AS '';
SELECT id, user_id, donation_reference, type, status FROM donations;

SELECT '--- STATISTICS ---' AS '';
SELECT type, COUNT(*) as total FROM donations GROUP BY type;
