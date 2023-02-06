import './App.css';
import { EmployeeManagement } from './features/absence-management/absencesManagement';


function App() {
  return (
    <div className="App px-4">
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
