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
                    ? <img src={process.env.PUBLIC_URL + '/assets/images/loadingTirangles.gif'} width='32px' height='32px' alt='loading' />
                    :
                    <>
                        <SideBar menuIndex={1} />
                        <EventsAdmin titlePage={'Available New Events'} titlePageSize={'3rem'} />
                    </>
            }
        </>
    )
}

export default EventsAdminPage