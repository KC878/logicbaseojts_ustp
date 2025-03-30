// 'use client'


// import React, { useState } from 'react';
import { Table } from 'antd';
// import type { TableProps } from 'antd';

// import { useCashierPagination } from '@src/hooks/useCashierPagination';




interface Employee {
  name: string;
  salary: number;
}

interface Manager {
  department: string;
}

type EmployeeManager = Employee & Manager;

let manager: EmployeeManager = {
  name: "Alice",
  salary: 50000,
  department: "HR",
}; // ill be using this, a combination 



// props 
interface TransactionsType {
  key: string;
  particulars: string;
  // am: string | number;
  // mid: string | number;
  // pm: string | number;
  // grossTotal: number;
  // netTotal: number;
}

interface Columns {
  title: string,
  dataIndex: string,
}


const columns: Columns[] = [
  { title: 'PARTICULARS', dataIndex: 'particulars' },
  { title: 'AM', dataIndex: 'am' },
  { title: 'MID', dataIndex: 'mid' },
  { title: 'PM', dataIndex: 'pm' },
  { title: 'GROSS TOTAL', dataIndex: 'grossTotal' },
  { title: 'NET TOTAL', dataIndex: 'netTotal' }, 
];

const particularsData = [
  "CASHIER'S NAME",
  'CASH',
  'CHECK',
  'BPI CREDIT CARD',
  'BPI DEBIT CARD',
  'METRO CREDIT CARD',
  'METRO DEBIT CARD',
  'PAY MAYA',
  'AUB CREDIT CARD',
  'GCASH',
  'FOOD PANDA',
  'STREETBY',
  'GRAB FOOD',
  'GC CLAIMED (OTHERS)',
  'GC CLAIMED (OWN)',
  'A/R ______________',
  'A/R ______________',
  'SUB TOTAL TRADE POS'
];


const transactions: TransactionsType[] = particularsData.map((item, index) => ({
  key: index.toString(),
  particulars: item,
}));



const TransactionsTable: React.FC = () => {
  

  return (
    <Table
      // ssrowSelection={rowSelection} 
      columns={columns} 
      dataSource={transactions}
      bordered
      pagination={{
        pageSize: 19
      }}
    />

  
  );
  
};

export default TransactionsTable;