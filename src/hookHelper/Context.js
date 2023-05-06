import {createContext, useState} from "react";

export const CustumContext = createContext();

export const Context = (props) => {   
    const [userState, setUserState] = useState([]);
    const [status, setStatus] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const [all, setAll] = useState(false);
    const [stateChecBox, setStateChecBox] = useState(false);
    const [taskId, setTaskId] = useState(false);
    
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
        taskId
    };

    return <CustumContext.Provider value={value}>
            {props.children}
        </CustumContext.Provider>
};