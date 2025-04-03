
import { useEffect, useState } from 'react';

type Cashier = {
  id: string;
  name: string;
}

export const getCashiersName = () => {

  const [cashiersName, setCashiersName] = useState<Cashier[]>([]);

  const [loading, setLoading] = useState<boolean>(false); // Loading state for the fetch request
  const [error, setError] = useState<string | null>(null); // Error state for handling API errors

  useEffect(() => {
    const fetchCashiersName = async () => {
      setLoading(true); // Start loading when fetching
      setError(null); //reset error before fetching

      try {
        const res = await fetch('/api/GET/getCashiersName');
        if (!res.ok) throw new Error('Failed to fetch cashiers');
        
        const data: Cashier[] = await  res.json(); 

        setCashiersName(data);

        //data[i].name

      } catch (error) {
        // Handle errors and set the error state
        console.error('Error Fetching cashiers: ', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false); // end loading
      }
    };

    fetchCashiersName(); // Call the async function when the component mounts
    
  }, []);  // don't assign listener yet

  return {
    cashiersName,
    loading,
    error,
  }

};
