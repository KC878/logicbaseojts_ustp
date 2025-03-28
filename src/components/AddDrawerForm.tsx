import { Form, Input, Select, DatePicker, Space, Button, message } from 'antd';
import React from 'react';
import { 
  UserOutlined, 
  CalendarOutlined, 
  SwapOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';

import { useAddCashier } from '@src/hooks/useAddCashier';
import dayjs from 'dayjs';

const shifts = [
  { label: 'AM', value: 'AM' },
  { label: 'MID', value: 'MID' },
  { label: 'PM', value: 'PM' }
];

const status = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' }
];

const AddDrawerForm = () => {
  const [form] = Form.useForm(); // Form instance
  // ✅ Move `message.useMessage()` here
  const [messageApi, contextHolder] = message.useMessage();

  const { 
    handleSubmit, 
    setSelectedName, 
    setSelectedShifts, 
    setDates, 
    setSelectedStatus, 
    setShowDrower,
  
    selectedName,
    selectedShifts,
    startDate,
    endDate,
    selectedStatus
  } = useAddCashier();

  interface FormValues {
    name: string;
    shift: string[];
    date: [dayjs.Dayjs, dayjs.Dayjs];
    isActive: string;
  }

  const handleFormSubmit = (values: FormValues) => {

    setSelectedName(values.name);
    setSelectedShifts(values.shift);
    setDates(
      values.date ? values.date[0].format('YYYY-MM-DD') : '',
      values.date ? values.date[1].format('YYYY-MM-DD') : ''
    );
    setSelectedStatus(values.isActive);




    // database submit

    alert(` Form
      Name: ${selectedName}
      Shift: ${selectedShifts}
      Date: ${startDate} - ${endDate}
      Status: ${selectedStatus}
    `);

    handleSubmit(messageApi);

    // Reset form fields
    form.resetFields();

  };

  return (
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">

      {contextHolder}
      <Form form={form} layout="vertical" hideRequiredMark onFinish={handleFormSubmit}>
        
        {/* Name Field */}
        <Form.Item 
          name="name" 
          label="Name" 
          rules={[{ required: true, message: 'Please enter a name' }]}
        > 
          <Input
            size="middle"
            placeholder="Enter a name"
            prefix={<UserOutlined />}
            allowClear
            autoComplete="off"
          />
        </Form.Item>

        {/* Shift Selection */}
        <Form.Item
          name="shift"
          label="Shift"
          rules={[{ required: true, message: 'Select a shift(s)' }]}
        > 
          <Select
            prefix={<SwapOutlined />}
            mode="multiple"
            size="middle"
            placeholder="Select Shift"
            options={shifts}
            allowClear
          />
        </Form.Item>

        {/* Date Picker */}
        <Form.Item 
          name="date" 
          label="Select Date Range" 
          rules={[{ required: true, message: 'Select Date' }]}
        > 
          <DatePicker.RangePicker
            prefix={<CalendarOutlined />}
            style={{ width: "100%" }}
            getPopupContainer={() => document.body}
            allowClear
          />
        </Form.Item>

        {/* Status Selection */}
        <Form.Item
          name="isActive"
          label="Status"
          rules={[{ required: true, message: 'Select Status' }]}
        >
          <Select
            prefix={<CheckCircleFilled />}
            size="middle"
            style={{ width: 120 }}
            allowClear
            options={status}
          />
        </Form.Item>

        {/* Submit Button */}
        <Space>
          <Button 
            onClick={() => handleFormSubmit}
            type="primary" 
            htmlType="submit"
          >
            Submit
          </Button>
          <Button onClick={() => setShowDrower(false)}> Cancel </Button>
          
        </Space>
      </Form>
    </div>
  );
};

export default AddDrawerForm;
