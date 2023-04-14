import {createContext, useState} from "react";

export const CustumContext = createContext();

export const Context = (props) => {   
    const [userState, setUserState] = useState([]);
    
    const value = {        
        userState,
        setUserState
    };

    return <CustumContext.Provider value={value}>
            {props.children}
        </CustumContext.Provider>
};