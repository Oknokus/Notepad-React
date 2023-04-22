import PropTypes from 'prop-types';

import UiCheckBox from '../../uiCheckBox/UiCheckBox';


import './AsideSectionContent.scss';


const AsideSectionContent = ({statusName}) => {
       const {
        categoryName,
        id,
        tasks
       } = statusName
   
     
    return ( 
        <div className='header-content'> 
            <ul className='header-content__ul' key={id}>                
                <li className='header-content__title' >
                    {categoryName}
                    <span className='header-content__edit'>🖉</span>                    
                </li> 
                    {
                    tasks.length !== 0 ? 
                    tasks.map(elem =>
                        <span className='header-content__tasks'>
                            <UiCheckBox isComplete={elem.isComplete} />
                            {elem.taskTitle}
                        </span>)
                        :
                        ""
                    }

                    <div className='header-content__button'>
                        <span className='header-content__button_add'>➕</span>
                        <button className='header-content__button_buttonAdd'>Новая задача</button>
                    </div>
            </ul>   
        </div>
    )
}

AsideSectionContent.propTypes = {
    statusName:PropTypes.array
}

export default AsideSectionContent;