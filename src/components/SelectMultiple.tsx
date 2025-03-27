


import { Select, Space } from 'antd';
import { useAddCashier } from "@src/hooks/useAddCashier"

interface OptionsType{
  label: string;
  value: string;
}

interface SelectMultipleProps {
  options: OptionsType[]
}



const SelectMultiple: React.FC<SelectMultipleProps> = ( { options } ) => {
  const { setDates, selectedShifts, setSelectedShifts } = useAddCashier();

  const handleChange = (value: string[]) => {

    
    setSelectedShifts(value);
    console.log(`Selected: ${selectedShifts}`);
  };

  

  return (
    <>
      <Select
        mode="multiple"
        size='middle'
        placeholder="Select Shift "
        defaultValue={null}
        value={selectedShifts} // control this here
        onChange={handleChange}
        options={options}
        allowClear
      />
    </>
  );
};

export default SelectMultiple;