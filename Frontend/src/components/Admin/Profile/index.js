import React from 'react'
import { Line, ProfileAdminSection, SectionDataDiv, TitlePage } from './ProfileStyles'
import InitialData from './InitialData'
import UsernameData from './UsernameData'
import EmailData from './EmailData'
import PasswordData from './PasswordData'

const ProfileAdmin = ({ titlePage, titlePageSize }) => {
    return (
        <ProfileAdminSection>
            <TitlePage fontSize={titlePageSize}>{titlePage}</TitlePage>
            <SectionDataDiv>
                <InitialData />
            </SectionDataDiv>
            <Line />
            <SectionDataDiv>
                <UsernameData />
            </SectionDataDiv>
            <Line />
            <SectionDataDiv>
                <EmailData />
            </SectionDataDiv>
            <Line />
            <SectionDataDiv>
                <PasswordData />
            </SectionDataDiv>
        </ProfileAdminSection>
    )
}

export default ProfileAdmin