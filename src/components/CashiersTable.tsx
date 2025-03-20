import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: number;
  name: string;
  shift: string;
}
const CashierInfoTable: React.FC<{ 
  cashiersData: DataType[], 
  pagination: { current: number, pageSize: number },
  setPagination: (pagination: { current: number, pageSize: number }) => void
}> = ({ cashiersData, pagination, setPagination }) => {

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
        onChange: (page, pageSize) => setPagination({ current: page, pageSize }), // ✅ Maintain pagination state
      }}
      rowKey="key"
    />
  );
}

export default CashierInfoTable;
