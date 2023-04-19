import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { CustumContext } from '../../../hookHelper/Context';


import styles from './AsideSectionContent.scss';



const AsideSectionContent = ({status}) => { 
    const{userState} = useContext(CustumContext);
   
   
    return (   
        
        
        <div className='header-content'> 
            <ul>
                <li>
                    {status}
                </li>          
                                  
            </ul>
        </div>
    )
}
export default AsideSectionContent;