import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { CustumContext } from '../../../hookHelper/Context';
import {useForm} from 'react-hook-form';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UiCheckBox from '../../uiCheckBox/UiCheckBox';


import './AsideSectionContent.scss';


const AsideSectionContent = ({statusName}) => {
       const {
        categoryName,
        id,
        tasks
       } = statusName;

       const{show, setShow, status, userState, setUserState} = useContext(CustumContext);
    
       const {
        register,
        reset,
        handleSubmit,
            formState: {
                errors
        }
    } = useForm({mode: "onblur"});


        const addTasks = (data) => {
            let newTask = {
            ...data,
            id: uuidv4(),
            isComplete: false
       
        };       
            let newCategory = userState.categories.map((elem) => {
                if(elem.categoryName === statusName.categoryName) {                
                    return ({...elem, tasks: [...elem.tasks, newTask]})
                } 
            });    

            
        axios.patch(`http://localhost:8080/users/${userState.id}`, {            
                categories: [                                      
                   ...newCategory,                             
                ]})  
            .then(({data}) => {
                setUserState({
                    ...data,
                    newCategory                    
                })


                reset();
                setShow(false);
            
               
                toast("Категория добавлена!!!")
            }).catch(err => toast(`Категория не добавлена!!!, ${err.message}`))
         
    }

         
     
    return ( 
        <div className='header-content'> 
            <ul 
                className='header-content__ul'
                key={id}>                
                <li 
                    className='header-content__title'>
                    {categoryName}
                    <span className='header-content__edit'>🖉</span>                    
                </li> 
                    {
                    tasks.length !== 0 ? 
                    tasks.map((elem, index )=>
                        <span 
                            className='header-content__tasks'
                            key={index}>
                            <UiCheckBox isComplete={elem.isComplete} />
                            {elem.taskTitle}
                        </span>)
                        :
                        ""
                    }
                    
                    {
                        show ? 
                            (<label className='header-content__formAdd'>
                              
                              <span >{errors.taskTitle && errors.taskTitle.message}</span> 
                                <form noValidate onSubmit={handleSubmit(addTasks)}>  
                                                                 
                                    <input {...register("taskTitle", {
                                        required : {
                                            message: "Заполните название задачи!!!",
                                            value: true
                                        },
                                        maxLength : {
                                            message: "Максимальное число символов 10",
                                            value: 10 
                                        }, 
                                        minLength : {
                                            message: "Минимальное число символов 3",
                                            value: 3
                                        }
                                        })} 
                                    className='header-content__input' type="text" placeholder='Текст задачи'/>
                                   
                                    
                                    <div>
                                        <button className='header-content__btnAdd'>Добавить задачу</button>
                                        <button 
                                            className='header-content__close'
                                            onClick={() => setShow(false)}>Отмена</button>
                                    </div>
                                </form>
                             </label>)
                            :                            
                            (<div className='header-content__button'>
                                <span 
                                    className='header-content__button_add'
                                    onClick={() => setShow(true)}>➕</span>
                                <button 
                                    className='header-content__button_buttonAdd'
                                    onClick={() => setShow(true)}>Новая задача</button>
                            </div>)
                    }
            </ul>   
        </div>
    )
}

AsideSectionContent.propTypes = {
    statusName:PropTypes.object
}

export default AsideSectionContent;