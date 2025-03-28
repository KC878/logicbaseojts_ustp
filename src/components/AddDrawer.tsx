import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Space, message } from 'antd';
import { useAddCashier } from "@src/hooks/useAddCashier";

interface AddDrawerProps {
  children: React.ReactNode;
}

const AddDrawer: React.FC<AddDrawerProps> = ({ children }) => {
  const { setShowDrower, showDrower } = useAddCashier();

  

  return (
    <>
    
      <Button type="primary" onClick={() => setShowDrower(true) } icon={<PlusOutlined />}>
        Add Cashier
      </Button>
      <Drawer
        title="Add Cashier"
        width="30%"
        onClose={() => setShowDrower(false) }
        open={showDrower}
        styles={{ body: { paddingBottom: 80 } }}
        
      >
        {children}
      </Drawer>
    </>
  );
};

export default AddDrawer;
