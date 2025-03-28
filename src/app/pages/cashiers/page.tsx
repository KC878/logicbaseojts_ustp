'use client';

import { Input, DatePicker } from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';

import { useCallback, useState} from 'react';

import useCashiers from '@src/hooks/useCashiers';
import { useAddCashier } from '@src/hooks/useAddCashier';
import dayjs from 'dayjs';

import CashiersTable from '@src/components/CashiersTable';
import AddDrawer from '@src/components/AddDrawer';
import SelectMultiple from '@src/components/SelectMultiple';
import SelectSingle from '@src/components/SelectSingle';
import InputContainer from '@src/components/InputContainer';

const CashiersPage: React.FC = () => {
  const { cashiers } = useCashiers();
  const { startDate, endDate, selectedName, setSelectedName, setDates } = useAddCashier();
  
  const [loading, setLoading] = useState();

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
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    setSelectedName(e.target.value);

  };

  return (
    <>
      {/* Make sure passing Reference to avoid lagging in input */}
    
      <AddDrawer >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4"> 
          <InputContainer name="name" label="Name" message="Please enter a name.">
            <Input
              size="middle"
              placeholder="Enter a name"
              prefix={<UserOutlined />}
              value={selectedName}
              allowClear
              onBlur={handleBlur}
            />
          </InputContainer>

          <InputContainer name="shift" label="Shift" message="Please select a shift.">
            <SelectMultiple options={shifts}  />
          </InputContainer>

          <InputContainer name="date" label="Date" message="Select a date.">
            <DatePicker.RangePicker
              prefix={<CalendarOutlined />}
              style={{ width: "100%", minWidth: "250px", maxWidth: "100%" }} // Adapts to container
              getPopupContainer={() => document.body} // Forces dropdown to be at the top level
              onChange={handleDateChange}
              allowClear
              value={[startDate ? dayjs(startDate) : null, endDate ? dayjs(endDate) : null]}
              popupStyle={{ marginTop: 8, zIndex: 1050 }} // Ensures it's on top
              popupClassName="custom-date-picker-dropdown"
            />
          </InputContainer>

          <InputContainer name="status" label="Status" message="Please enter a status.">
            <SelectSingle options={status} />
          </InputContainer>
          
        </div>
        
      </AddDrawer>

      <CashiersTable cashiers={cashiers} columns={columns} />
    </>
  );
};

export default CashiersPage;
// Removed incorrect custom implementation of useRef

