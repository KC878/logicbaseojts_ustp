'use client'

import SelectMultiple from "@src/components/SelectMultiple";

import useAddCashier from '@src/hooks/useAddCashier';
const test = () => {

  const { selectedShift } = useAddCashier;

  alert(selectedShift);
  const shifts = [
    { label: 'AM', value: 'AM' },
    { label: 'MID', value: 'MID' },
    { label: 'PM', value: 'PM' }
  ]

  
  return (
    
    <SelectMultiple options={shifts}/> 
  );
}

export default test;