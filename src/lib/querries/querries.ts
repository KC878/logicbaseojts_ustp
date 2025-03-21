
export const getCashierInfoQuery = "SELECT * FROM cashiers";


export const getExistingCashierName = "SELECT * FROM cashiers WHERE name = ?";

export const getPaymentMethods = "SELECT * FROM payment_methods";
// Add cashiers 



export const addCashierquery = "INSERT INTO cashiers (name, shift) VALUES (?, ?)";





