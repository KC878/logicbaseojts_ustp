'use client'

import { useState, useEffect } from 'react';
import CashierInfoTable from '../../../utils/WorkingComponents/CashiersTable';
import MyModal from '../../../utils/WorkingComponents/AddCashierModal';

// Define a type for Cashier data
interface Cashier {
  id: number; // Unique identifier
  name: string;
  shift: string;
  key: number; // Ensures unique key for each row
}

const CashiersPage = () => {
  const [cashiers, setCashiers] = useState<Cashier[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<{ current: number; pageSize: number; total: number }>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchCashiers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/getCashierInfo');
      const data: Cashier[] = await res.json();

      const formattedData = data.map((cashier, index) => ({
        ...cashier,
        key: cashier.id || index, // Ensure unique key
      }));

      setCashiers(formattedData);
      setPagination(prev => ({
        ...prev,
        total: formattedData.length ?? 0, // Ensures total is always a number
      }));

      
    } catch (error) {
      console.error('Failed to fetch cashiers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCashiers();
  }, []);
  
  return (
    <>
      <MyModal refreshCashiers={fetchCashiers} />
      {loading ? <p>Loading...</p> : (
        <CashierInfoTable cashiersData={cashiers} pagination={pagination} setPagination={setPagination} />
      )}
    </>
  );
};

export default CashiersPage;
