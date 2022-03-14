import React, { useState } from 'react'
import backend from '../../services/ConnectWithBackend'
import { email_validate } from '../../services/FunctionsAndTools'
import ErrorNotice from '../ErrorNotice'
import { useTranslation } from 'react-i18next'

const BoxSubscriber = ({ id }) => {
    const { t } = useTranslation()
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState()
    const saveEmailSubscriber = () => {
        email
            ? (email_validate(email) ? (saveEmail()) : setMessage('Invalid Email!'))
            : setMessage('Fill the field!')
    }

    const saveEmail = () => {
        backend
            .subscribeToEvent({ email: email }, id)
            .then(response => {
                setMessage(t('Events.successSubscribe'))
            })
            .catch(error => {
                setMessage(error.response.data.error)
            })
    }

    return (
        <>
            {
                message === undefined
                    ? <>
                        <input placeholder={t('Events.emailPlaceHolder')} type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button onClick={saveEmailSubscriber}>{t('Events.subscribe')}</button>
                    </>
                    : <ErrorNotice
                        message={message}
                        clearError={() => setMessage(undefined)}
                        type={1}
                    />
            }
        </>
    )
}

export default BoxSubscriber