import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CustumContext } from '../../hookHelper/Context';

import checked from "../uiCheckBox/imageCheckBox/checked.png"
import notChecked from "../uiCheckBox/imageCheckBox/notChecked.png"

import './UiCheckBox.scss';



const UiCheckBox = ({isComplete}) => { 
    const {setIsComplete} = useContext(CustumContext)
    console.log(setIsComplete)
    return (        
        <div 
            className='checkbox-container'
            onClick={() => setIsComplete((prev) => !prev)}>
            {!isComplete ? 
                <img className='checkbox-container__img' src={notChecked} alt="notChecked" />
            
            :
            <img className='checkbox-container__img' src={checked} alt="checked" />
        }
        </div>
    )
}

UiCheckBox.ropTypes = {
    isComplete:PropTypes.bool
}

export default UiCheckBox;