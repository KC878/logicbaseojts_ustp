import { create } from 'zustand';


const { v4: uuidv4 } = require('uuid');
const transactionID = uuidv4().replace(/-/g, ''); // 


interface GlobalState{
  transactionID: string; 
}

export const useGenerateTransactionID = create<GlobalState>(() => ({
  transactionID: transactionID, // unique ID every render
  
}));