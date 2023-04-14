import {useContext, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import {useForm} from 'react-hook-form';

import {CustumContext} from '../../hookHelper/Context';

import {dataColors} from "../../constants/dataColors";


import './AsideSection.scss';


const AsideSection = () => {  
    const {userState, setUserState} = useContext(CustumContext);
    const [active, setActive] = useState(false);
    const [color, setColor] = useState(dataColors[0]);
    const [category, setCategory] = useState();

    const {
        register,
        reset,
        handleSubmit,
            formState: {
                errors
        }
    } = useForm({mode: "onblur"})


        const addCategoty = () => {         
        let newCategory = {
            categoryName: category,
            id: uuidv4(),
            color,
            tasks: []            
        };
   
        axios.patch(`http://localhost:8080/users/${userState.id}`, { 
            categories: [
                ...userState.categories,
                newCategory
            ]})  
        .then(({data}) => {          
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
        })       
    };

    const subMit = (e) => {
        setCategory(e.target.value)
       
        
    }

    const stateCategory = JSON.parse(localStorage.getItem("user")) ;      
        const result = stateCategory.categories.find(elem => {
            return elem.categoryName === category 
        });

    //    if(result) {
    //     console.log("Такая категория уже есть!!!")        
    //     setCategory("");
    //    } 


        
    return (
        <div className='aside-container'>
            <div className='aside-container__main'>               
                <span className='container-container__tasksAll'>📝Все задачи</span>
            </div>

            
            <ul className='aside-container__menu'> 
                {   (userState.length === 0) ? (() => addCategoty) :
                    userState.categories.map(elem => (               
                        <li key={elem.id} className='aside-container__menu__li'>
                        <span className='aside-container__menu__li__color' style={{background: elem.color}}></span>
                        <span className='container-container__tasks'>{elem.categoryName}</span>
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

                        <span className='login-container__form__errors'>{errors.name && errors.name.message}</span>
                        <input 
                        // {...register("name", {
                        //     required: {
                        //         message: "Заполните поле",
                        //         value: true
                        //     },
                        //     maxLength : {
                        //         message: "Максимальное число символов 10",
                        //         value: 10 
                        //     },
                        //     minLength : {
                        //         message: "Минимальное число символов 3",
                        //         value: 3
                        //     },
                        //     pattern : {
                        //         message: "Такое имя уже существует",
                        //         value: result 
                        //     }
                        // })} 
                        value={category} onChange={subMit}
                           
                         
                              className='aside-container__create__editor__input' type="text" placeholder='Название категории' />
                        </label>

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