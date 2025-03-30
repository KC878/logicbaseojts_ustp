

import useCashiers from '@src/hooks/useCashiers';

import CashiersTable from '@src/components/CashiersTable';
import AddDrawer from '@src/components/AddDrawer';
import AddDrawerForm from '@src/components/AddDrawerForm';

import { useEffect } from 'react';
import { message } from 'antd';


import { useAddCashier } from '@src/hooks/useAddCashier';
import { JSX } from 'react/jsx-runtime';


const CashiersPage: React.FC = () => {
  const { cashiers, triggerRefresh } = useCashiers();

  const [messageApi, contextHolder] = message.useMessage();

  const { setShowDrower, handleSubmit, finishSubmit, setFinishSubmit } = useAddCashier();

  let i = 0;
  interface Cashier {
    name: string;
    shift: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
  }

  interface Column {
    title: string;
    dataIndex: keyof Cashier | 'action';
    key?: string;
    render?: (_: any, record: Cashier) => JSX.Element;
  }

  const columns: Column[] = [
    { title: 'No.', dataIndex: 'name' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Shift', dataIndex: 'shift' },
    { title: 'Start-Date', dataIndex: 'startDate' },
    { title: 'End-Date', dataIndex: 'endDate' },
    { title: 'Status', dataIndex: 'isActive' },
    
    // study this entire part
    { 
      key: 'action',
      title: 'Action', 
      dataIndex: 'action', 
      render: (_, record) => (
        <> 
          <button onClick={() => handleEdit(record)}>Edit</button> 
          <button onClick={() => handleEdit(record)}>Deactivate</button> 
        </>

        // this here is special something unique to javascript 
        
      ) 
    } // 
  ];

  const handleEdit = (record: any) => {
    alert(`
      Editing cashier: ${record.name}, 
      Shift: ${record.shift}
      StartDate: ${record.startDate}
      EndDate: ${record.endDate}
      Status ${record.isActive}`);

  };
  

  useEffect(() => {
    
    if(finishSubmit){ // checks whether the finish submit is false  
      handleSubmit(messageApi, triggerRefresh); // calls the globalzied submit form along with the data saved from the global variables

      setFinishSubmit(false); // reset teh finish submit
      setShowDrower(false);
    }
  }, [finishSubmit]) // will trigger upon the changes in the state of finishSubmit
  
  return (
    <>
      {contextHolder}
      <AddDrawer drawerName='Add Cashier' width='30%'>
        <AddDrawerForm />
      </AddDrawer>

      <CashiersTable cashiers={cashiers} columns={columns} />
    </>
  );
};

export default CashiersPage;
