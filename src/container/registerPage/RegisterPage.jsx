// import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';

import styles from './RegisterPage.scss';




const RegisterPage = () => {
    const {
        register,
        reset,
        handleSubmit,
            formState: {
                errors
        }
    } = useForm({mode: "onblur"})

    const registerUser = (e) => {
        e.preventDefault();
       
        console.log({
            login: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value,
            categories: []
        })
    }
    

    return (
        <div className="register-container">
            <form  
                className='register-container__form' 
                noValidate
                onSubmit={registerUser}>

                <h1 className='login-container__form__title'>Регистрация</h1>

                <input {...register("login", {
                    required : {
                        message: "Заполните поле",
                        value: true
                    },
                    maxLength : {
                        message : "Длинна поля максимум 10 символов",
                        value: 10
                    },
                    minLength : {
                        message : "Длинна поля мbybvev 3 символов",
                        value: 3
                    }
                })} className='register-container__form__input' type="text" placeholder='Введите логин'/>
                <p className='login-container__form__errors'>{errors.login && errors.login.message}</p>
                
                


                <input className='register-container__form__input' type="email" placeholder='Введите Email'/>
                <input className='register-container__form__input' type="password" placeholder='Введите пароль' />
                <input className='register-container__form__input' type="password" placeholder='Введите пароль ещё раз' />

                <button className='register-container__form__btn' type="submit">Зарегистрироваться</button>

                <p className='register-container__form__p'>У меня уже есть аккаунт чтобы  <Link to="/login" className='register-container__form__link'>войти</Link></p>
            </form>
        </div>
    )
}

export default RegisterPage;