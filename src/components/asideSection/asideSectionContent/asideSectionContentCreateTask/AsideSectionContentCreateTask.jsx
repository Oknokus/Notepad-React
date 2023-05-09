import PropTypes from 'prop-types';
import {useForm} from 'react-hook-form';

import { useContext } from 'react';
import { CustumContext } from '../../../../hookHelper/Context';


import './AsideSectionContentCreateTask.scss';


const AsideSectionContentCreateTask = ({addTasks}) => {
    const{
        setShow
    } = useContext(CustumContext); 


    const {
        register,        
        handleSubmit,
            formState: {
                errors
        }
    } = useForm({mode: "onblur"});

    return (
        <>
            <label className='header-content__formAdd'>                              
                <span >{errors.taskTitle && errors.taskTitle.message}</span> 
                                
                    <form noValidate onSubmit={handleSubmit(addTasks)}> 
                        <input {...register("taskTitle", {
                            required : {
                                message: "Заполните название задачи!!!",
                                value: true
                            },
                            maxLength : {
                                message: "Максимальное число символов 30",
                                value: 30 
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
                                    onClick={() => setShow(false)}>
                                        Отмена
                                </button>
                            </div>
                    </form>
            </label>
        </>
    )
};

AsideSectionContentCreateTask.propTypes = {
    addTasks:PropTypes.func,
     setShow:PropTypes.func
};


export default AsideSectionContentCreateTask;