import { create } from "zustand";

interface GlobalState {
  selectedShifts: string[];
  setSelectedShifts: (shifts: string[]) => void;
}

export const useAddCashier = create<GlobalState>((set) => ({
  selectedShifts: [], // Initial empty array
  setSelectedShifts: (shifts) => set({ selectedShifts: shifts }), // Function to update state
}));
