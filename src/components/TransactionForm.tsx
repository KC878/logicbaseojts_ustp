
import { Form, Spin, Input, InputNumber, Select, DatePicker, Space, Button } from 'antd';
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


import dayjs from 'dayjs';

import type { StatisticProps } from 'antd';
import { Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';

import { formattedDate } from '@src/utils/Date'; 

import { useFetchData } from '@src/services/useFetchData';

import { useGenerateTransactionID } from '@src/hooks/useGenerateTransactionID'

import { useEffect, useState } from 'react';
import { useAddCashier } from '@src/hooks/useAddCashier';

const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);
const shifts = [
  { label: 'AM', value: 'AM' },
  { label: 'MID', value: 'MID' },
  { label: 'PM', value: 'PM' }
];



const currency = [
  { label: 'Philippines', value: 'Philippines'},
  { label: 'USA', value: 'USA'}
]
const TransactionForm: React.FC = () => {
  const [form] = Form.useForm(); // Form instance

  const [cashier, setCashier] = useState(''); 
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shift, setShift] = useState('');
  const [country, setCountry] = useState('');
  const [amount, setAmount] = useState(0);

  const { setShowDrower } = useAddCashier(); // open and close control Drawer


  // Define type for CashierType
  type CashierType = {
    id: string;
    name: string;
  }

  type PaymentMethodType = {
    id: number;
    paymentType: string;
  }

  const { data: cashiers, loading: loadingCashiers } = useFetchData<CashierType>('/api/GET/getCashiersName');

  const { data: paymentMethods, loading: loadingPayments } = useFetchData<PaymentMethodType>('/api/GET/getPaymentMethods');


  const { transactionID } = useGenerateTransactionID(); // has transaction ID unique every render

  // ✅ Move `message.useMessage()` here

  interface FormValues {
    name: string;
    shift: string[];
    date: [dayjs.Dayjs, dayjs.Dayjs];
    isActive: string;
  }

  const handleFormSubmit = (values: FormValues) => {

    alert(` Form
      Date: ${formattedDate}
      Transaction ID: ${transactionID} 
      Name: ${cashier}
      Payment Method: ${paymentMethod}
      Shift: ${shift}
      Amount: ${amount}
      Country: ${country}
    `);
    // reads the value
    // Reset form fields
    form.resetFields();

  };


  
  // will run onto how to connect this when selecting a specific cashier and transaction date

  // solve only display is active cashiers

  // assign global name for cashier contemplate if is it necessary
  const optionsNames = cashiers.map((cashier, index) => ({
    key: index,  
    label: cashier.name,  
    value: cashier.name,  
  }));
   // call this function to process the service
  
  const optionsPaymentMethod = paymentMethods.map((method, index) => ({
    key: index,
    label: method.paymentType,
    value: method.paymentType
  }))
  // define payment Method 
  return ( 
    
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      

      <div style={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
        <h1 style={{ fontSize: '15px', fontWeight: 600, color: '#333', marginBottom: '1px' }}>Date: {formattedDate}</h1>
        <h1 style={{ fontSize: '15px', fontWeight: 600, color: '#333' }}>Transaction ID: {transactionID} </h1>
        

        <div
          style={{
            marginTop: '10px',
            marginBottom: '20px', 
            borderBottom: '1px solid #ccc',  // Thin line
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',  // Sunken effect
          }}
        />
      </div>


      <Form form={form} layout="vertical" hideRequiredMark onFinish={handleFormSubmit}>
        
        {/* Name Field */}
        <Form.Item 
          name="name" 
          label="Cashier" 
          rules={[{ required: true, message: 'Select a Cashier' }]}
        > 
          <Select
          
            prefix={<UserOutlined />}
            loading={loadingCashiers}
            size="middle"
            placeholder="Select Cashier"
            options={loadingCashiers ? [] : optionsNames}
            style={{ width: 250 }}
            allowClear
            value={cashier}
            onChange={(cashier) => setCashier(cashier)} // see the value on change
            notFoundContent={
              loadingCashiers ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                  <Spin size="small" />
                </div>
              ) : null // repeated occurence store it in a function later
            }

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
            loading={loadingPayments}
            options={loadingPayments ? [] : optionsPaymentMethod}
            value={paymentMethod}
            onChange={(method) => setPaymentMethod(method)}
            notFoundContent={
              loadingPayments ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                  <Spin size="small" />
                </div>
              ) : null // repeated occurence store it in a function later
            }
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
            // loading={loading}
            size="middle"
            placeholder="Shift"
            options={shifts}
            value={shift}
            onChange={(shift) => setShift(shift)}
            style={{ width: 120 }}
            allowClear
          />
        </Form.Item>

        <Form.Item label="Amount / make the UI for th">
          <div style={{ display: 'flex', gap: '10px' }}>
            <Select
              // defaultValue={currency[0]}
              size="middle"
              style={{ width: 130}}
              allowClear
              options={currency}
              value={country}
              onChange={(country) => setCountry(country)}
            />
            <Form.Item
              name="amount"
              noStyle
              rules={[{ required: true, message: 'Input amount' }]}
            >
              <InputNumber<number>
                defaultValue={0.00}
                precision={2}
                min={0}
                formatter={(value) => {
                  const num = typeof value === 'number' ? value : parseFloat(value || '0');
                  return `₱ ${num.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}`;
                }}
                parser={(value) => value?.replace(/₱\s?|,/g, '') as unknown as number}
                style={{ width: 160 }}

                onChange={(amount) => setAmount(amount !== null ? amount : 0)}
              />

            </Form.Item>
          </div>
        </Form.Item> 

      <div>
        <Row gutter={16} style={{ marginTop: '10px' }}>
          <Col span={12} >
              <Statistic title="Total Amount" value={amount} precision={2} formatter={formatter} />
            </Col>
          <Col span={12}>
            <Statistic title="Number of Transactions Per Period" value={9} formatter={formatter} />
          </Col>
        </Row>

        <div
          style={{
            margin: '20px 0',
            borderBottom: '1px solid #ccc',  // thin border for the line
            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',  // adds a sunken effect
          }}
        ></div>
      </div>

        {/* Submit Button */}
        <Space>
          <Button 
            onClick={() => handleFormSubmit}
            type="primary" 
            htmlType="submit"
          >
            Confirm
          </Button>
          <Button onClick={() => setShowDrower(false)}> Cancel </Button>
          
        </Space>
      </Form>

      
    </div>
  );
};

export default TransactionForm;
