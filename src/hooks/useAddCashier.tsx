import { create } from "zustand";



interface GlobalState {
  finishSubmit: boolean;
  setFinishSubmit: (open: boolean) => void;

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

  handleSubmit: (messageApi: any, triggerRefresh: any) => Promise<void>;
}

export const useAddCashier = create<GlobalState>((set, get) => ({
  finishSubmit: false,
  setFinishSubmit: (open) => set({ finishSubmit: open }),

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

  // Accept `messageApi` from the component
  handleSubmit: async (messageApi, triggerRefresh) => {
    const { selectedName, selectedShifts, startDate, endDate, selectedStatus, setSelectedName, setSelectedShifts, setDates, setSelectedStatus } = get();

    let status = selectedStatus === 'active';

    const res = await fetch('/api/POST/addCashier', {
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

      triggerRefresh();
    } else {
      messageApi.error(data.error);
    }
  }
}));
