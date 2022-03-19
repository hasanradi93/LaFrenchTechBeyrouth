import React, { useContext, useState } from 'react'
import AuthContext from '../../../services/AuthContext'
import { ButtonInCard, DivTwoSide, InputBox, SetDataDiv, SpanSideCard } from './ProfileStyles'
import { FaEdit, FaSave } from 'react-icons/fa'
import backend from '../../../services/ConnectWithBackend'
import ErrorNotice from '../../ErrorNotice'

const EmailData = () => {
    const iconStyle = (Icon) => <Icon />
    const [edit, setEdit] = useState(false)
    const { userInfo, checkLoggedIn } = useContext(AuthContext)
    const [oldEmail, setOldEmail] = useState(null)
    const [newEmail, setNewEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [messageMini, setMessageMini] = useState(undefined)

    const updateData = () => {
        if (oldEmail && newEmail && password) {
            if (oldEmail !== userInfo.email) {
                setMessageMini('Please fill the valid old Email')
            }
            else {
                const data = { "email": newEmail, "password": password }
                backend
                    .editEmailDataAdmin('LaFrenchTechToken', data, userInfo.id)
                    .then(response => {
                        setMessageMini("Email updated successfully")
                        if (response.status === 201) {
                            let intervalReload = setInterval(() => {
                                backend.logout('LaFrenchTechToken')
                                checkLoggedIn()
                                clearInterval(intervalReload)
                            }, 5000)
                        }
                    })
                    .catch(error => setMessageMini(error.response.data.error))
            }
        }
        else {
            setMessageMini('Please fill the data')
        }
    }

    return (
        <SetDataDiv>
            {
                edit
                    ?
                    <>
                        <DivTwoSide>
                            <SpanSideCard>
                                <InputBox type='text' placeholder='Enter your old email' value={oldEmail} onChange={(e) => setOldEmail(e.target.value)} />
                            </SpanSideCard>
                        </DivTwoSide>
                        <DivTwoSide>
                            <SpanSideCard>
                                <InputBox type='text' placeholder='Enter the new email' value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                            </SpanSideCard>
                        </DivTwoSide>
                        <DivTwoSide>
                            <SpanSideCard>
                                <InputBox type='text' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </SpanSideCard>
                        </DivTwoSide>
                        <DivTwoSide>
                            <SpanSideCard onClick={() => updateData()}>
                                <ButtonInCard>
                                    {iconStyle(FaSave)}
                                </ButtonInCard>
                            </SpanSideCard>
                        </DivTwoSide>
                    </>
                    :
                    <DivTwoSide>
                        <SpanSideCard onClick={() => setEdit(true)}>
                            <ButtonInCard>
                                {iconStyle(FaEdit)} edit email
                            </ButtonInCard>
                        </SpanSideCard>
                    </DivTwoSide>
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

export default EmailData