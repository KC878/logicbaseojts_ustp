'use client';

import { Input, DatePicker } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useCallback, useRef } from 'react';

import useCashiers from '@src/hooks/useCashiers';
import { useAddCashier } from '@src/hooks/useAddCashier';
import dayjs from 'dayjs';

import CashiersTable from '@src/components/CashiersTable';
import AddDrawer from '@src/components/AddDrawer';
import SelectMultiple from '@src/components/SelectMultiple';
import SelectSingle from '@src/components/SelectSingle';
import InputContainer from '@src/components/InputContainer';

import type { InputRef } from 'antd';

const CashiersPage: React.FC = () => {
  const { cashiers } = useCashiers();
  const { setDates } = useAddCashier();
  
  
  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Shift', dataIndex: 'shift' },
    { title: 'Start-Date', dataIndex: 'startDate' },
    { title: 'End-Date', dataIndex: 'endDate' },
    { title: 'Status', dataIndex: 'isActive' }
  ];

  const shifts = [
    { label: 'AM', value: 'AM' },
    { label: 'MID', value: 'MID' },
    { label: 'PM', value: 'PM' }
  ];

  const status = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' }
  ];

  const handleDateChange = useCallback(
    (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
      if (dates && dates[0] && dates[1]) {
        setDates(dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD'));
      }
    },
    [setDates]
  );

  // reference for name Input
  const nameRef = useRef<InputRef>(null);
  

  return (
    <>
      {/* Make sure passing Reference to avoid lagging in input */}
      <AddDrawer inputRef={nameRef as React.RefObject<InputRef>}> 
        <InputContainer name="name" label="Name" message="Please enter a name.">
          <Input
            size="middle"
            placeholder="Enter a name"
            prefix={<UserOutlined />}
            ref={nameRef}
            
          />
        </InputContainer>

        <InputContainer name="shift" label="Shift" message="Please select a shift.">
          <SelectMultiple options={shifts} />
        </InputContainer>

        <InputContainer name="date" label="Date" message="Select a date.">
          <DatePicker.RangePicker
            style={{ width: '100%' }}
            getPopupContainer={(trigger) => trigger.parentElement!}
            onChange={handleDateChange}
          />
        </InputContainer>

        <InputContainer name="status" label="Status" message="Please enter a status.">
          <SelectSingle options={status} />
        </InputContainer>
      </AddDrawer>

      <CashiersTable cashiers={cashiers} columns={columns} />
    </>
  );
};

export default CashiersPage;
// Removed incorrect custom implementation of useRef

