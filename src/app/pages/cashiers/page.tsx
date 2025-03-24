'use client'


import useCashiers from '@src/hooks/useCashiers'; // useHooks from now On to Get data

import CashiersTable from '@src/components/CashiersTable';

const CashiersPage:  React.FC = () => {
  const { cashiers, loading } = useCashiers(); // properly type string



  const columns = [
    {title: 'Name', dataIndex: 'name'},
    {title: 'Shift', dataIndex: 'shift'}
  ]
  
  return(
    
    <>  
      <CashiersTable cashiers={cashiers} columns={columns} />

    </>

  );
}

export default CashiersPage;