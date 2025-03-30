'use client'


import React, { useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

import { useCashierPagination } from '@src/hooks/useCashierPagination';




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


const transactions: TransactionsType[] = [
  { key: "1", particulars: "CASH"}, //{can you insert some code here like to loop throught? througout the rows? }
  { key: "2", particulars: "BPI CREDIT CARD"},
  { key: "3", particulars: "PAY MAYA"},
  { key: "4", particulars: "GCASH"},
  { key: "5", particulars: "FOOD PANDA"},
  { key: "6", particulars: "STREETBY"},
  { key: "7", particulars: "GRAB FOOD"},
  { key: "8", particulars: "SUB TOTAL TRADE POS"},
  
];

const TransacionsTable: React.FC<TransactionsType> = () => {
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // const { userCurrent, setUserCurrent } = useCashierPagination();

  // const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
  //   console.log('selectedRowKeys changed: ', newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };


  // const dataSource: TransactionsType[] = transactions.map((item, index) => ({
  //   key: index.toString(),
  // }));


  // console.log(dataSource);

  return (
    <Table
      // ssrowSelection={rowSelection} 
      columns={columns} 
      dataSource={transactions}
      bordered
      // pagination={{
      //   current: userCurrent,
      //   onChange: setUserCurrent // setUser Pagination so that when rendered it will persist on to that page
      // }}
    />

  
  );
  
};

export default TransacionsTable;