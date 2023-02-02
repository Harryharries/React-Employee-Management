import './App.css';
import logo from 'statics/smartcode.png'
import { EmployeeManagement } from './features/employee-table/employeeManagement';


function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <body className="App-body">
        <EmployeeManagement></EmployeeManagement>
      </body>
    </div>
  );
}

export default App;
