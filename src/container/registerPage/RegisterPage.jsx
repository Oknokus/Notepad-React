import { useContext } from 'react';
import { CustumContext } from '../../hookHelper/Context';

import FormRegister from '../../components/formRegister';

import './RegisterPage.scss';


const RegisterPage = () => { 
    return (
        <FormRegister />        
    )
}

export default RegisterPage;