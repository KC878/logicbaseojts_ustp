import { create } from 'zustand';

interface GlobalState{
  cashiersName: string[];
  setCashiersName: (names: string[]) => void; 
}

export const useCashiersName = create<GlobalState>((set) => ({
  cashiersName: [],
  setCashiersName: (names) => set({ cashiersName: names})
  
}));