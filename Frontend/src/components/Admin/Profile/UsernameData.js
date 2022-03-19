import React, { useContext, useState } from 'react'
import AuthContext from '../../../services/AuthContext'
import { ButtonInCard, DivTwoSide, InputBox, SetDataDiv, SpanSideCard } from './ProfileStyles'
import { FaEdit, FaSave } from 'react-icons/fa'
import backend from '../../../services/ConnectWithBackend'
import ErrorNotice from '../../ErrorNotice'

const UsernameData = () => {
    const iconStyle = (Icon) => <Icon />
    const [edit, setEdit] = useState(false)
    const { userInfo, checkLoggedIn } = useContext(AuthContext)
    const [oldUsername, setOldUsername] = useState(null)
    const [newUsername, setNewUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [messageMini, setMessageMini] = useState(undefined)

    const updateData = () => {
        if (oldUsername && newUsername && password) {
            if (oldUsername !== userInfo.username) {
                setMessageMini('Please fill the valid old Username')
            }
            else {
                const data = { "username": newUsername, "password": password }
                backend
                    .editUsernameDataAdmin('LaFrenchTechToken', data, userInfo.id)
                    .then(response => {
                        setMessageMini("Username updated successfully")
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
                                <InputBox type='text' placeholder='Enter your old username' value={oldUsername} onChange={(e) => setOldUsername(e.target.value)} />
                            </SpanSideCard>
                        </DivTwoSide>
                        <DivTwoSide>
                            <SpanSideCard>
                                <InputBox type='text' placeholder='Enter the new username' value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
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
                                {iconStyle(FaEdit)} edit username
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

export default UsernameData