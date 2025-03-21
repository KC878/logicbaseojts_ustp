
export const getCashierInfoQuery = "SELECT * FROM cashiers";


export const getExistingCashierName = "SELECT * FROM cashiers WHERE name = ?";

export const getPaymentMethods = "SELECT * FROM payment_methods";


export const getPosSummary = "SELECT * FROM pos_summary";

export const getShortOverPos = "SELECT * FROM short_over_pos";

export const getTransactions = `
  SELECT 
    transactions.id AS transaction_id,
    DATE(transactions.date) AS transaction_date, -- Added alias
    transactions.shift AS transaction_shift,
    transactions.amount,
    cashiers.id AS cashier_id,
    cashiers.name AS cashier_name,
    cashiers.shift AS cashier_shift
  FROM transactions
  JOIN cashiers ON transactions.cashier_id = cashiers.id;
`;



// Add cashiers 



export const addCashierquery = "INSERT INTO cashiers (name, shift) VALUES (?, ?)";





