import { create } from 'zustand';

interface GlobalState{
  transactionDate: string;
  setTransactionDate: (date: string) => void;

  globalTransactionID: string;
  setGlobalTransactionID: (id: string) => void; 

  cashier: string;
  setCashier: (name: string) => void; 

  paymentMethod: string;
  setPaymentMethod: (method: string) => void;

  transactionShift: string;
  setTransactionShift: (shift: string) => void;

  currency: string;
  setCurrency: (currency: string) => void;

  amount: number;
  setAmount: (amount: number) => void;
}

export const useAddTransaction = create<GlobalState>((set) => ({
  transactionDate: '',
  setTransactionDate: (date) => set({ transactionDate: date }),

  globalTransactionID: '',
  setGlobalTransactionID: (id) => set({ globalTransactionID: id }),

  cashier: '',
  setCashier: (name) => set({ cashier: name }),

  paymentMethod: '',
  setPaymentMethod: (method) => set({ paymentMethod: method }),

  transactionShift: '',
  setTransactionShift: (shift) => set({ transactionShift: shift }),

  currency: '',
  setCurrency: (item) => set({ currency: item }),

  amount: 0.00,
  setAmount: (amount) => set({ amount: amount }),
  
}));