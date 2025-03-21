
'use client'

import React from 'react';
import { Select } from 'antd';
// import { useState } from 'react';
import { useState, useEffect } from 'react';

interface OptionType {
	value: string;
	label: string;
	
}
const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log('search:', value);
};



const options: OptionType[] = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' },
];




const SelectPaymentMethod: React.FC = () => {
	const [paymentMethods, setPaymentMethods] = useState([]);

  
  const options: OptionType[] = paymentMethods.map(item => {
    return { 
      value: item.payment_type.toLowerCase(), 
      label: item.payment_type}; 
  });

  useEffect(() =>{

    const fetchPaymentMethonds = async () => {
      try{
        const res = await fetch('/api/getPaymentMethods');
        const data = await res.json();
        setPaymentMethods(data);
        console.log(data);
        
      }catch(error){
        console.error('Failed  to fetch Payment Method: ', error);
      }
    
    };


    fetchPaymentMethonds();

  }, []);
	
  return(
    <Select<OptionType> 
      showSearch
      placeholder="Select Payment Method"
      optionFilterProp="label"
      onChange={onChange}
      onSearch={onSearch}
      options={options}

      style={{
        width: 200
      }}
	  />
  );
	
};

export default SelectPaymentMethod;