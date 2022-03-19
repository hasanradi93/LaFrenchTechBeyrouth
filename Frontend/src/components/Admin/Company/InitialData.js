import React, { useEffect, useState } from 'react'
import {
    ButtonInCard,
    DivTwoSide,
    InputBox,
    SetDataDiv,
    SpanSideCard
} from './CompanyStyles'
import { FaSave } from 'react-icons/fa'
import backend from '../../../services/ConnectWithBackend'
import ErrorNotice from '../../ErrorNotice'

const InitialData = () => {
    const iconStyle = (Icon) => <Icon />
    const [companyId, setCompanyId] = useState(null)
    const [companyEmail, setCompanyEmail] = useState(null)
    const [companyPhone, setCompanyPhone] = useState(null)
    const [messageMini, setMessageMini] = useState(undefined)
    useEffect(() => {
        backend
            .getCompanyDataAdmin('LaFrenchTechToken')
            .then(response => {
                setCompanyId(response.data.data[0].id)
                setCompanyEmail(response.data.data[0].email)
                setCompanyPhone(response.data.data[0].phone)
            })
            .catch(error => setMessageMini(error.response.data.error))
    }, [])

    const updateData = () => {
        if (companyEmail && companyPhone) {
            const data = { "phone": companyPhone, "email": companyEmail }
            backend
                .editCompanyDataAdmin('LaFrenchTechToken', data, companyId)
                .then(response => setMessageMini("Company data updated successfully"))
                .catch(error => setMessageMini(error.response.data.error))
        }
        else {
            setMessageMini('Please fill the data')
        }
    }

    return (
        <SetDataDiv>
            <DivTwoSide>
                <SpanSideCard>
                    <InputBox type='text' placeholder='Enter the company email' value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} />
                </SpanSideCard>
            </DivTwoSide>
            <DivTwoSide>
                <SpanSideCard>
                    <InputBox type='text' placeholder='Enter the company phone' value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} />
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