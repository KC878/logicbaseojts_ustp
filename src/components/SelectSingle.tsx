import React from 'react';
import { Select, Space } from 'antd';


import { useAddCashier } from "@src/hooks/useAddCashier";


import { CheckCircleFilled  } from '@ant-design/icons';

interface OptionType{
  label: string;
  value: string;
}

interface SelectProps {
  options: OptionType[]
}
const SelectSingle: React.FC<SelectProps> = ({ options }) => {

  const { selectedStatus, setSelectedStatus } = useAddCashier();

  const handleChange = (value: string) => {
    setSelectedStatus(value);
  };

  return (
    <Select
      prefix={<CheckCircleFilled />}
      size='middle'
      defaultValue={null}
      style={{ width: 120 }}
      allowClear
      options={options}
      value={selectedStatus}
      onChange={handleChange}
    />
  );
};

export default SelectSingle;