import { createContext,useContext, useState } from "react";

const UserContext = createContext()

const UserProvider = ({children}) =>{
    const [user,setUser] = useState(null)
    return(
        <UserContext.Provider value={{user,setUser}}>
            {
                children
            }

        </UserContext.Provider>
    )
}
const useUserContext = () => {
    return useContext(UserContext)
}

export {UserProvider,useUserContext}