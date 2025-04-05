-- Currencies with Symbols
INSERT INTO currencies (currencyID, currency) VALUES
('USD', '$'),
('PHP', '₱'),
('EUR', '€'),
('JPY', '¥'),
('GBP', '£');

-- Payment Methods
INSERT INTO payment_methods (paymentType) VALUES
('CASH'), 
('CHECK'), 
('BPI CREDIT CARD'), 
('BPI DEBIT CARD'),
('METRO CREDIT CARD'), 
('METRO DEBIT CARD'), 
('PAY MAYA'), 
('AUB CREDIT CARD'), 
('GCASH'), 
('FOOD PANDA'), 
('STREETBY'),
('GRAB FOOD');

-- Cashiers
INSERT INTO cashiers (name, shift, startDate, endDate, isActive) VALUES
('John Doe', 'AM', '2025-01-01', NULL, 1),
('Jane Smith', 'PM', '2025-01-01', NULL, 1);

-- Transactions (Now with currencyID included)
INSERT INTO transactions (transactionID, cashierID, paymentID, date, shift, currencyID, amount) VALUES
(REPLACE(UUID(), '-', ''), 1, 1, '2025-01-01', 'AM', 'PHP', 100.50),  -- John Doe, Cash
(REPLACE(UUID(), '-', ''), 1, 2, '2025-01-01', 'AM', 'PHP', 200.75),  -- John Doe, Check
(REPLACE(UUID(), '-', ''), 2, 3, '2025-01-01', 'PM', 'USD', 500.00),  -- Jane Smith, BPI Credit Card
(REPLACE(UUID(), '-', ''), 2, 4, '2025-01-01', 'PM', 'USD', 150.30),  -- Jane Smith, BPI Debit Card
(REPLACE(UUID(), '-', ''), 1, 5, '2025-01-01', 'AM', 'EUR', 300.00);  -- John Doe, Metro Credit Card
