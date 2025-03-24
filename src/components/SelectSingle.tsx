import React from 'react';
import { Select, Space } from 'antd';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

interface OptionType{
  label: string;
  value: string;
}

interface SelectProps {
  options: OptionType[]
}
const SelectSingle: React.FC<SelectProps> = ({ options }) => (
  <Select
    size='middle'
    defaultValue={null}
    style={{ width: 120 }}
    allowClear
    options={options}
  />
);

export default SelectSingle;