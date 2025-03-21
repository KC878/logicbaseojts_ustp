import { useEffect, useState } from 'react';

const useCashiers = () => {
  const [cashiers, setCashiers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchCashiers = async () => {
      try {
        const res = await fetch('/api/getCashierInfo');
        if (!res.ok) throw new Error('Failed to fetch cashiers');

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

  return { cashiers, loading };
};

export default useCashiers;