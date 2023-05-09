import {createContext, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from 'axios';

export const CustumContext = createContext();

export const Context = (props) => {   
    const [userState, setUserState] = useState([]);
    const [status, setStatus] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const [all, setAll] = useState(false);
    const [stateChecBox, setStateChecBox] = useState(false);
    const [taskId, setTaskId] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();


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
            navigate("/");                       
        })
        .catch(err => console.log(err))                     
    };

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
                navigate("/");
            })
            .catch(err => console.log(err))
    };

    const onSubmit = (data) => {
        location.pathname === "/register" ?  registerUser(data) : loginUser(data)
    };
    
    const value = {        
        userState,
        setUserState,
        setStatus,
        status, 
        setIsComplete,
        isComplete,
        all, 
        setAll,
        setStateChecBox,
        stateChecBox,
        setTaskId,
        taskId,
        registerUser,
        loginUser,
        onSubmit
    };

    return <CustumContext.Provider value={value}>
            {props.children}
        </CustumContext.Provider>
};