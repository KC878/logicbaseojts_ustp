
'use client'


import TransactionsTable from "@src/components/TransactionsTable";

import AddDrawer from "@src/components/AddDrawer";
import TransactionForm from "@src/components/TransactionForm";

const TransactionsPage = () => {


  return(

    <>
      
      <AddDrawer drawerName='Add Transactions' width='30%'>
        <TransactionForm />
      </AddDrawer>
      <TransactionsTable /> 
    </>
    
  );
}

export default TransactionsPage;