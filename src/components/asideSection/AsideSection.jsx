import {useContext, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {CustumContext} from '../../hookHelper/Context';

import {dataColors} from "../../constants/dataColors";


import './AsideSection.scss';


const AsideSection = () => {  
    const {userState, setUserState} = useContext(CustumContext);
    const {status, setStatus} = useContext(CustumContext);

    const [active, setActive] = useState(false);
    const [color, setColor] = useState(dataColors[0]);
    
    const [category, setCategory] = useState();
    const [categoryState, setCategoryState] = useState("");
      
    const addCategoty = () => {         
    let newCategory = {
            categoryName: category,
            id: uuidv4(),
            color,
            tasks: []            
    };

        const stateCategory = JSON.parse(localStorage.getItem("user")) ;      
             
        const result = stateCategory.categories.find(elem => {
        return elem.categoryName === category
        });
   
        axios.patch(`http://localhost:8080/users/${userState.id}`, { 
            categories: [
                ...userState.categories,
                newCategory
            ]})  
        .then(({data}) => {           
            if(result || category.length > 15) {
                setCategoryState("Такая категория уже есть, или количество символов превышает 15 !!!");                 
                return; 

            } else {
                setCategoryState("")
            }
            
            setUserState({
                ...data,
                token: useState.token
            }) 
            localStorage.setItem("user", JSON.stringify({
                ...data,
                token: useState.token
            }))           
            setActive(false);
            setCategory("");
            toast("Категория добавлена!!!")
        }).catch(err => toast(`Категория не добавлена!!!, ${err.message}`))       
    };

    const subMit = (e) => {
        setCategory(e.target.value);
    };

    const logOutUser = () => {
        localStorage.removeItem("user");
        setUserState([])
    };


    const deleteCategory = (id) => {       
        let newArrayCategories = userState.categories.filter((elem) => 
        elem.id !== id);   
        
        axios.patch(`http://localhost:8080/users/${userState.id}`, {categories:newArrayCategories})
            .then(({data}) => {
                setUserState({
                    ...data,
                    token: useState.token
                }) 
                localStorage.setItem("user", JSON.stringify({
                    ...data,
                    token: useState.token
                }))  
                toast("Категория удалена!!!")
            })
            .catch(err => toast(`Категория не удалена!!!, ${err.message}`))
        }
            
     return (
        <div className='aside-container'>
            <button 
                className='aside-container__out'
                onClick={logOutUser}>Выйти</button>
            <div className={status.length !== undefined ? 'active' : 'aside-container__main'}>               
                <span 
                    className='container-container__tasksAll'
                    onClick={() => setStatus(userState.categories.map(elem => elem))}>📝Все задачи</span>
            </div>

            
            <ul className='aside-container__menu'> 
                {   (userState.length === 0) ? (<Navigate to="/"/>) :
                    userState.categories.map(elem => (               
                        <li 
                            key={elem.id}                            
                            onClick={() => setStatus(elem)}
                            className={status === elem.categoryName ? 'active1' :'aside-container__menu__li'}>                       
                        <span className='aside-container__menu__li__color' style={{background: elem.color}}></span>
                        <span className='container-container__tasks'>{elem.categoryName}</span>
                        <span 
                            className='aside-container__menu__li__del'
                            onClick={() => deleteCategory(elem.id)}>✖️</span>
                        </li>  
                    ))
                }       
            </ul>           

            <div className='aside-container__create'>               
                <span 
                    className={active ? 'aside-container__creater__tasksAll' : 'container__creater__tasksAll'}  
                    onClick={() => setActive(true)}>➕Добавить категорию</span>
               
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
};

export default AsideSection;