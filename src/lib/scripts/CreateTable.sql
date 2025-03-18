-- Select the database
USE logicbase_ojt_db_ustp;

-- Drop tables if they exist
DROP TABLE IF EXISTS short_over_pos;
DROP TABLE IF EXISTS pos_summary;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS payment_methods;
DROP TABLE IF EXISTS cashiers;

-- Create Cashiers Table
CREATE TABLE cashiers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    shift ENUM('AM', 'MID', 'PM') NOT NULL
);

-- Create Payment Methods Table
CREATE TABLE payment_methods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    payment_type VARCHAR(50) UNIQUE NOT NULL
);

-- Create Transactions Table
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cashier_id INT,
    payment_id INT,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    shift ENUM('AM', 'MID', 'PM') NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (cashier_id) REFERENCES cashiers(id) ON DELETE CASCADE,
    FOREIGN KEY (payment_id) REFERENCES payment_methods(id) ON DELETE CASCADE
);

-- Create POS Summary Table
CREATE TABLE pos_summary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    shift ENUM('AM', 'MID', 'PM') NOT NULL,
    total_trade_pos DECIMAL(12,2) NOT NULL,
    total_non_trade_pos DECIMAL(12,2) NOT NULL,
    grand_total DECIMAL(12,2) NOT NULL,
    z_reading_pos DECIMAL(12,2) NOT NULL
);

-- Create Short/Over POS Table
CREATE TABLE short_over_pos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    shift ENUM('AM', 'MID', 'PM') NOT NULL,
    amount DECIMAL(12,2) NOT NULL
);
