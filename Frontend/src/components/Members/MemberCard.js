import React from 'react'
import {
    MemberCardWrapper
    , MemberImg
    , MmeberFullName
    , MmeberImgWrapper
    , MemberLine
    , MmeberPosition
    , MemberSocialMedia
    , SocialIcon
} from './MembersStyles'
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'

const MemberCard = ({ data }) => {
    console.log("datadata", data)
    const iconStyle = (Icon) => <Icon />
    return (
        <MemberCardWrapper>
            <MmeberImgWrapper>
                <MemberImg src={data.photo ? data.photo : ''} />
            </MmeberImgWrapper>
            <MmeberFullName>
                {data.fName.length > 12
                    ? (<><span style={{ fontSize: '12px' }}>{data.fName} {data.lName}</span></>)
                    : (<>{data.fName} {data.lName}</>)
                }
            </MmeberFullName>
            <MemberLine />
            <MmeberPosition>
                {data.position}
            </MmeberPosition>
            <MemberSocialMedia>
                {
                    data.social.facebook
                        ? <SocialIcon
                            href={data.social.facebook}
                            target="_blank"
                            aria-label='Facebook'
                        >
                            {iconStyle(FaFacebook)}
                        </SocialIcon> : ''
                }
                {
                    data.social.twitter
                        ? <SocialIcon
                            href={data.social.twitter}
                            target="_blank"
                            aria-label='Twitter'
                        >
                            {iconStyle(FaTwitter)}
                        </SocialIcon> : ''
                }
                {
                    data.social.linkedIn
                        ? <SocialIcon
                            href={data.social.linkedIn}
                            target="_blank"
                            aria-label='LinkedIn'
                        >
                            {iconStyle(FaLinkedin)}
                        </SocialIcon> : ''
                }
            </MemberSocialMedia>
        </MemberCardWrapper>
    )
}

export default MemberCard