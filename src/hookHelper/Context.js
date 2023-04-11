import { createContext, useState } from "react";

export const CustumContext = createContext();

export const Context = (props) => {
    const [user, setUser] = useState();
    const [userState, setUserState] = useState({
        email: ""
    });


    
    const value = {
        user,
        setUser, 
        userState,
        setUserState
    };

    return <CustumContext.Provider value={value}>
            {props.children}
        </CustumContext.Provider>
};