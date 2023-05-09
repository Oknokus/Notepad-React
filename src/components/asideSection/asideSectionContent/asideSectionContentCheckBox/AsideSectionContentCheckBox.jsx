import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CustumContext } from '../../../../hookHelper/Context';

import checked from "./imageCheckBox/checked.png"
import notChecked from "./imageCheckBox/notChecked.png"


import './AsideSectionContentCheckBox.scss';


const AsideSectionContentCheckBox = ({tasks, handleComplete, deleteTask}) => {
    const{
        status,      
        setStateChecBox        
    } = useContext(CustumContext); 

    return (
        <>
            {tasks.map((elem, index) =>
                <span 
                    className='header-content__tasks'
                    key={index}>                
                                
                    {
                        elem.taskTitle && status.length === undefined ? 
                        <div className='checkbox-container'>
                            <ul>                
                                <li 
                                    onClick={() => {handleComplete(elem.id); setStateChecBox(prev => !prev)}}
                                    key={index}>
                                    {
                                        elem.isComplete === false ? <img className='checkbox-container__img' src={notChecked} alt="notChecked" />            
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
                </span>)}
        </>
    )
};

AsideSectionContentCheckBox.propTypes = {
    tasks:PropTypes.array,
    handleComplete:PropTypes.func,
    deleteTask:PropTypes.func

}

export default AsideSectionContentCheckBox;