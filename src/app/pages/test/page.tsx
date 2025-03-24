'use client'

import SelectMultiple from "@src/components/SelectMultiple";

import useCashiers from "@src/hooks/useCashiers";

const test = () => {
  const { cashiers } = useCashiers();

  const shifts = [
    'AM',
    'MID',
    'PM'
  ]

  return (

    <SelectMultiple options={shifts}/> 
  );
}

export default test;