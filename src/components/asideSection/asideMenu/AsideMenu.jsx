import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CustumContext } from '../../../hookHelper/Context';
import { Navigate } from 'react-router-dom';


import './AsideMenu.scss';


const AsideMenu = ({deleteCategory}) => {
    const {
        userState,    
        status,
        setStatus,
        setAll
        } = useContext(CustumContext);

    return (
        <>
             <div 
                className={status.length !== undefined ? 'active' : 'aside-container__main'}
                onClick={() => {setStatus(userState.categories.map(elem => elem)); setAll(true)}}>               
                <span className='container-container__tasksAll'>
                    📝Все категории
                </span>
            </div>

            <ul className='aside-container__menu'> 
                {   
                    (userState.length === 0) ? (<Navigate to="/"/>) :
                        userState.categories.map(elem => (               
                            <li 
                                key={elem.id}                            
                                onClick={() => {setStatus(elem); setAll(false)}}
                                className={elem && status === elem.categoryName ? 'active1' :'aside-container__menu__li'}>                       
                            <span className='aside-container__menu__li__color' style={{background: elem.color}}></span>
                            <span className='container-container__tasks'>{elem.categoryName}</span>
                            <span 
                                className='aside-container__menu__li__del'
                                onClick={() => deleteCategory(elem.id)}>✖️</span>
                            </li>  
                    ))
                }       
            </ul>
        </>
    )
};

AsideMenu.propTypes = {
    deleteCategory:PropTypes.func 
};


export default AsideMenu;