import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { CustumContext } from '../../hookHelper/Context';

import {dataColors} from "../../constants/dataColors";


import styles from './AsideSection.scss';


const AsideSection = () => {
    const {user} = useContext(CustumContext);
    const [active, setActive] = useState(false);
    const [color, setColor] = useState(dataColors[0]);
    const [category, setCategory] = useState([]);
    // const [localStorageStore, setLocalStorageStore] = useState()
   
    const localStorageStore = localStorage.getItem(user);
 
    const addCategoty = () => {         
        let newCategory = ({
            category,
            id: uuidv4(),
            color,
            tasks: []            
        });

        axios.get(`http://localhost:8080/posts`, {            
                ...newCategory
            }           
        )
        .then(res => {
            const result = res.adapter.map(elem => {
               
            })
        } 
        )
    }

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
                    <input value={category} onChange={(e) => setCategory(e.target.value)}  className='aside-container__create__editor__input' type="text" placeholder='Название категории' />
                    
                    <div className='aside-container__create__editor__colors'>
                        {dataColors.map(elem => 
                            <span onClick={() => setColor(elem)} className='aside-container__create__editor__color' 
                                key={elem} style={{background: elem, border: color === elem ? "4px solid black" : "none"}}></span>
                        )}
                    </div>

                    <button onClick={addCategoty} className='aside-container__create__editor__btn'>Добавить</button>
                    <span 
                        className='aside-container__create__editor__close'
                        onClick={() => setActive(false)}>✖️</span>
                </div>
            </div>
        </div>
    )
}

export default AsideSection;