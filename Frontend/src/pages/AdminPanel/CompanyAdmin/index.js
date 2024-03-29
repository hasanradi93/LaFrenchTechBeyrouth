import React, { useContext } from 'react'
import CompanyAdmin from '../../../components/Admin/Company'
import SideBar from '../../../components/Admin/SideBar'
import AuthContext from '../../../services/AuthContext'

const CompanyAdminPage = () => {
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
                        <SideBar menuIndex={5} />
                        <CompanyAdmin titlePage={'Settings'} titlePageSize={'3rem'} />
                    </>
            }
        </>
    )
}

export default CompanyAdminPage