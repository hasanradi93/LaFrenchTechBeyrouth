import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext, { AuthContextProvider } from "./AuthContext"

const ProtectedRoutes = () => {
    // let isAuth = AuthContextProvider.loggedIn
    const { loggedIn } = useContext(AuthContext)
    // console.log("loggedIn", loggedIn)
    // console.log("isAuth", isAuth)
    return loggedIn ? <Outlet /> : <Navigate to="/admin/login" />
};

export default ProtectedRoutes;