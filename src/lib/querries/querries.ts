
export const getCashiers = "SELECT name, shift, startDate, endDate, isActive FROM cashiers";

export const getCashiersName = "SELECT cashierID, name FROM cashiers";



export const getPaymentMethods = "SELECT paymentID, paymentType FROM payment_methods ORDER BY paymentID ASC";

export const getCurrencies = "SELECT currencyID, currency FROM currencies ORDER BY currencyID ASC";
//


export const getExistingCashierName = "SELECT * FROM cashiers WHERE name = ?";



export const getPosSummary = "SELECT * FROM pos_summary";

export const getShortOverPos = "SELECT * FROM short_over_pos";

export const getTransactions = `SELECT

  transactions.id,
  cashiers.name AS cashier_name,
  transactions.shift AS shift,
  transactions.amount AS transaction_amount,
  DATE(transactions.date) AS transaction_date
FROM cashiers
INNER JOIN transactions ON cashiers.id = transactions.cashier_id;
`;




// Add cashiers 



export const addCashierquery = "INSERT INTO cashiers (name, shift, startDate, endDate, isActive) VALUES (?, ?, ?, ?, ?)";





