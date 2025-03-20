
export const getCashierInfoQuery = "SELECT * FROM cashiers";


export const getExistingCashierName = "SELECT * FROM cashiers WHERE name = ?";


// Add cashiers 

export const addCashierquery = "INSERT INTO cashiers (name, shift) VALUES (?, ?)";



