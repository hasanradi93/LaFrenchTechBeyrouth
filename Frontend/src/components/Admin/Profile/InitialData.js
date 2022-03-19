import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../services/AuthContext'
import { ButtonInCard, DivTwoSide, InputBox, SetDataDiv, SpanSideCard } from './ProfileStyles'
import { FaSave } from 'react-icons/fa'
import backend from '../../../services/ConnectWithBackend'
import ErrorNotice from '../../ErrorNotice'

const InitialData = () => {
    const iconStyle = (Icon) => <Icon />
    const { userInfo } = useContext(AuthContext)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [messageMini, setMessageMini] = useState(undefined)
    useEffect(() => {
        setFirstName(userInfo.firstName)
        setLastName(userInfo.lastName)
    }, [])

    const updateData = () => {
        console.log("firstName", firstName)
        console.log("lastName", lastName)
        if (firstName && lastName) {
            const data = { "fName": firstName, "lName": lastName, "userType": 1 }
            backend
                .editInitialProfileDataAdmin('LaFrenchTechToken', data, userInfo.id)
                .then(response => {
                    console.log("response.data.data", response.data.data)
                    setMessageMini("Information updated successfully")
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
            <DivTwoSide>
                <SpanSideCard>
                    <InputBox type='text' placeholder='Enter the first name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </SpanSideCard>
            </DivTwoSide>
            <DivTwoSide>
                <SpanSideCard>
                    <InputBox type='text' placeholder='Enter the last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </SpanSideCard>
            </DivTwoSide>
            <DivTwoSide>
                <SpanSideCard onClick={() => updateData()}>
                    <ButtonInCard>
                        {iconStyle(FaSave)}
                    </ButtonInCard>
                </SpanSideCard>
            </DivTwoSide>
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

export default InitialData