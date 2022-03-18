import React, { useContext, useState } from 'react'
import AuthContext from '../../../services/AuthContext'
import { ButtonInCard, DivTwoSide, InputBox, SetDataDiv, SpanSideCard } from './ProfileStyles'
import { FaEdit, FaSave } from 'react-icons/fa'
import backend from '../../../services/ConnectWithBackend'
import ErrorNotice from '../../ErrorNotice'

const PasswordData = () => {
    const iconStyle = (Icon) => <Icon />
    const [edit, setEdit] = useState(false)
    const { userInfo } = useContext(AuthContext)
    const [oldPassword, setOldPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [messageMini, setMessageMini] = useState(undefined)

    const updateData = () => {
        if (oldPassword && newPassword) {
            const data = { "newPassword": newPassword, "oldPassword": oldPassword }
            backend
                .editPasswordDataAdmin('LaFrenchTechToken', data, userInfo.id)
                .then(response => {
                    console.log("response.data.data", response.data.data)
                    setMessageMini("Password updated successfully")
                })
                .catch(error => {
                    console.log("error.response.data.error", error.response.data.error)
                    setMessageMini(error.response.data.error)
                })
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
                                <InputBox type='text' placeholder='Enter your old password' value={oldPassword} onChange={(e) => setOldPassword(e.targetvalue)} />
                            </SpanSideCard>
                        </DivTwoSide>
                        <DivTwoSide>
                            <SpanSideCard>
                                <InputBox type='text' placeholder='Enter the new password' value={newPassword} onChange={(e) => setNewPassword(e.targetvalue)} />
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
                                {iconStyle(FaEdit)} edit password
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

export default PasswordData