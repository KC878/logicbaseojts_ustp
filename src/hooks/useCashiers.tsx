import { useEffect, useState } from 'react';


const useCashiers = () => {
  const [cashiers, setCashiers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => setRefreshTrigger((prev) => prev + 1);


  useEffect(() => {

    const fetchCashiers = async () => {
      try {
        setLoading(true); // add loading state
        const res = await fetch('/api/getCashiers');
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
  }, [refreshTrigger]);
  
  console.log(cashiers);
  return { 
    cashiers, 
    loading,
    triggerRefresh,
     // expose function 
  
  };
};

export default useCashiers;