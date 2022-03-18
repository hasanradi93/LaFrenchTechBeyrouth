import React, { useContext } from 'react'
import EventsAdmin from '../../../components/Admin/Events'
import SideBar from '../../../components/Admin/SideBar'
import AuthContext from '../../../services/AuthContext'

const EventsAdminPage = () => {
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
                        <SideBar menuIndex={1} />
                        <EventsAdmin titlePage={'Events Page'} titlePageSize={'3rem'} />
                    </>
            }
        </>
    )
}

export default EventsAdminPage