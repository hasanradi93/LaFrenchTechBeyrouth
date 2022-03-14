import React, { useContext } from 'react'
import { Outlet, } from 'react-router-dom'
import SideBar from '../../components/Admin/SideBar'
import AuthContext from '../../services/AuthContext'

const AdminPage = () => {
    const { userInfo } = useContext(AuthContext)
    const { loggedIn } = useContext(AuthContext)

    return (
        <>
            {
                !loggedIn
                    ? <img src={process.env.PUBLIC_URL + '/assets/images/loadingTirangles.gif'} width='32px' height='32px' alt='loading' />
                    : <>
                        <SideBar menuIndex={0} />
                        <h1>Welcome {userInfo.fullName}</h1>
                    </>
            }
            <Outlet />
        </>
    )
}

export default AdminPage