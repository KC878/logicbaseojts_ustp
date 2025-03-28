-- CREATE DATABASE logicbase_ojt_db_ustp;
-- USE logicbase_ojt_db_ustp;

-- Ensure tables are dropped in order to avoid FK constraint errors
DROP TABLE IF EXISTS pos_adjustments;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS pos_summary;
DROP TABLE IF EXISTS payment_methods;
DROP TABLE IF EXISTS cashiers;

CREATE TABLE cashiers (
    cashierID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    shift VARCHAR(50) NOT NULL, -- ✅ Changed from SET to VARCHAR(50) to store 'AM, MID, PM'
    startDate DATE NOT NULL,
    endDate DATE DEFAULT NULL CHECK (endDate IS NULL OR endDate > startDate),
    isActive TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE payment_methods (
    paymentID INT AUTO_INCREMENT PRIMARY KEY,
    paymentType VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE pos_summary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    shift VARCHAR(50) NOT NULL, -- ✅ Changed from SET to VARCHAR(50)
    total_trade_pos DECIMAL(12,2) NOT NULL,
    total_non_trade_pos DECIMAL(12,2) NOT NULL,
    grand_total DECIMAL(12,2) NOT NULL,
    z_reading_pos DECIMAL(12,2) NOT NULL,
    short_over DECIMAL(12,2) NOT NULL DEFAULT 0
);

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cashierID INT NOT NULL,
    paymentID INT NOT NULL,
    pos_summary_id INT NOT NULL,
    date DATE NOT NULL,
    shift VARCHAR(50) NOT NULL, -- ✅ Changed from SET to VARCHAR(50)
    amount DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (cashierID) REFERENCES cashiers(cashierID) ON DELETE CASCADE,
    FOREIGN KEY (paymentID) REFERENCES payment_methods(paymentID) ON DELETE CASCADE,
    FOREIGN KEY (pos_summary_id) REFERENCES pos_summary(id) ON DELETE CASCADE
);

CREATE TABLE pos_adjustments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pos_summary_id INT NOT NULL,
    adjustment_type ENUM('SHORT', 'OVER') NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (pos_summary_id) REFERENCES pos_summary(id) ON DELETE CASCADE
);
