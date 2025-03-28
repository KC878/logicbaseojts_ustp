

import useCashiers from '@src/hooks/useCashiers';

import CashiersTable from '@src/components/CashiersTable';
import AddDrawer from '@src/components/AddDrawer';
import AddDrawerForm from '@src/components/AddDrawerForm';


const CashiersPage: React.FC = () => {
  const { cashiers } = useCashiers();


  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Shift', dataIndex: 'shift' },
    { title: 'Start-Date', dataIndex: 'startDate' },
    { title: 'End-Date', dataIndex: 'endDate' },
    { title: 'Status', dataIndex: 'isActive' }
  ];

  
  return (
    <>
      <AddDrawer>
        <AddDrawerForm />
      </AddDrawer>

      <CashiersTable cashiers={cashiers} columns={columns} />
    </>
  );
};

export default CashiersPage;
