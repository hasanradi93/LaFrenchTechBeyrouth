import React, { useEffect, useState } from 'react'
import backend from '../../../services/ConnectWithBackend'
import ErrorNotice from '../../ErrorNotice'
import { MailsTable, SetDataDiv, SecondHeadingEdited } from './HomePageStyles'
import MailCard from './MailCard'

const MailsSentData = () => {
    const [mailsData, setMailsData] = useState([])
    const [messageMini, setMessageMini] = useState(undefined)
    useEffect(() => {
        backend
            .getMailsData('LaFrenchTechToken')
            .then(response => setMailsData(response.data.data))
            .catch(error => setMessageMini(error.response.data.error))
    }, [])
    return (
        <SetDataDiv height={'height'}>
            {
                mailsData.length
                    ?
                    <>
                        <SecondHeadingEdited
                            fontSize={'1.5rem'}
                        >
                            Schedule  for last Reminders Sent
                        </SecondHeadingEdited>
                        <MailsTable>
                            {
                                mailsData.map((mail, index) => (<MailCard key={index} data={mail} setMessageMini={setMessageMini} />))
                            }
                        </MailsTable>
                    </>
                    :
                    <>
                        <img src={process.env.PUBLIC_URL + '/assets/images/loadingTirangles.gif'} alt='loading' width='32px' height='32px' />
                        <h3>No mails sent</h3>
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