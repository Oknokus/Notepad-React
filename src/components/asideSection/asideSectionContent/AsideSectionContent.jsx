import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { CustumContext } from '../../../hookHelper/Context';
import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AsideSectionContentCategryName from "./asideSectionContentCategryName";
import AsideSectionContentCheckBox from "./asideSectionContentCheckBox";
import AsideSectionContentCreateTask from "./asideSectionContentCreateTask";
import AsideSectionContentCreateNewTask from "./asideSectionContentCreateTask/asideSectionContentCreateNewTask";


import './AsideSectionContent.scss';


const AsideSectionContent = ({statusName}) => { 
    const [showEdit, setShowEdit] = useState(false); 

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
            stateChecBox,
            all,            
            setShow,
            show,
            valueInputCategory
        } = useContext(CustumContext); 
       
      
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
                setShow(false);
            
               
                toast("Задача добавлена!!!")
            }).catch(err => toast(`Задача не добавлена!!!, ${err.message}`))              
        };
        
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
                        setShow(false);                  
                 
                    toast("Задача удалена!!!")
                })
                .catch(err => toast(`Задача не удалена!!!, ${err.message}`))
        };
                         
        const handleComplete = (id) => {                             
                const taskId = userState.categories.filter(elem => elem.categoryName === categoryName)
                    .map(el => el.tasks.filter(item => item.id === id)
                    .map(init => init.isComplete = stateChecBox));


                let newCategory = userState.categories.filter((elem) => {
                    if(elem.categoryName === categoryName) {                
                        return ({...elem, tasks: [...elem.tasks, taskId]})
                    } else {
                        return elem
                    }
                })  
                               
                axios.patch(`http://localhost:8080/users/${userState.id}`, {            
                categories: [                                      
                   ...newCategory,                             
                ]})  
                .then(({data}) => {                                     
                setUserState({
                    ...data,                                                        
                    tasks: [
                            userState.tasks.map(el => {
                           if(el.id === id) {
                            return {...el, isComplete: !el.isComplete}                                                             
                            }                    
                            else  {return {...el, isComplete: el.isComplete}}
                        })  
                    ]                                   
                })                
                setStatus({
                    ...status,                                                        
                    tasks: [
                        ...status.tasks.map(el => {
                           if(el.id === id) {
                            return {...el, isComplete: !el.isComplete}                                                             
                            }                    
                            else  {return {...el, isComplete: el.isComplete}}
                        }) 
                    ] 
                })             
               
                localStorage.setItem("user", JSON.stringify({
                    ...status,                                                        
                    tasks: [
                        ...status.tasks.map(el => {
                           if(el.id === id) {
                            return {...el, isComplete: !el.isComplete}                                                             
                            }                    
                            else  {return {...el}}
                        }) 
                    ]                            
                })) 
            })           
        };      
       
        const changeNameCategory = (id) => {           
            let newCategoryName = userState.categories.map((elem) => {                
                if(elem.categoryName === categoryName) {                
                    return ({...elem, categoryName: valueInputCategory})
                } else {
                    return {...elem,  categoryName: elem.categoryName}
                }})              
                axios.patch(`http://localhost:8080/users/${userState.id}`, {
                    categories: 
                        newCategoryName 
                })  .then(({data}) => {    
                                           
                    setUserState({
                        ...data,
                        categories: 
                            newCategoryName
                    });  
                        // setStatus({                                                                                   
                        //     ...statusName,
                        //     categoryName: 
                        //         newCategoryName.categories.map(elem => {
                        //             if(elem.id !== id) {
                        //                 return  
                        //             }  return  elem.categoryName
                        //         })                                   
                        // })                       
                    localStorage.setItem("user", JSON.stringify({
                        ...data,
                        categories: 
                            newCategoryName       
                    }))
                    setShowEdit(false);                  
             
                toast("Категория изменена!!!")
            })
            .catch(err => toast(`Категория  не изменена!!!, ${err.message}`))
    } 
        
    return ( 
        <div className='header-content'>           
            <ul             
                className='header-content__ul'> 
                    {
                        !tasks ? ""
                        :
                        <AsideSectionContentCategryName id={id} categoryName={categoryName} 
                            changeNameCategory={changeNameCategory} showEdit={showEdit} setShowEdit={setShowEdit} />                    
                    } 

                    {
                        !tasks ? ""
                        :
                        <AsideSectionContentCheckBox handleComplete={handleComplete} deleteTask={deleteTask} tasks={tasks} />                        
                    }
                    
                    {
                        show && 
                        <AsideSectionContentCreateTask addTasks={addTasks} />                           
                    }
                                                                                    
                    {
                        !all && !show &&  
                           <AsideSectionContentCreateNewTask setShow={setShow} />
                    }                    
            </ul>   
        </div>
    )
}

AsideSectionContent.propTypes = {
    statusName:PropTypes.object
}

export default AsideSectionContent;