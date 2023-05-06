import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { CustumContext } from '../../../hookHelper/Context';
import {useForm} from 'react-hook-form';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UiCheckBox from '../../uiCheckBox/UiCheckBox';

import checked from "../../uiCheckBox/imageCheckBox/checked.png"
import notChecked from "../../uiCheckBox/imageCheckBox/notChecked.png"


import './AsideSectionContent.scss';


const AsideSectionContent = ({statusName}) => {
    const[show, setShow] = useState(false);  
       
       const {
        categoryName,
        id,
        tasks
       } = statusName;
 
      
        const{
            status,
            setStatus,
            userState,
            setUserState,
            setStateChecBox,
            stateChecBox,
            all,
            setTaskId,
            taskId
        } = useContext(CustumContext); 
       
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
                if(elem.categoryName === categoryName) {                
                    return ({...elem, tasks: [...elem.tasks, newTask]})
                } else {
                    return elem
                }
            });    
            
        axios.patch(`http://localhost:8080/users/${userState.id}`, {            
                categories: [                                      
                   ...newCategory,                             
                ]})  
            .then(({data}) => {                      
                setUserState({
                    ...data                                     
                });
                setStatus({
                    ...status,
                    tasks: [
                    ...status.tasks,
                    newTask]
                });

                localStorage.setItem("user", JSON.stringify({
                    ...data                           
                }))

                reset();
                setShow(false);
            
               
                toast("Задача добавлена!!!")
            }).catch(err => toast(`Задача не добавлена!!!, ${err.message}`))              
        }
        
        const deleteTask = (id) => { 
            let newCategory = userState.categories.map((elem) => {
                if(elem.categoryName === categoryName) {                
                    return ({...elem, tasks: elem.tasks.filter(el => el.id !== id)})
                } else {
                    return elem
                }
            });                                 
                        
            axios.patch(`http://localhost:8080/users/${userState.id}`, {
                categories: [
                    ...newCategory
                ] 
                 
            })
                .then(({data}) => {                                      
                        setUserState({
                            ...data
                        });  
                        setStatus({
                            ...status,                                                        
                            tasks: [  
                                ...status.tasks.filter(el => el.id !== id)
                            ]
                        })                       
                        localStorage.setItem("user", JSON.stringify({
                            ...data,
                            tasks: [
                                newCategory
                            ]                
                        }))
        
                        reset();
                        setShow(false);                  
                 
                    toast("Задача удалена!!!")
                })
                .catch(err => toast(`Задача не удалена!!!, ${err.message}`))
            }    

            const hendleComplete = (id) => {                  
                const taskId = userState.categories.filter(elem => elem.categoryName === categoryName)
                    .map(el => el.tasks.filter(item => item.id == id)
                    .map(init => init.isComplete = stateChecBox));


                let newCategory = userState.categories.filter((elem) => {
                    if(elem.categoryName === categoryName) {                
                        return ({...elem, tasks: [...elem.tasks, taskId]})
                    } else {
                        return elem
                    }
                }
                )  

                
                axios.patch(`http://localhost:8080/users/${userState.id}`, {            
                categories: [                                      
                   ...newCategory,                             
                ]})  
                .then(({data}) => {                                     
                setUserState({
                    ...data                                     
                });
                setStatus({
                    ...status,  
                    categories:[  
                        data
                ]
                    
                
                    // ...status,
                    // tasks: [
                    //     status.tasks                      
                    // ],
                    // isComplete: taskId                           
                });
               
                localStorage.setItem("user", JSON.stringify({
                    ...data                            
                }))  
            })                  
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
                    !tasks ?
                        ""
                    :
                    tasks.map((elem, index) =>
                         <span 
                            className='header-content__tasks'
                            key={index}>                
                                {
                                    elem.taskTitle ? 
                                        <div 
                                            className='checkbox-container'
                                           >
                                            <ul>                
                                                <li 
                                                    onClick={() => {hendleComplete(elem.id); setStateChecBox(prev => !prev)}}
                                                    key={index}>
                                                    {
                                                        elem.isComplete === false ?
                                                            <img className='checkbox-container__img' src={notChecked} alt="notChecked" />            
                                                        :
                                                        <img className='checkbox-container__img' src={checked} alt="checked" />                                                     
                                                    }
                                                </li>
                                            </ul>           
                                        </div>
                                        : 
                                        ""
                                        }                                

                                <p>{elem.taskTitle}</p>
                                {
                                elem.taskTitle && status.length === undefined ? 
                                    <span 
                                    className='header-content__tasks_del'
                                    onClick={() => deleteTask(elem.id)}>✖️</span> 
                                    :
                                    "" 
                                }
                        </span>)
                    }
                    
                    {
                        show && 
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
                            }
                                                                                    
                            {
                                !all && !show &&  
                                <div className='header-content__button'>
                                <span 
                                    className='header-content__button_add'
                                    onClick={() => setShow(true)}>➕</span>
                                <button 
                                    className='header-content__button_buttonAdd'
                                    onClick={() => setShow(true)}>Новая задача</button>
                            </div>
                        }                    
            </ul>   
        </div>
    )
}

AsideSectionContent.propTypes = {
    statusName:PropTypes.object
}

export default AsideSectionContent;