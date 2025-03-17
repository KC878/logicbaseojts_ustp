-- Start transaction for safety
BEGIN;

-- Drop tables if they exist
DROP TABLE IF EXISTS short_over_pos CASCADE;
DROP TABLE IF EXISTS pos_summary CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS payment_methods CASCADE;
DROP TABLE IF EXISTS cashiers CASCADE;

-- Create Cashiers Table
CREATE TABLE cashiers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    shift VARCHAR(10) CHECK (shift IN ('AM', 'MID', 'PM')) NOT NULL
);

-- Create Payment Methods Table
CREATE TABLE payment_methods (
    id SERIAL PRIMARY KEY,
    payment_type VARCHAR(50) UNIQUE NOT NULL
);

-- Create Transactions Table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    cashier_id INT REFERENCES cashiers(id) ON DELETE CASCADE,
    payment_id INT REFERENCES payment_methods(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    shift VARCHAR(10) CHECK (shift IN ('AM', 'MID', 'PM')) NOT NULL,
    amount DECIMAL(12,2) NOT NULL
);

-- Create POS Summary Table
CREATE TABLE pos_summary (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    shift VARCHAR(10) CHECK (shift IN ('AM', 'MID', 'PM')) NOT NULL,
    total_trade_pos DECIMAL(12,2) NOT NULL,
    total_non_trade_pos DECIMAL(12,2) NOT NULL,
    grand_total DECIMAL(12,2) NOT NULL,
    z_reading_pos DECIMAL(12,2) NOT NULL
);

-- Create Short/Over POS Table
CREATE TABLE short_over_pos (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    shift VARCHAR(10) CHECK (shift IN ('AM', 'MID', 'PM')) NOT NULL,
    amount DECIMAL(12,2) NOT NULL
);