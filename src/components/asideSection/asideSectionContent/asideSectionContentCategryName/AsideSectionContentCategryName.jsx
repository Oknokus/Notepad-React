import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CustumContext } from '../../../../hookHelper/Context';
import { useForm } from 'react-hook-form';


import './AsideSectionContentCategryName.scss';


const AsideSectionContentCategryName = ({id, categoryName, changeNameCategory, showEdit, setShowEdit}) => {
    const{
        status,
        setValueInputCategory
    } = useContext(CustumContext); 

    const {
        register,       
        handleSubmit,
            formState: {
                errors
        }
    } = useForm({mode: "onblur"});

    return (
            <li 
                className='header-content__title'
                key={id}>
                    {categoryName}

                    <span  
                        className='header-content__edit'
                        onClick={() => setShowEdit(true)}>{status.length !== undefined ? "🖉" : ""}    
                    </span>

                    {
                        showEdit && 
                            (<label className='header-content__formAdd'>
                                <span className='header-content__formAdd__errors'>{errors.categoryTitle && errors.categoryTitle.message}</span>

                                <form noValidate onSubmit={handleSubmit(changeNameCategory)}>
                                    <input 
                                        {...register("categoryTitle", {
                                        required : {
                                            message: "Заполните название Категории!!!",
                                            value: true
                                        },
                                        maxLength : {
                                            message: "Максимальное число символов 20",
                                            value: 20 
                                        }, 
                                        minLength : {
                                            message: "Минимальное число символов 1",
                                            value: 1
                                        }
                                        })
                                        } 
                                        className='header-content__input'
                                        onChange={e => setValueInputCategory(e.target.value)}
                                        type="text" 
                                        placeholder='Название задачи'/>
                                   
                                   
                                    <div>
                                        <button className='header-content__btnAdd'>Редактировать Категорию</button>
                                        <button 
                                            className='header-content__close'
                                            onClick={() => setShowEdit(false)}>
                                                Отмена
                                        </button>
                                    </div>
                                </form>
                            </label>)
                    }
            </li>
    )
};

AsideSectionContentCategryName.propTypes = {
    id:PropTypes.string, 
    categoryName:PropTypes.string, 
    changeNameCategory:PropTypes.func,
    showEdit:PropTypes.func,
    showEdit:PropTypes.bool
};

export default AsideSectionContentCategryName;