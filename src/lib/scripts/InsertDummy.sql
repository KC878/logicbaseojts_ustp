-- Insert Seed Data for Cashiers
INSERT INTO cashiers (name, shift) VALUES
('Cherry', 'AM'),
('Cristie', 'PM');

-- Insert Seed Data for Payment Methods
INSERT INTO payment_methods (payment_type) VALUES
('Cash'), ('Check'), ('BPI Credit Card'), ('BPI Debit Card'),
('Metro Credit Card'), ('Metro Debit Card'), ('Pay Maya'), 
('AUB Credit Card'), ('GCash'), ('Food Panda'), ('StreetBy'),
('Grab Food'), ('GC Claimed (Others)'), ('GC Claimed (Own)'), ('A/R');

-- Insert Seed Data for Transactions
INSERT INTO transactions (cashier_id, payment_id, date, shift, amount) VALUES
(1, 1, '2025-03-17', 'AM', 63608.00),
(2, 1, '2025-03-17', 'PM', 38168.00),
(1, 3, '2025-03-17', 'AM', 5022.00),
(2, 3, '2025-03-17', 'PM', 10026.89),
(1, 7, '2025-03-17', 'AM', 16510.67),
(2, 7, '2025-03-17', 'PM', 7835.71),
(1, 9, '2025-03-17', 'AM', 3108.00),
(2, 9, '2025-03-17', 'PM', 3345.00),
(2, 10, '2025-03-17', 'PM', 1520.00),
(2, 12, '2025-03-17', 'PM', 2759.00);

-- Insert Seed Data for POS Summary
INSERT INTO pos_summary (date, shift, total_trade_pos, total_non_trade_pos, grand_total, z_reading_pos) VALUES
('2025-03-17', 'AM', 88248.67, 0.00, 88248.67, 88248.58),
('2025-03-17', 'MID', 4279.00, 60.00, 4339.00, 60.00),
('2025-03-17', 'PM', 59375.60, 0.00, 59375.60, 59375.66);

-- Insert Seed Data for Short/Over POS
INSERT INTO short_over_pos (date, shift, amount) VALUES
('2025-03-17', 'AM', 0.09),
('2025-03-17', 'MID', 4279.00),
('2025-03-17', 'PM', 0.04);