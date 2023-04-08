import PropTypes from 'prop-types';
import { useContext } from 'react';

import {CustumContext} from "../../hookHelper/Context";

import AsideSection  from "../../components/asideSection/AsideSection"



import styles from './HomePage.scss';


const HomePage = () => { 
    const {user} = useContext(CustumContext);
    console.log("StorageUsers", localStorage.getItem(user));   
    
    
    return (
        <>
            <AsideSection />

                      
           
       </>
    )
}

export default HomePage;