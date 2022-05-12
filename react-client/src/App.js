import './App.css';

import {Home} from './components/Home';
import {Department} from './components/Department';
import {Employee} from './components/Employee';
import {Navigation} from './components/Navigation';

import {BrowserRouter} from 'react-router-dom';
import {Route, Routes} from 'react-router';



function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className='m-4 d-flex justify-content-center'>
        Офіційний сайт MyCompany
      </h3>
      <Navigation />      
      <Routes>
        <Route path='/' element={<Home/>} exact />
        <Route path='/departments' element={<Department/>}/>
        <Route path='/employee' element={<Employee/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
