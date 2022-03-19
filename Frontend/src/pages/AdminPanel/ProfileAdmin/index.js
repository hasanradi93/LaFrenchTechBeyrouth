import React, { useContext } from 'react'
import ProfileAdmin from '../../../components/Admin/Profile'
import SideBar from '../../../components/Admin/SideBar'
import AuthContext from '../../../services/AuthContext'

const ProfileAdminPage = () => {
    const { loggedIn } = useContext(AuthContext)
    return (
        <>
            {
                !loggedIn
                    ? <div style={{ textAlign: 'center' }}>
                        <h4>Loading..</h4>
                        <img src={process.env.PUBLIC_URL + '/assets/images/loadingTirangles.gif'} width='64px' height='64px' alt='loading' />
                    </div>
                    :
                    <>
                        <SideBar menuIndex={4} />
                        <ProfileAdmin titlePage={'Profile'} titlePageSize={'3rem'} />
                    </>
            }
        </>
    )
}

export default ProfileAdminPage