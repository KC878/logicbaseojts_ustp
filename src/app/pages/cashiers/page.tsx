
'use client'

import TableCashiers from '../../../components/TableCashiers';

import { useEffect, useState } from 'react';

const CashiersPage = () => {
  const [cashiers, setCashiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchCashiers = async () => {
      try {
        const res = await fetch('/api/getCashierInfo');
        
        if(!res.ok) throw new Error('Failed to fetch cashiers');

        const data = await res.json();
        setCashiers(data);
      } catch (error) {
        console.error('Error Fetching cashiers: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCashiers();
  }, []);

  const data = [
    {key: 1, name: 'John Brown', shift: 'AM'},
    {key: 2, name: 'Jayden Black', shift: 'PM'}
  ];

  return (
    <>
      <div> Cashiers </div>
      {loading ? <p> Loading.. </p> :
        <TableCashiers contentData = {cashiers}/>
      }
      
    </>
  )
}

export default CashiersPage;
// no design format -- just get