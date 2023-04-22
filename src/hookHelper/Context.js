import {createContext, useState} from "react";

export const CustumContext = createContext();

export const Context = (props) => {   
    const [userState, setUserState] = useState([]);
    const [status, setStatus] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    
    const value = {        
        userState,
        setUserState,
        setStatus,
        status, 
        setIsComplete,
        isComplete
    };

    return <CustumContext.Provider value={value}>
            {props.children}
        </CustumContext.Provider>
};