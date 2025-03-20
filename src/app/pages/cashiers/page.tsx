'use client'

import { useState, useEffect } from 'react';
import CashierInfoTable from '../../../components/CashiersTable';
import MyModal from '../../../components/AddCashierModal';

const CashiersPage = () => {
  const [cashiers, setCashiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 }); // ✅ Store pagination state

  const fetchCashiers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/getCashierInfo');
      const data = await res.json();
      setCashiers(data);
    } catch (error) {
      console.error('Failed to fetch cashiers:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCashiers();
  }, []);

  return (
    <>
      <MyModal refreshCashiers={fetchCashiers} />
      {loading ? <p>Loading...</p> : <CashierInfoTable cashiersData={cashiers} pagination={pagination} setPagination={setPagination} />}
    </>
  );
};

export default CashiersPage;
