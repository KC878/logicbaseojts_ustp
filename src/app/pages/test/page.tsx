'use client'

import SelectMultiple from "@src/components/SelectMultiple";

const test = () => {
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