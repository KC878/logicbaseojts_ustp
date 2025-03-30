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