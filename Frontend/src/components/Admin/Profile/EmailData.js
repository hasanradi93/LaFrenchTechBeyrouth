import React, { useContext, useState } from 'react'
import AuthContext from '../../../services/AuthContext'
import { ButtonInCard, DivTwoSide, InputBox, SetDataDiv, SpanSideCard } from './ProfileStyles'
import { FaEdit, FaSave } from 'react-icons/fa'
import backend from '../../../services/ConnectWithBackend'
import ErrorNotice from '../../ErrorNotice'

const EmailData = () => {
    const iconStyle = (Icon) => <Icon />
    const [edit, setEdit] = useState(false)
    const { userInfo } = useContext(AuthContext)
    const [oldEmail, setOldEmail] = useState(null)
    const [newEmail, setNewEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [messageMini, setMessageMini] = useState(undefined)

    const updateData = () => {
        if (oldEmail && newEmail && password) {
            if (oldEmail === userInfo.email) {
                setMessageMini('Please fill the valid old email')
            }
            else {
                const data = { "email": newEmail, "password": password }
                backend
                    .editEmailDataAdmin('LaFrenchTechToken', data, userInfo.id)
                    .then(response => {
                        console.log("response.data.data", response.data.data)
                        setMessageMini("Email updated successfully")
                    })
                    .catch(error => {
                        console.log("error.response.data.error", error.response.data.error)
                        setMessageMini(error.response.data.error)
                    })
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
                                <InputBox type='text' placeholder='Enter your old email' value={oldEmail} onChange={(e) => setOldEmail(e.targetvalue)} />
                            </SpanSideCard>
                        </DivTwoSide>
                        <DivTwoSide>
                            <SpanSideCard>
                                <InputBox type='text' placeholder='Enter the new email' value={newEmail} onChange={(e) => setNewEmail(e.targetvalue)} />
                            </SpanSideCard>
                        </DivTwoSide>
                        <DivTwoSide>
                            <SpanSideCard>
                                <InputBox type='text' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.targetvalue)} />
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