import React, { useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

import { useCashierPagination } from '@src/hooks/useCashierPagination';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface Cashiers {
  no: string,
  name: string,
  shift: string,
  startDate: string,
  endDate: string, // this is rendering part 
  isActive: string
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

  const { userCurrent, setUserCurrent } = useCashierPagination();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };


  const dataSource: Cashiers[] = cashiers.map((cashier, index) => ({
    key: index.toString(),
    no: index + 1 + '. ', // start at 1
    name: cashier.name,
    shift: cashier.shift,
    startDate: cashier.startDate.slice(0, 10),
    endDate: cashier.endDate.slice(0, 10),
    isActive: (cashier.isActive ? 'Active' : 'In-active')
  }));


  console.log(dataSource);

  // const rowSelection: TableRowSelection<Cashiers> = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  //   selections: [
  //     Table.SELECTION_ALL,
  //     Table.SELECTION_NONE,
  //     {
  //       key: 'odd',
  //       text: 'Select Odd Row',
  //       onSelect: (changeableRowKeys) => {
  //         let newSelectedRowKeys = [];
  //         newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
  //           if (index % 2 !== 0) {
  //             return false;
  //           }
  //           return true;
  //         });
  //         setSelectedRowKeys(newSelectedRowKeys);
  //       },
  //     },
  //     {
  //       key: 'even',
  //       text: 'Select Even Row',
  //       onSelect: (changeableRowKeys) => {
  //         let newSelectedRowKeys = [];
  //         newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
  //           if (index % 2 !== 0) {
  //             return true;
  //           }
  //           return false;
  //         });
  //         setSelectedRowKeys(newSelectedRowKeys);
  //       },
  //     },
  //   ],
  // };

  return (
    <Table<Cashiers> 
      // ssrowSelection={rowSelection} 
      columns={columns} 
      dataSource={dataSource}
      bordered
      pagination={{
        current: userCurrent,
        onChange: setUserCurrent // setUser Pagination so that when rendered it will persist on to that page
      }}
    />

  
  );
  
};

export default CashiersTable;