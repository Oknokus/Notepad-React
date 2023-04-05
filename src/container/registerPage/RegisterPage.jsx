// import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import styles from './RegisterPage.scss';




const RegisterPage = () => {
    const navigate = useNavigate();

    const {
        register,
        reset,
        handleSubmit,
            formState: {
                errors
        }
    } = useForm({mode: "onblur"})

    const registerUser = (data) => {  
        console.log(data)
        axios.post("http://localhost:8080/user", {
            ...data,
            categories: []
           
        }).then(res => {
            reset();
            navigate("/")
        })
        .catch(err => console.log(err))
        
    }
    
    

    return (
        <div className="register-container">
            <form className='register-container__form' onSubmit={handleSubmit(registerUser)} noValidate>
                <h1 className='register-container__form__title'>Регистрация</h1>

                    <label className='register-container__form__label'> 
                        <span className='login-container__form__errors'>{errors.login && errors.login.message}</span>    

                        <input {...register("login", {
                            required : {
                                message: "Заполните поле",
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
                        })}  className='register-container__form__input' type="text" placeholder='Введите логин'/>    

                            
                    </label>   

                    <label className='register-container__form__label'>
                        <span className='login-container__form__errors'>{errors.email && errors.email.message}</span> 

                        <input {...register("email", {
                            required : {
                                message: "Заполните поле",
                                value: true
                            },
                            minLength : {
                                message: "Минимальное число символов 10",
                                value: 10 
                            }, 
                            pattern : {
                                message: "Заполните поле правильно",
                                value: /^[^ ]+@[^ ]+\.[a-z]{2,5}$/
                            }                          
                        })}  className='register-container__form__input' type="email" placeholder='Введите Email'/>

                       
                    </label>   

                    <label className='register-container__form__label'>
                        <span className='login-container__form__errors'>{errors.password && errors.password.message}</span>

                        <input {...register("password", {
                            required : {
                                message: "Заполните поле",
                                value: true
                            },
                            minLength : {
                                message: "Минимальное число символов 10",
                                value: 10 
                            }, 
                            pattern : {
                                message: "Парол  должен содержать не мение 8 символов, заглавную букву, число!",
                                value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g
                            }
                        })}  className='register-container__form__input' type="password" placeholder='Введите пароль'/>
                    </label>   
{/* 
                    <label className='register-container__form__label'>
                        <p className='login-container__form__errors'>{errors.PasswordRepeat && errors.PasswordRepeat.message}</p>

                        <input {...register("PasswordRepeat", {
                            required : {
                                message: "Заполните поле",
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
                        })}  className='register-container__form__input' type="password" placeholder='Введите пароль ещё раз'/>
                
                    </label>    */}
                           
                <button className='register-container__form__btn' type="submit">Зарегистрироваться</button>

                <p className='register-container__form__p'>У меня уже есть аккаунт чтобы <Link to="/login" className='register-container__form__link'>войти</Link></p>
            </form>
        </div>
    )
}

export default RegisterPage;