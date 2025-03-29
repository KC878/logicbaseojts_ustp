

import useCashiers from '@src/hooks/useCashiers';

import CashiersTable from '@src/components/CashiersTable';
import AddDrawer from '@src/components/AddDrawer';
import AddDrawerForm from '@src/components/AddDrawerForm';

import { useEffect } from 'react';
import { message } from 'antd';


import { useAddCashier } from '@src/hooks/useAddCashier';


const CashiersPage: React.FC = () => {
  const { cashiers, triggerRefresh } = useCashiers();

  const [messageApi, contextHolder] = message.useMessage();

  const { setShowDrower, handleSubmit, finishSubmit, setFinishSubmit } = useAddCashier();

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Shift', dataIndex: 'shift' },
    { title: 'Start-Date', dataIndex: 'startDate' },
    { title: 'End-Date', dataIndex: 'endDate' },
    { title: 'Status', dataIndex: 'isActive' }
  ];

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
      <AddDrawer>
        <AddDrawerForm />
      </AddDrawer>

      <CashiersTable cashiers={cashiers} columns={columns} />
    </>
  );
};

export default CashiersPage;
