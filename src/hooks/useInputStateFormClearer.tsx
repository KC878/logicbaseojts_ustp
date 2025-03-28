import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GlobalState {
  userCurrent: number;
  setUserCurrent: (current: number) => void;
}

export const useCashierPagination = create<GlobalState>()(
  persist(
    (set) => ({
      userCurrent: 1,
      setUserCurrent: (current) => set({ userCurrent: current }),
    }),
    { name: "cashier-pagination" } // Key for localStorage persistence
  )
);
