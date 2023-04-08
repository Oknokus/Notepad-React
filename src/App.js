import {Routes, Route} from 'react-router-dom';

import HomePage from './container/homePage';
import LoginPage from './container/loginPage';
import RegisterPage from './container/registerPage';


import './App.scss';

function App() {
  return (
    <div>
      <Routes>        
        <Route path='register' element={<RegisterPage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='/' element={<HomePage/>}/>
      </Routes>          
    </div>    
  );
}

export default App;
