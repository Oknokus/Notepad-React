import {Link, useLocation} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import {CustumContext} from '../../hookHelper/Context';


import './FormRegister.scss';


const FormRegister = () => {
    const {setUserState} = useContext(CustumContext);
    const navigate = useNavigate();
    const location = useLocation();
   
    const {
        register,
        reset,
        handleSubmit,
            formState: {
                errors
        }
    } = useForm({mode: "onblur"})

    const registerUser = (data) => { 
        axios.post("http://localhost:8080/register", {
                ...data, 
                categories: []
        }).then(res => {                  
            setUserState({
                    token: res.data.accessToken,
                    ...res.data.user
                })  

            localStorage.setItem("user", JSON.stringify({
                token: res.data.accessToken,
                ...res.data.user
            }))   
            reset();
            navigate("/");                       
        })
        .catch(err => console.log(err))                     
    }
    
    const loginUser = (data) => {        
            axios.post("http://localhost:8080/login", {
                ...data
            })
                .then(res => {
                    setUserState({
                        token: res.data.accessToken,
                        ...res.data.user
                    })  
                    localStorage.setItem("user", JSON.stringify({
                        token: res.data.accessToken,
                        ...res.data.user
                    }))  
                    reset();
                    navigate("/");
                })
                .catch(err => console.log(err))
    }  
        

    const onSubmit = (data) => {
        location.pathname === "/register" ?  registerUser(data) : loginUser(data)
    }
  

    return (
        <>
            <div className="register-container">
            <form className='register-container__form' onSubmit={handleSubmit(onSubmit)} noValidate>
                <h1 className='register-container__form__title'>
                    {
                        location.pathname === "/register" ? "Регистрация" : "Вход"
                    } 
                </h1>

                    {
                        location.pathname === "/register" ? <label className='register-container__form__label'> 
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
                           
                        </label>   : ""
                    }                      

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
                           
                <button className='register-container__form__btn' type="submit">
                    {
                        location.pathname === "/register" ? "Зарегистрироваться" : "Войти"
                    } </button>

                <p className='register-container__form__p'>
                    {
                        location.pathname === "/register" ? 
                            <>У меня уже есть аккаунт чтобы <Link to="/login" className='register-container__form__link'>войти</Link></> 
                            : <>Ещё нет аккаунта ? <Link to="/register" className='register-container__form__link'>Зарегистрироваться</Link></>
                    }
                </p>
                    
            </form>
        </div>
        </>
    )
}

export default FormRegister;