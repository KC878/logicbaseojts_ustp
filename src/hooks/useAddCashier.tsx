import { create } from "zustand";

interface GlobalState {
  showDrower: boolean;
  setShowDrower: (open: boolean) => void;
  
  selectedName: string;
  setSelectedName: (name: string) => void;

  selectedShifts: string[];
  setSelectedShifts: (shifts: string[]) => void;

  startDate: string;
  endDate: string | null;
  setDates: (start: string, end: string | null) => void;

  selectedStatus: string;
  setSelectedStatus: (status: string) => void;

  handleSubmit: (messageApi: any) => Promise<void>;
}

export const useAddCashier = create<GlobalState>((set, get) => ({
  showDrower: false,
  setShowDrower: (open) => set({ showDrower: open}),

  selectedName: '',
  setSelectedName: (name) => set({ selectedName: name }),
  
  selectedShifts: [],
  setSelectedShifts: (shifts) => set({ selectedShifts: shifts }),

  startDate: '',
  endDate: null,
  setDates: (start, end) => set({ startDate: start, endDate: end }),

  selectedStatus: '', 
  setSelectedStatus: (status) => set({ selectedStatus: status }),

  // ✅ Fix: Accept `messageApi` from the component
  handleSubmit: async (messageApi) => {
    const { selectedName, selectedShifts, startDate, endDate, selectedStatus, setSelectedName, setSelectedShifts, setDates, setSelectedStatus } = get();



    
    let status = selectedStatus === 'active';

    const res = await fetch('/api/addCashier', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: selectedName,
        shift: selectedShifts,
        startDate,
        endDate,
        status
      })
    });

    const data = await res.json();

    if (res.ok) {
      messageApi.success(data.message);
      

      alert(` Zustand
        Name: ${selectedName}
        Shift: ${selectedShifts}
        Date: ${startDate} - ${endDate}
        Status: ${selectedStatus}
      `);
      // Reset fields
      setSelectedName("");
      setSelectedShifts([]);
      setDates("", null);
      setSelectedStatus("");
    } else {
      messageApi.error(data.error);
    }
  }
}));
