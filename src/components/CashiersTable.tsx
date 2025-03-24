import React, { useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';



type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface Cashiers {
  name: string,
  shift: string,
}

interface Columns {
  title: string,
  dataIndex: string,
}
// Cashiers Props
interface CashiersProps {
  cashiers: Cashiers[],
  columns: Columns[]
}




const CashiersTable: React.FC<CashiersProps> = ( { cashiers, columns} ) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };


  const dataSource: Cashiers[] = cashiers.map((cashier, index) => ({
    key: index.toString(),
    name: cashier.name,
    shift: cashier.shift,
  }));


  const rowSelection: TableRowSelection<Cashiers> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return <Table<Cashiers> rowSelection={rowSelection} columns={columns} dataSource={dataSource} />;
};

export default CashiersTable;