

import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';




const CashierInfoTable: React.FC = ( { cashiersData }) => {

  interface DataType {
    key: number;
    name: string;
    shift: string;
  }
  
  const columnTitles = ['Name', 'Shift'];
  
  const columns: TableProps<DataType>['columns'] = columnTitles.map((columnTitle, index) => ({
    title: columnTitle,
    dataIndex: columnTitle.toLowerCase(),
    key: index,
  }));
  
  
  
  
  const data: DataType[] = cashiersData.map((item, index) => ({
    key: index,
    name: item.name,
    shift: item.shift
  })); 

  return(
    <Table<DataType> columns={columns} dataSource={data} />
  );
}

export default CashierInfoTable;