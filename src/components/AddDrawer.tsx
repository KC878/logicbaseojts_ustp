import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Space, InputRef } from 'antd';

import { useAddCashier } from "@src/hooks/useAddCashier";

interface AddDrawerProps {
  inputRef: React.RefObject<InputRef>;
  children: React.ReactNode;
}

const AddDrawer: React.FC<AddDrawerProps> = ({ inputRef, children }): React.ReactElement => {
  const [open, setOpen] = useState(false);

  const { setSelectedName, selectedName, selectedShifts, selectedStatus, startDate, endDate  } = useAddCashier();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  }; 


  

  const handleSubmit = async () => {


    const name = inputRef.current.input?.value || "";
    const shift = selectedShifts; // store it in a variable // dunno why but it just works rather than store it as state variable
    let status;
    if(selectedStatus === 'active'){
      status = true;
    }else{
      status = false;
    }

    


    // alert(`Name: ${name}, Shifts: ${selectedShifts}, Start Date: ${startDate}, End Date: ${endDate}, Status: ${selectedStatus}`)

    alert(selectedShifts);
    const res = await fetch('/api/addCashier', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        shift,
        startDate,
        endDate,
        status
      })
    });
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