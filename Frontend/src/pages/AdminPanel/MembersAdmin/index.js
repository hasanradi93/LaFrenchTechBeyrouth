import React, { useContext, useEffect, useState } from 'react'
import MembersAdmin from '../../../components/Admin/Members'
import SideBar from '../../../components/Admin/SideBar'
import AuthContext from '../../../services/AuthContext'
import backend from '../../../services/ConnectWithBackend'

const MembersAdminPage = () => {
    const { loggedIn } = useContext(AuthContext)
    const [members, setMembers] = useState([])
    const [message, setMessage] = useState()
    useEffect(() => {
        backend
            .members()
            .then(response => { setMembers(response.data); console.log(response.data) })
            .catch(error => setMessage(error.response.data.error))
    }, [])
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
                        <MembersAdmin
                            message={message}
                            setMessage={setMessage}
                            initialMembers={members}
                            titlePage={'Members Page'}
                            titlePageSize={'3rem'}
                        />
                    </>
            }
        </>
    )
}

export default MembersAdminPage