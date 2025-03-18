import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

// 1. Define the TypeScript interface for the data returned by the API
interface PosData {
  id: number; // Unique identifier for each row
  cashierName: string;
  cashierShift: 'AM' | 'MID' | 'PM';
  paymentType: string;
  date: string; // You can parse it as Date if needed
  amount: number;
  total_trade_pos: number | null;
  total_non_trade_pos: number | null;
  grand_total: number | null;
  z_reading_pos: number | null;
  shortOverAmount: number | null;
}

const App: React.FC = () => {
  const [data, setData] = useState<PosData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 2. Fetch data from the API endpoint when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getCashiersInfo');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching POS data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 3. Define the columns for the Ant Design Table
  const columns: ColumnsType<PosData> = [
    {
      title: 'Cashier Name',
      dataIndex: 'cashierName',
      key: 'cashierName',
    },
    {
      title: 'Shift',
      dataIndex: 'cashierShift',
      key: 'cashierShift',
    },
    {
      title: 'Payment Type',
      dataIndex: 'paymentType',
      key: 'paymentType',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (value) => <span>{value}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (value) => value?.toLocaleString(),
    },
    {
      title: 'Total Trade POS',
      dataIndex: 'total_trade_pos',
      key: 'total_trade_pos',
      render: (value) => (value !== null ? value.toLocaleString() : ''),
    },
    {
      title: 'Total Non-Trade POS',
      dataIndex: 'total_non_trade_pos',
      key: 'total_non_trade_pos',
      render: (value) => (value !== null ? value.toLocaleString() : ''),
    },
    {
      title: 'Grand Total',
      dataIndex: 'grand_total',
      key: 'grand_total',
      render: (value) => (value !== null ? value.toLocaleString() : ''),
    },
    {
      title: 'Z Reading POS',
      dataIndex: 'z_reading_pos',
      key: 'z_reading_pos',
      render: (value) => (value !== null ? value.toLocaleString() : ''),
    },
    {
      title: 'Short/Over Amount',
      dataIndex: 'shortOverAmount',
      key: 'shortOverAmount',
      render: (value) => (value !== null ? value.toLocaleString() : ''),
    },
  ];

  // 4. Render the Table
  return (
    <Table<PosData>
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.id.toString()} // Use the unique "id" field
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default App;
