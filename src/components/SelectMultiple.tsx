
import { Select, Space } from 'antd';


interface OptionsType{
  label: string;
  value: string;
}

interface SelectMultipleProps {
  options: OptionsType[]
}

const handleChange = (value: string[]) => {
  console.log(`Selected: ${value}`);
};

const SelectMultiple: React.FC<SelectMultipleProps> = ( { options } ) => {

  return (
    <>
      <Select
        mode="multiple"
        size='middle'
        placeholder="Select Shift"
        defaultValue={null}
        onChange={handleChange}
        options={options}
      />
    </>
  );
};

export default SelectMultiple;