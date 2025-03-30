import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

// Define the data structure
interface TransactionsType {
  key: string;
  particulars: string;
  am?: number;
  mid?: number;
  pm?: number;
  grossTotal?: number;
  netTotal?: number;
}

// Define column headers dynamically
const columnTitles = [
  { title: "PARTICULARS", dataIndex: "particulars", fixed: "left", width: 200 },
  { title: "AM", dataIndex: "am" },
  { title: "MID", dataIndex: "mid" },
  { title: "PM", dataIndex: "pm" },
  { title: "GROSS TOTAL", dataIndex: "grossTotal", fixed: "right" },
  { title: "NET TOTAL", dataIndex: "netTotal", fixed: "right" },
];

// Generate columns dynamically
const columns: ColumnsType<TransactionsType> = columnTitles.map((col) => ({
  title: col.title,
  dataIndex: col.dataIndex,
  key: col.dataIndex,
  fixed: col.fixed,
  width: col.width || 150,
  align: typeof col.fixed === "undefined" ? "right" : "left",
}));

// Base transaction rows (PARTICULARS is immutable)
const baseTransactions: TransactionsType[] = [
  { key: "1", particulars: "CASH" },
  { key: "2", particulars: "BPI CREDIT CARD" },
  { key: "3", particulars: "PAY MAYA" },
  { key: "4", particulars: "GCASH" },
  { key: "5", particulars: "FOOD PANDA" },
  { key: "6", particulars: "STREETBY" },
  { key: "7", particulars: "GRAB FOOD" },
  { key: "8", particulars: "SUB TOTAL TRADE POS" },
];

// Loop through baseTransactions and add random transaction values
const transactions: TransactionsType[] = baseTransactions.map((row) => ({
  ...row,
  am: Math.random() > 0.5 ? Math.floor(Math.random() * 50000) : undefined,
  mid: Math.random() > 0.5 ? Math.floor(Math.random() * 5000) : undefined,
  pm: Math.random() > 0.5 ? Math.floor(Math.random() * 30000) : undefined,
  grossTotal: Math.floor(Math.random() * 100000),
  netTotal: Math.floor(Math.random() * 95000),
}));

const CashierTable: React.FC = () => {
  return (
    <Table
      columns={columns}
      dataSource={transactions}
      bordered
      pagination={false}
      scroll={{ x: "max-content" }}
    />
  );
};

export default CashierTable;

// immutable table