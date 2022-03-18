import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../../services/AuthContext'
import { ButtonInCard, DivTwoSide, InputBox, SetDataDiv, SpanSideCard } from './ProfileStyles'
import { FaSave } from 'react-icons/fa'
import backend from '../../../services/ConnectWithBackend'
import ErrorNotice from '../../ErrorNotice'

const InitialData = () => {
    const iconStyle = (Icon) => <Icon />
    const { userInfo } = useContext(AuthContext)
    const [companyId, setCompanyId] = useState(null)
    const [companyEmail, setCompanyEmail] = useState(null)
    const [companyPhone, setCompanyPhone] = useState(null)
    const [messageMini, setMessageMini] = useState(undefined)
    useEffect(() => {
        backend
            .getCompanyDataAdmin('LaFrenchTechToken')
            .then(response => {
                console.log("response.data.data", response.data.data)
                setCompanyId(response.data.data.id)
                setCompanyEmail(response.data.data.email)
                setCompanyPhone(response.data.data.phone)
            })
            .catch(error => {
                console.log("error.response.data.error", error.response.data.error)
                setMessageMini(error.response.data.error)
            })
    }, [])

    const updateData = () => {
        if (companyEmail && companyPhone) {
            const data = { "phone": companyPhone, "email": companyEmail }
            backend
                .editCompanyDataAdmin('LaFrenchTechToken', data, companyId)
                .then(response => {
                    console.log("response.data.data", response.data.data)
                    setMessageMini("Company data updated successfully")
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
                    <InputBox type='text' placeholder='Enter the company email' value={companyEmail} onChange={(e) => setCompanyEmail(e.targetvalue)} />
                </SpanSideCard>
            </DivTwoSide>
            <DivTwoSide>
                <SpanSideCard>
                    <InputBox type='text' placeholder='Enter the company phone' value={companyPhone} onChange={(e) => setCompanyPhone(e.targetvalue)} />
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