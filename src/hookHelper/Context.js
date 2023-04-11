import { createContext, useState } from "react";

export const CustumContext = createContext();

export const Context = (props) => {
    const [user, setUser] = useState();

    const [localState, setLocalState] = useState({});

    // const [userState, setUserState] = useState();

    const userState = {
        email: ""
    }


    
    const value = {
        user,
        setUser, 
        userState
    };

    return <CustumContext.Provider value={value}>
            {props.children}
        </CustumContext.Provider>
};