import React, { useEffect, useState } from 'react'
import backend from '../../../services/ConnectWithBackend'
import ErrorNotice from '../../ErrorNotice'
import { MailsTable, SetDataDiv } from './HomePageStyles'
import MailCard from './MailCard'

const MailsSentData = () => {
    const [mailsData, setMailsData] = useState([])
    const [messageMini, setMessageMini] = useState(undefined)
    useEffect(() => {
        backend
            .mailsData('LaFrenchTechToken')
            .then(response => {
                setMailsData(response.data.data)
                console.log("response.data.data", response.data.data)
            })
            .catch(error => {
                console.log("error.response.data.error", error.response.data.error)
                setMessageMini(error.response.data.error)
            })
    }, [])
    return (
        <SetDataDiv>
            {
                mailsData.length
                    ?
                    <MailsTable>
                        {
                            mailsData.map((mail, index) => (<MailCard key={index} data={mail} setMessageMini={setMessageMini} />))
                        }
                    </MailsTable>
                    :
                    <>
                        <img src={process.env.PUBLIC_URL + '/assets/images/loadingTirangles.gif'} alt='loading' width='32px' height='32px' />
                        <h3>No members</h3>
                    </>
            }
            {
                messageMini !== undefined
                    ? <ErrorNotice
                        style={{ marginTop: '20px;' }}
                        message={messageMini}
                        clearError={() => setMessageMini(undefined)}
                        type={1}
                    />
                    : ''
            }
        </SetDataDiv>
    )
}

export default MailsSentData