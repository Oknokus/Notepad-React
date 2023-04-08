import { createContext, useState } from "react";

export const CustumContext = createContext();

export const Context = (props) => {
    const [user, setUser] = useState();
    const [localState, setLocalState] = useState({});
    
    const value = {
        user,
        setUser,
    };

    return <CustumContext.Provider value={value}>
            {props.children}
        </CustumContext.Provider>
};