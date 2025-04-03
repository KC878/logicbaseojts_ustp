
import { Form, Input, InputNumber, Select, DatePicker, Space, Button } from 'antd';
import React from 'react';
import { 
  UserOutlined,
  DollarOutlined, 
  CalendarOutlined, 
  SwapOutlined,
  WalletOutlined,
  PayCircleOutlined,
  CheckCircleFilled,
  CreditCardOutlined,
} from '@ant-design/icons';

import { useAddCashier } from '@src/hooks/useAddCashier';
import dayjs from 'dayjs';

import type { StatisticProps } from 'antd';
import { Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';

import { formattedDate } from '@src/utils/Date';

import { useCashiersName } from '@src/hooks/useCashiersName';
import { getCashiersName } from '@src/services/getCashiersName';

import { useEffect } from 'react';

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);
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
];






// re edit that later


const currency = [
  { label: 'Philippines', value: 'Philippines'},
  { label: 'USA', value: 'USA'}
]
const TransactionForm: React.FC = () => {
  const [form] = Form.useForm(); // Form instance

  const { cashiersName } = getCashiersName(); // has already defined value 

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

  const transactionID = 0;

  // will run onto how to connect this when selecting a specific cashier and transaction date

  // solve only display is active cashiers

  // assign global name for cashier contemplate if is it necessary
  const optionsNames = cashiersName.map((cashier, index) => ({
    key: `${index + 1}`,  
    label: `${index + 1}. ${cashier.name}`,  
    value: cashier.name,  
  }));
  
   // call this function to process the service
  


  return (
    
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      

      <h1> </h1>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '15px', fontWeight: 600, color: '#333' }}>Transaction ID: </h1>
        <h1 style={{ fontSize: '15px', fontWeight: 600, color: '#333' }}>Date: {formattedDate}</h1>

        <div
          style={{
            marginTop: '10px',
            borderBottom: '1px solid #ccc',  // Thin line
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',  // Sunken effect
          }}
        />
      </div>


      <Form form={form} layout="vertical" hideRequiredMark onFinish={handleFormSubmit}>
        
        {/* Name Field */}
        <Form.Item 
          name="name" 
          label="Select Cashier / existing cashier add his transaction here" 
          rules={[{ required: true, message: 'Please enter a name' }]}
        > 
          <Select
            prefix={<SwapOutlined />}
            size="middle"
            placeholder="Select Shift"
            options={optionsNames}
            style={{ width: 250 }}
            allowClear
          />
        </Form.Item>

        {/* Payment Method Selection */}
        <Form.Item
          name="isActive"
          label="Payment Method"
          rules={[{ required: true, message: 'Select Status' }]}
        >
          <Select
            prefix={<CreditCardOutlined />}
            size="middle"
            placeholder='Select Payment Method'
            style={{ width: 210}}
            allowClear
            options={paymentMethod}
          />
        </Form.Item>

        {/* Shift Selection */}
        <Form.Item
          name="shift"
          label="Shift one at a time correspond to A certain cashier"
          rules={[{ required: true, message: 'Select a shift(s)' }]}
        > 
          <Select
            prefix={<SwapOutlined />}
            size="middle"
            placeholder="Shift"
            options={shifts}
            style={{ width: 120 }}
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="amount" 
          label="Amount / make the UI for th" 
          rules={[{ required: true, message: 'Input amount' }]}
        >   
          
          <Select
            // prefix={<DollarOutlined  />} // change to Currency something related icon 
            // make the the display currency icon or someting 
            // make default display
            defaultValue={currency[0]} // everytime a value is selected change the prefix 
            size="middle"
            style={{ width: 130, textAlign: 'center' }}
            allowClear
            options={currency}
          />

          {/* how about htis / make the selection a currency from country */}
          <InputNumber<number>
            defaultValue={1000}
            min={0}
            formatter={(value) => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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

      <div>
        <div
          style={{
            margin: '20px 0',
            borderBottom: '1px solid #ccc',  // thin border for the line
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',  // adds a sunken effect
          }}
        ></div>
        
        <Row gutter={16} style={{ marginTop: '10px' }}>
          <Col span={12} >
              <Statistic title="Total Amount" value={112893} precision={2} formatter={formatter} />
            </Col>
          <Col span={12}>
            <Statistic title="Number of Transactions Per Period" value={9} formatter={formatter} />
          </Col>
          
        </Row>
      </div>
    </div>
  );
};

export default TransactionForm;
