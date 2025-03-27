import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Space, InputRef } from 'antd';

import { useAddCashier } from "@src/hooks/useAddCashier";
interface AddDrawerProps{
  inputRef: React.RefObject<InputRef>;
  children: React.ReactNode;

}
const AddDrawer: React.FC<AddDrawerProps> = ({ inputRef, children }) => {
  const [open, setOpen] = useState(false);

  const { setSelectedName, selectedName, selectedShifts, selectedStatus, startDate, endDate  } = useAddCashier();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // if (inputRef.current) {
    //   const name = inputRef.current.input?.value || ""; // ✅ Safely get value
      // alert(`
      //   ${selectedName}
      //   ${selectedStatus} ${selectedShifts}
      //   ${startDate} ${endDate}
      // `);
    // }
    // Testing the input 
    // setSelectedName(inputRef.current.input?.value || "") // set name to this

    const name = inputRef.current.input?.value || "";
    setSelectedName(name); // set the name

    // also pass reset for every input here

    // api fetch for adding Input 
    onClose();
  };

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
            <Button onClick={handleSubmit} type="primary">
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