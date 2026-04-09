-- ============================================
-- DonateHub Database Setup - Step by Step
-- MySQL 8.0+
-- Run in MySQL Workbench
-- ============================================

-- Step 1: Drop existing database (if needed)
DROP DATABASE IF EXISTS donatehub_db;

-- Step 2: Create fresh database
CREATE DATABASE donatehub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Step 3: Use the database
USE donatehub_db;

-- ============================================
-- Step 4: Create USERS Table First
-- ============================================
CREATE TABLE users (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(20) NOT NULL,
  active BOOLEAN NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME,
  KEY idx_email (email),
  KEY idx_username (username)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Step 5: Create DONATIONS Table
-- (Only after users table exists)
-- ============================================
CREATE TABLE donations (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  type VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL,
  description LONGTEXT,
  rice_quantity INT,
  vegetable_quantity INT,
  target_age_group VARCHAR(255),
  clothing_quantity INT,
  amount DECIMAL(19,2),
  transaction_id VARCHAR(255),
  created_at DATETIME NOT NULL,
  updated_at DATETIME,
  approved_at DATETIME,
  KEY idx_user_id (user_id),
  KEY idx_type (type),
  KEY idx_status (status),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Step 6: Verify Tables Created
-- ============================================
SHOW TABLES;
DESCRIBE users;
DESCRIBE donations;

-- ============================================
-- Step 7: Insert Sample Data
-- ============================================
INSERT INTO users (email, password, first_name, last_name, username, role, active, created_at) 
VALUES 
  ('donor@test.com', 'password123', 'Test', 'User', 'testuser', 'DONOR', 1, NOW()),
  ('admin@test.com', 'admin123', 'Admin', 'User', 'admin', 'ADMIN', 1, NOW());

INSERT INTO donations (user_id, type, status, rice_quantity, created_at) 
VALUES 
  (1, 'FOOD', 'PENDING', 50, NOW());

-- ============================================
-- Step 8: Verify Data
-- ============================================
SELECT * FROM users;
SELECT * FROM donations;

-- ============================================
-- Done! ✅
-- ============================================
SELECT 'SUCCESS! Database is ready!' AS message;
