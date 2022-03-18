import React from 'react'
import { Line, CompanyAdminSection, SectionDataDiv, TitlePage } from './CompanyStyles'
import InitialData from './InitialData'

const CompanyAdmin = ({ titlePage, titlePageSize }) => {
    return (
        <CompanyAdminSection>
            <TitlePage fontSize={titlePageSize}>{titlePage}</TitlePage>
            <SectionDataDiv>
                <InitialData />
            </SectionDataDiv>
            <Line />
        </CompanyAdminSection>
    )
}

export default CompanyAdmin