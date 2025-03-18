'use client'

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // fetc users when the page loads
  useEffect(() => {
    fetchCashiers();
  }, []); 

  const fetchCashiers = async () => {
    setLoading(true);

    try{
      const res = await fetch('/api/getCashierInfo');
      const data = await res.json();

      setUsers(data);
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
    setLoading(false);
  }


  return (
    <>
      {loading ? <p> Loading... </p> : (
        <ul>

          {users.map((user) => (
            <li key={user.id}>
              {user.name} -- 
              {user.shift}
            </li>

          ))}
        </ul>
      )}
    </>


  );

}


