import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';

// Props Options -- > Select Multiple tsx as component
// -- > status prps - string[]


// interface OptionsType { // used OptionType
//   options: { label: string, value: string }[]
// }


// interface AddDrawerProps {
//   selectMultipleComponent: React.ReactNode,
//   status: string[] // parameter for Select 
// }
interface OptionType{
  lable: string;
  value: string;
}

interface AddDrawerProps{
  children: React.ReactNode
}
const AddDrawer: React.FC<AddDrawerProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button>
      <Drawer
        title="Add Cashier"
        width='50%'
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {children}
      </Drawer>
    </>
  );
};

export default AddDrawer;