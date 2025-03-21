'use client'

import React, { useState, useEffect } from 'react';
import { Select } from 'antd';

interface OptionType {
  value: string;
  label: string;
}

const SelectPaymentMethod: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<OptionType[]>([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const res = await fetch('/api/getPaymentMethods');
        const data = await res.json();

        // Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setPaymentMethods(
            data.map((item) => ({
              value: item.payment_type.toLowerCase(),
              label: item.payment_type,
            })) as OptionType[]
          );
        }
      } catch (error) {
        console.error('Failed to fetch Payment Methods:', error);
      }
    };

    fetchPaymentMethods();
  }, []);

  return (
    <Select
      showSearch
      placeholder="Select Payment Method"
      optionFilterProp="label"
      onChange={(value) => console.log(`Selected: ${value}`)}
      onSearch={(value) => console.log('Search:', value)}
      options={paymentMethods}
      style={{ width: 200 }}
    />
  );
};

export default SelectPaymentMethod;
