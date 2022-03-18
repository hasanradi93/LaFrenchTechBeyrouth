import React from 'react'
import DataChart from './DataChart'
import { HomePageSection, Line, SectionDataDiv, TitlePage } from './HomePageStyles'
import MailsSentData from './MailsSentData'

const HomePageAdmin = ({ fullName, titlePage, titlePageSize }) => {
    return (
        <HomePageSection>
            <TitlePage fontSize={titlePageSize}>{titlePage}</TitlePage>
            <SectionDataDiv>
                <MailsSentData />
            </SectionDataDiv>
            <Line />
            <SectionDataDiv>
                <DataChart />
            </SectionDataDiv>
        </HomePageSection>
    )
}

export default HomePageAdmin