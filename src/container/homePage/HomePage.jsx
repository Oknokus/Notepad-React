import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import {CustumContext} from "../../hookHelper/Context";

import AsideSection  from "../../components/asideSection";


import styles from './HomePage.scss';


const HomePage = () => { 
    const {userState} = useContext(CustumContext);  
    const navigate = useNavigate();
    console.log(userState.email.length)

    if(userState.email.length === 0) {
       navigate("/login")
    }     

    return (
        <>
            <AsideSection />
       </>
    )
}

export default HomePage;