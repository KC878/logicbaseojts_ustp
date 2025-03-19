
'use client'

import TableCashiers from '../../../components/TableCashiers';

import useCashiers from '../../../hooks/useCashier'; // custom hook


const CashiersPage = () => {
  const { cashiers, loading } = useCashiers();
  return (
    <>
      <div> Cashiers </div>
      {loading ? <p> Loading.. </p> :
        <TableCashiers cashiersData = {cashiers}/>
      }
      
    </>
  )
}

export default CashiersPage;
// no design format -- just get