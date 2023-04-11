import {Routes, Route} from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { CustumContext } from './hookHelper/Context';

import HomePage from './container/homePage';
import LoginPage from './container/loginPage';
import RegisterPage from './container/registerPage';


import './App.scss';

function App() {  
  const {userState, setUserState} = useContext(CustumContext);
  

  useEffect(() => {
    if(localStorage.getItem("user") !== null) {
      setUserState(JSON.parse(localStorage.getItem("user")))
    }
  },[])
   


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
