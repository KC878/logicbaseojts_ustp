import { create } from "zustand";

interface GlobalState {
  selectedName: string;
  setSelectedName: (name: string) => void;

  selectedShifts: string[];
  setSelectedShifts: (shifts: string[]) => void;

  startDate: string;
  endDate: string | null;
  setDates: (start: string, end: string | null) => void

  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}

export const useAddCashier = create<GlobalState>((set) => ({
  selectedName: '',
  setSelectedName: (name) => set({ selectedName: name }),
  selectedShifts: [], // Initial empty array
  setSelectedShifts: (shifts) => set({ selectedShifts: shifts }), // Function to update state

  startDate: '',
  endDate: null,
  setDates: (start, end) => set({ startDate: start, endDate: end}),

  selectedStatus: '', 
  setSelectedStatus: (status) => set({ selectedStatus: status}),
}));
