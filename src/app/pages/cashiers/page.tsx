'use client'


import {Input, DatePicker} from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useState } from 'react';

import useCashiers from '@src/hooks/useCashiers'; // useHooks from now On to Get data

import CashiersTable from '@src/components/CashiersTable';
import AddDrawer from '@src/components/AddDrawer';
import SelectMultiple from '@src/components/SelectMultiple';
import SelectSingle from '@src/components/SelectSingle';
import InputContainer from '@src/components/InputContainer';




const CashiersPage:  React.FC = () => {
  const { cashiers, loading } = useCashiers(); // properly type string


  const [name, setName] = useState('');
  const [shift, setShift] = useState(''); 

  // cashier clumns
  const columns = [
    {title: 'Name', dataIndex: 'name'},
    {title: 'Shift', dataIndex: 'shift'},
    {title: 'Start-Date', dataIndex: 'startDate'},
    {title: 'End-Date', dataIndex: 'endDate'},
    {title: 'Status', dataIndex: 'isActive'}
  ]
  
  const shifts = [
    { label: 'AM', value: 'AM' },
    { label: 'MID', value: 'MID' },
    { label: 'PM', value: 'PM' }
  ]

  const status = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive'}
  ]

  
  return(
    
    // <compomenent a property={<pASSEDcompomenent props/>}
    <>
      <AddDrawer cashierName={name}>

        <InputContainer name='name' label='Name' message='Please enter a name.' >
          <Input 
            size='middle' 
            placeholder="Enter a name" 
            prefix={<UserOutlined />} 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputContainer>
        <InputContainer name='shift' label='Shift' message='Please select a shift.' >
          < SelectMultiple options={shifts} />
        </InputContainer>

        <InputContainer name='date' label='Date' message='Select a date.' >
          <DatePicker.RangePicker
            style={{ width: '100%' }}
            getPopupContainer={(trigger) => trigger.parentElement!}
          />
        </InputContainer>

        <InputContainer name='shift' label='Status' message='Please enter a status.' >
          < SelectSingle options={status}/>
        </InputContainer>

        
      
      </AddDrawer>
        
      <CashiersTable cashiers={cashiers} columns={columns} />

    </>

  );
}

export default CashiersPage;