-- ============================================
-- DonateHub Database Complete Setup Script
-- MySQL 8.0+
-- ============================================

-- 1. Create Database
-- ============================================
DROP DATABASE IF EXISTS donatehub_db;

CREATE DATABASE donatehub_db 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

-- 2. Use the Database
-- ============================================
USE donatehub_db;

-- 3. Create Users Table
-- ============================================
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Create Donations Table
-- ============================================
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
  
  -- Foreign Key Constraint
  CONSTRAINT fk_donations_user_id 
    FOREIGN KEY (user_id) 
    REFERENCES users(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  
  -- Indexes
  INDEX idx_user_id (user_id),
  INDEX idx_type (type),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at),
  INDEX idx_user_status (user_id, status)
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 5. Sample Data (Optional - Remove if not needed)
-- ============================================

-- Insert sample users (passwords would be hashed by Spring in real scenario)
INSERT INTO users (email, password, first_name, last_name, username, role, active)
VALUES 
  ('donor1@example.com', '$2a$10$slYQmyNdGzin7olVN3YO2OPST9/PgBkqquzi.Oy5NNAEM5rb72.Tu', 'John', 'Doe', 'johndoe', 'DONOR', TRUE),
  ('donor2@example.com', '$2a$10$slYQmyNdGzin7olVN3YO2OPST9/PgBkqquzi.Oy5NNAEM5rb72.Tu', 'Jane', 'Smith', 'janesmith', 'DONOR', TRUE),
  ('admin@example.com', '$2a$10$slYQmyNdGzin7olVN3YO2OPST9/PgBkqquzi.Oy5NNAEM5rb72.Tu', 'Admin', 'User', 'admin', 'ADMIN', TRUE);

-- Insert sample donations
INSERT INTO donations (user_id, type, status, description, rice_quantity, vegetable_quantity)
VALUES 
  (1, 'FOOD', 'PENDING', 'Basmati Rice and Fresh Vegetables', 50, 25),
  (2, 'FOOD', 'APPROVED', 'Organic Vegetables Package', NULL, 30),
  (1, 'MONEY', 'COMPLETED', 'Monthly contribution', NULL, NULL),
  (2, 'CLOTHING', 'PENDING', 'Children clothing', NULL, NULL);

-- ============================================
-- 6. Verify Setup  
-- ============================================
SELECT '✅ Database Setup Complete!' AS status;
SELECT @@version AS mysql_version;
SELECT DATABASE() AS current_database;

-- Show tables
SHOW TABLES;

-- Show table structures
DESCRIBE users;
DESCRIBE donations;

-- Show sample data
SELECT * FROM users;
SELECT * FROM donations;
