import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: number; // Ensures unique key for each row
  name: string;
  shift: string;
}

interface PaginationProps {
  pagination: { current: number; pageSize: number; total: number };
  setPagination: React.Dispatch<React.SetStateAction<{ current: number; pageSize: number; total: number }>>;
}

const CashierInfoTable: React.FC<{ 
  cashiersData: DataType[], 
} & PaginationProps> = ({ cashiersData, pagination, setPagination }) => {

  const columns: TableProps<DataType>['columns'] = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Shift', dataIndex: 'shift', key: 'shift' }
  ];

  return (
    <Table<DataType>
      columns={columns}
      dataSource={cashiersData}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total, // Ensure total is always provided
        onChange: (page, pageSize) => setPagination(prev => ({ ...prev, current: page, pageSize })),
      }}
      rowKey="key" // Ensure each row has a unique key
    />
  );
}

export default CashierInfoTable;
