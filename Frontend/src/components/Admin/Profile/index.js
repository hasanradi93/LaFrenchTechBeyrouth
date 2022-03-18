import React from 'react'
import InitialData from './InitialData'
import { ProfileAdminSection, SectionDataDiv } from './ProfileStyles'

const ProfileAdmin = () => {
    return (
        <ProfileAdminSection>
            <SectionDataDiv>
                <InitialData />
            </SectionDataDiv>
            <SectionDataDiv>
                <UsernameEmailData />
            </SectionDataDiv>
            <SectionDataDiv>
                <PasswordData />
            </SectionDataDiv>
        </ProfileAdminSection>
    )
}

export default ProfileAdmin