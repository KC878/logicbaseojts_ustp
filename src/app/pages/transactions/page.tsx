
'use client'


import TransactionsTable from "@src/components/TransactionsTable";

import AddDrawer from "@src/components/AddDrawer";

const TransactionsPage = () => {


  return(

    <>
      <AddDrawer drawerName='Add Transactions' width='30%'>
      {'Form Component Here'}
      </AddDrawer>
      <TransactionsTable /> 
    </>
    
  );
}

export default TransactionsPage;