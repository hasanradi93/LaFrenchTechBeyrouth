import React, { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import backend from './ConnectWithBackend'

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        checkLoggedIn()
    }, [loggedIn])

    const checkLoggedIn = async () => {
        await backend.checkIfStillLoggedInAdmin('LaFrenchTechToken')
            .then(response => {
                setUserInfo(response.data)
                setLoggedIn(true)
            })
            .catch(error => {
                console.log("error " + error)
                console.log("error " + error.response.data.error)
                setLoggedIn(false)
                // navigate('/admin/login')
            })
    }


    return (
        <AuthContext.Provider value={{ loggedIn, checkLoggedIn, userInfo }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext
export { AuthContextProvider }