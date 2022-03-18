import React from 'react'
import { Line, CompanyAdminSection, SectionDataDiv } from './CompanyStyles'
import InitialData from './InitialData'

const CompanyAdmin = () => {
    return (
        <CompanyAdminSection>
            <SectionDataDiv>
                <InitialData />
            </SectionDataDiv>
            <Line />
        </CompanyAdminSection>
    )
}

export default CompanyAdmin