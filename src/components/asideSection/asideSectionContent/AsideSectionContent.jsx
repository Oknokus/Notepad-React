import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CustumContext } from '../../../hookHelper/Context';


import styles from './AsideSectionContent.scss';



const AsideSectionContent = ({status}) => {  
    console.log(status)
    return (
        
        <>
            <h2>{status}</h2>
        </>
    )
}
export default AsideSectionContent;