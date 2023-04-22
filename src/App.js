import {Routes, Route} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';


import {CustumContext} from './hookHelper/Context';

import HomePage from './container/homePage';
import LoginPage from './container/loginPage';
import RegisterPage from './container/registerPage';


import './App.scss';


function App() {  
    const {setUserState, setStatus, userState, status} = useContext(CustumContext);    
  
    useEffect(() => {  
        if(localStorage.getItem("user") !== null) {
          setUserState(JSON.parse(localStorage.getItem("user")))         
        }        
    },[])

    if(userState.length) {
      setStatus(useState.categories.map(element => element.categoryName))
    }


  return (   
      <Routes>        
        <Route path='register' element={<RegisterPage userState={userState} status={status} />}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='/' element={<HomePage/>}/>
      </Routes> 
  );
}

export default App;
