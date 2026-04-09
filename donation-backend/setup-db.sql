-- DonateHub Database Setup Script
-- Run this to initialize the database

-- Create database
CREATE DATABASE IF NOT EXISTS donatehub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE donatehub_db;

-- Verify connection
SELECT 'Database setup complete!' AS status;
SELECT @@version AS mysql_version;
SELECT DATABASE() AS current_database;
