import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Space } from 'antd';

import { useAddCashier } from "@src/hooks/useAddCashier";
interface AddDrawerProps{
  children: React.ReactNode
}
const AddDrawer: React.FC<AddDrawerProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const { selectedName, selectedShifts, selectedStatus, startDate, endDate  } = useAddCashier();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubimt = () => {
    alert(`
      ${selectedName}
      ${selectedStatus} ${selectedShifts}
      ${startDate} ${endDate}
    ` );
    onClose();
  }

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Add Cashier
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
            <Button onClick={handleSubimt} type="primary">
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