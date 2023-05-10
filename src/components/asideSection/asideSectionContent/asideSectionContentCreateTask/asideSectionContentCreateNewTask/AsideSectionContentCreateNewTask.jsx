import PropTypes from 'prop-types';


import './AsideSectionContentCreateNewTask.scss';


const AsideSectionContentCreateNewTask = ({setShow}) => {
    return (
        <div 
            className='header-content__button'
            onClick={() => setShow(true)}>
            <span className='header-content__button_add'>
                ➕
            </span>

            <button 
                className='header-content__button_buttonAdd'>
                    Новая задача
            </button>
        </div>
    )
};

AsideSectionContentCreateNewTask.propTypes = {
    setShow:PropTypes.func
};


export default AsideSectionContentCreateNewTask;