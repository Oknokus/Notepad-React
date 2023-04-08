import PropTypes from 'prop-types';
import { useState } from 'react';

import {dataColors} from "../../constants/dataColors";


import styles from './AsideSection.scss';


const AsideSection = () => {
    const [active, setActive] = useState(false)
    return (
        <div className='aside-container'>
            <div className='aside-container__main'>               
                <span className='container-container__tasksAll'>📝Все задачи</span>
            </div>

            <ul className='aside-container__menu'>
                <li className='aside-container__menu__li'>
                    <span className='aside-container__menu__li__color' style={{background: "red"}}></span>
                    <span className='container-container__tasks'>Покупки</span>
                </li>

                <li className='aside-container__menu__li'>
                    <div className='aside-container__menu__li__color' style={{background: "red"}}></div>
                    <span className='container-container__tasks'>Покупки</span>
                </li>

                <li className='aside-container__menu__li'>
                    <div className='aside-container__menu__li__color' style={{background: "red"}}></div>
                    <span className='container-container__tasks'>Покупки</span>
                </li>

                <li className='aside-container__menu__li'>
                    <div className='aside-container__menu__li__color' style={{background: "red"}}></div>
                    <span className='container-container__tasks'>Покупки</span>
                </li>

                <li className='aside-container__menu__li'>
                    <div className='aside-container__menu__li__color' style={{background: "red"}}></div>
                    <span className='container-container__tasks'>Покупки</span>
                </li>
            </ul>

            <div className='aside-container__create'>               
                <span 
                    className='aside-container__creater__tasksAll'
                    onClick={() => setActive(true)}>➕Добавить категорию</span>

                <div style={{display: active ? "block" : "none"}}  className='aside-container__create__editor'>
                    <input className='aside-container__create__editor__input' type="text" placeholder='Название категории' />
                    
                    <div className='aside-container__create__editor__colors'>
                        {dataColors.map(elem => 
                            <span className='aside-container__create__editor__color' 
                                key={elem} style={{background: elem}}></span>
                        )}
                    </div>

                    <button className='aside-container__create__editor__btn'>Добавить</button>
                    <span 
                        className='aside-container__create__editor__close'
                        onClick={() => setActive(false)}>✖️</span>
                </div>
            </div>
        </div>
    )
}

export default AsideSection;