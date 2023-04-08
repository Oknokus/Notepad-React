import PropTypes from 'prop-types';
import { useContext } from 'react';

import { CustumContext } from '../../hookHelper/Context';

import FormRegister from '../../components/formRegister';


import styles from './LoginPage.scss';


const LoginPage = () => {
    return (       
        <FormRegister /> 
    )
}


export default LoginPage;