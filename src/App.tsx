import './App.css';
import { EmployeeManagement } from './features/employee-table/employeeManagement';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        Absences Management
      </header>
      <div className="App-body" data-testid="employee-management">
        <EmployeeManagement></EmployeeManagement>
      </div>
    </div>
  );
}

export default App;
