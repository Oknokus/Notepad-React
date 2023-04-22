import {Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { CustumContext } from '../../hookHelper/Context';

import AsideSection  from "../../components/asideSection";
import AsideSectionContent from "../../components/asideSection/asideSectionContent";

import {ToastContainer} from 'react-toastify';


import './HomePage.scss';


const HomePage = () => {   
    const {userState, status} = useContext(CustumContext); 
      
    if(userState.length === 0) {
        return <Navigate to="/register"/>
    };
 
     return (  
        <>     
            <div className='homepage-container'>
                <AsideSection />            
                <ToastContainer/>
                
                <div>
                    {
                        status.length !== undefined ? (
                            userState.categories.map((elem => 
                                <AsideSectionContent key={elem.id}  statusName={elem}/> ))) 
                                : 
                            <AsideSectionContent statusName={status}/>
                    }   
                </div> 
            </div>   
        </> 
        )
};


export default HomePage;