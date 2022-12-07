import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import Footer from './components/Footer';
import Header from './components/Header';
import EmployeeUpdate from './components/EmployeeUpdate';

function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<EmployeeList/>}/>
          <Route path="/add-employee" element={<EmployeeCreate/>}/>
          <Route path="/update-employee/:id" element={<EmployeeUpdate/>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>

  );
}

export default App;
