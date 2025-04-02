import { Form, Input, InputNumber, Select, DatePicker, Space, Button } from 'antd';
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

const paymentMethod = [
  { label: "CASH", value: "cash" },
  { label: "CHECK", value: "check" },
  { label: "BPI CREDIT CARD", value: "bpi_credit_card" },
  { label: "BPI DEBIT CARD", value: "bpi_debit_card" },
  { label: "METRO CREDIT CARD", value: "metro_credit_card" },
  { label: "METRO DEBIT CARD", value: "metro_debit_card" },
  { label: "PAY MAYA", value: "pay_maya" },
  { label: "AUB CREDIT CARD", value: "aub_credit_card" },
  { label: "GCASH", value: "gcash" },
  { label: "FOOD PANDA", value: "food_panda" },
  { label: "STREETBY", value: "streetby" },
  { label: "GRAB FOOD", value: "grab_food" },
  { label: "GC CLAIMED (OTHERS)", value: "gc_claimed_others" },
  { label: "GC CLAIMED (OWN)", value: "gc_claimed_own" },
  { label: "A/R ______________", value: "a_r_1" },
  { label: "A/R ______________", value: "a_r_2" },
  { label: "SUB TOTAL TRADE POS", value: "sub_total_trade_pos" }
];






const curency = [
  { label: '$', value: '$'}
]
const TransactionForm = () => {
  const [form] = Form.useForm(); // Form instance
  // ✅ Move `message.useMessage()` here
 
  const { 
    setFinishSubmit,
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

    
    
    setFinishSubmit(true); // setFinish submit global
    // Reset form fields
    form.resetFields();

  };

  return (
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">

      <> 
      clock here
      ________________________________________
      </>
      
      <h1> include Crucial Cashier info </h1>
      <h1> opiton: make date available </h1>
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

        {/* Payment Method Selection */}
        <Form.Item
          name="isActive"
          label="Payment Method"
          rules={[{ required: true, message: 'Select Status' }]}
        >
          <Select
            // prefix={<CheckCircleFilled />}
            size="middle"
            
            style={{ width: 200 }}
            allowClear
            options={paymentMethod}
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
            size="middle"
            placeholder="Select Shift"
            options={shifts}
            style={{ width: 120 }}
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="amount" 
          label="Amount" 
          rules={[{ required: true, message: 'Input amount' }]}
        >   

          <Select
            prefix={<CheckCircleFilled />} // change to Currency something related icon 
            // make the the display currency icon or someting 
            // make default display
            defaultValue={'$'} // everytime a value is selected change the prefix 
            size="middle"
            style={{ width: 40 }}
            allowClear
            options={curency}
          />
          <InputNumber<number>
            defaultValue={1000}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
            style={{ width: 160}}
            // onChange={onChange}
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

      <h1> Something Represent Gross Total //  </h1> 
      <h1> Net Total or Something  </h1> 
    </div>
  );
};

export default TransactionForm;
