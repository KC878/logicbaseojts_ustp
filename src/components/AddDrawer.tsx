
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, } from 'antd';
import { useAddCashier } from "@src/hooks/useAddCashier";

interface AddDrawerProps {
  width: string;
  drawerName: string;
  children: React.ReactNode;
}

const AddDrawer: React.FC<AddDrawerProps> = ({ drawerName, width, children  }) => {
  const { setShowDrower, showDrower } = useAddCashier();

  

  return (
    <>
    
      <Button 
        type="primary" onClick={() => setShowDrower(true) } 
        icon={<PlusOutlined />}
        style={{
          marginBottom: '15px',
        }}
      >
        {drawerName}
      </Button>
      <Drawer
        title="Add Cashier"
        width={width}
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
