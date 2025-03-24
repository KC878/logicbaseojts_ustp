'use client'


import useCashiers from '@src/hooks/useCashiers'; // useHooks from now On to Get data

import CashiersTable from '@src/components/CashiersTable';
import AddDrawer from '@src/components/AddDrawer';

const CashiersPage:  React.FC = () => {
  const { cashiers, loading } = useCashiers(); // properly type string


  const columns = [
    {title: 'Name', dataIndex: 'name'},
    {title: 'Shift', dataIndex: 'shift'}
  ]
  
  return(
    
    <>
      <AddDrawer />
      <CashiersTable cashiers={cashiers} columns={columns} />

    </>

  );
}

export default CashiersPage;