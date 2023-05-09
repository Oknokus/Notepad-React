import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { CustumContext } from '../../../hookHelper/Context';

import {dataColors} from "../../../constants/dataColors";

import './AsideCreateCategory.scss';


const AsideCreateCategory = ({subMit, addCategoty, setActive, active}) => {
    const {
        categoryState,
        category
    } = useContext(CustumContext);
      
        const [color, setColor] = useState(dataColors[0]);
     
    return (
        <div className='aside-container__create'>               
                <span 
                    className={active ? 'aside-container__creater__tasksAll' : 'container__creater__tasksAll'}  
                    onClick={() => setActive(true)}>➕Добавить категорию
                </span>
               
                    <div style={{display: active ? "block" : "none"}}  className='aside-container__create__editor'>
                            <label className='register-container__form__label'>
                                <span className='login-container__form__errors'>{categoryState}</span> 
                                <input 
                                    value={category} onChange={subMit}
                                    className='aside-container__create__editor__input' type="text" placeholder='Название категории' />
                            </label>

                            <div className='aside-container__create__editor__colors'>
                                {dataColors.map(elem => 
                                    <span onClick={(e) => setColor(elem)} className='aside-container__create__editor__color'                                     
                                        key={elem} style={{background: elem, border: color === elem ? "4px solid black" : "none"}}>
                                    </span>)}
                            </div>

                            <button onClick={() => addCategoty()} className='aside-container__create__editor__btn'>
                                Добавить
                            </button>

                            <span 
                                className='aside-container__create__editor__close'
                                onClick={() => setActive(false)}>
                                    ✖️
                            </span>
                    </div>
        </div> 
    )
};

AsideCreateCategory.propTypes = {
    subMit:PropTypes.func,  
    addCategoty:PropTypes.func, 
    setActive:PropTypes.func, 
    active:PropTypes.bool
};


export default AsideCreateCategory;