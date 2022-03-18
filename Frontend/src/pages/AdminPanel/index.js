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
                    ? <div style={{ textAlign: 'center' }}>
                        <h4>Loading..</h4>
                        <img src={process.env.PUBLIC_URL + '/assets/images/loadingTirangles.gif'} width='64px' height='64px' alt='loading' />
                    </div>
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