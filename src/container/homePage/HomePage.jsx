import { Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { CustumContext } from '../../hookHelper/Context';

import AsideSection  from "../../components/asideSection";
import AsideSectionContent from "../../components/asideSection/asideSectionContent";

import {ToastContainer} from 'react-toastify';


import './HomePage.scss';


const HomePage = () => { 
    const {setStatus, status, userState} = useContext(CustumContext);
   
    const stateCategory = JSON.parse(localStorage.getItem("user"));
    if(stateCategory === null) {
        return <Navigate to="/register"/>
    };
     
    return (
        <div className='homepage-container'>
            <AsideSection />            
            <ToastContainer/>

            {
                userState.length !== 0 && status === "All" ? userState.categories.map((elem) => (
                   
                     <AsideSectionContent key={elem.id} status={elem.categoryName}/>
                )) : <AsideSectionContent status={status}/>
            }            
       </div>
    )
};

export default HomePage;