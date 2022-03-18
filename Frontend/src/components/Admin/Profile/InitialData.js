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
    const [lastName, setLasttName] = useState(null)
    const [messageMini, setMessageMini] = useState(undefined)
    useEffect(() => {
        setFirstName(userInfo.firstName)
        setLasttName(userInfo.lastName)
    }, [])

    const updateData = () => {
        if (firstName && lastName) {
            const data = {}
            backend
                .editInitialProfileDataAdmin('LaFrenchTechToken',)
        }
        else {
            setMessageMini('Please fill the data')
        }
    }

    return (
        <SetDataDiv>
            <DivTwoSide>
                <SpanSideCard>
                    <InputBox type='text' value={firstName} onChange={setFirstName(e.targetvalue)} />
                </SpanSideCard>
            </DivTwoSide>
            <DivTwoSide>
                <SpanSideCard>
                    <InputBox type='text' value={lastName} onChange={setLasttName(e.targetvalue)} />
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