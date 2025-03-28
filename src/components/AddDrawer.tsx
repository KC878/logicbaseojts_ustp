import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Space, message } from 'antd';

import { useAddCashier } from "@src/hooks/useAddCashier";

interface AddDrawerProps {
  children: React.ReactNode;
}

const AddDrawer: React.FC<AddDrawerProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const { selectedName, selectedShifts, selectedStatus, startDate, endDate  } = useAddCashier();
  const { setSelectedName, setSelectedShifts, setDates, setSelectedStatus } = useAddCashier();

  const [messageApi, contextHolder] = message.useMessage();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
   

    setOpen(false);
  }; 

  const handleSubmit = async () => {


    const shift = selectedShifts; // store it in a variable // dunno why but it just works rather than store it as state variable
    let status;
    if(selectedStatus === 'active'){
      status = true;
    }else{
      status = false;
    } // handle status more efficiently next Time improve on that


    const name = selectedName;
    // alert(`Name: ${name}, Shifts: ${selectedShifts}, Start Date: ${startDate}, End Date: ${endDate}, Status: ${selectedStatus}`)


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

    const data = await res.json();


    if(res.ok){
      messageApi.open({ type: 'success', content: data.message, });
      
      alert(selectedShifts);
    
      setSelectedName('');
      setSelectedShifts([]); // empty the shifts
      setDates('', null)
      setSelectedStatus('');
      
      onClose();

      window.location.reload(); // reload
    } else{
      messageApi.open({ type: 'error', content: data.error, });
    } // this is how you handle errors now make it a modal receiver or something 

    
  }

  
  
    
     

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Add Cashier
      </Button>
      <Drawer
        title="Add Cashier"
        width='30%'
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