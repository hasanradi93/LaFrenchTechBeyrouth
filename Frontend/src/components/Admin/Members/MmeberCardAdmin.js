import React, { useEffect, useState } from 'react'
import {
    MemberCardWrapper
    , MemberImg
    , MmeberFullName
    , MmeberImgWrapper
    , MemberLine
    , MmeberPosition
    , MemberSocialMedia
    , SocialIcon,
    DivTwoSide,
    SpanSideCard,
    ButtonInCard,
    InputBox,
    StrWord,
    MemberEditBox,
    MemberEditBoxNote
} from './MembersStyles'
import { isValidURL } from '../../../services/FunctionsAndTools'
import { FaFacebook, FaTwitter, FaLinkedin, FaEdit, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa'
import ErrorNotice from '../../ErrorNotice'

const MemberCard = ({ data, handleAction, setMessage }) => {
    const [edit, setEdit] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [fName, setFName] = useState(null)
    const [lName, setLName] = useState(null)
    const [position, setPosition] = useState(null)
    const [facebook, setFacebook] = useState('0')
    const [twitter, setTwitter] = useState('0')
    const [linkedIn, setLinkedIn] = useState('0')
    const [messageMini, setMessageMini] = useState(undefined)
    const iconStyle = (Icon) => <Icon />

    useEffect(() => {
        setFName(data.fName)
        setLName(data.lName)
        setPosition(data.position)
        if (data.social.facebook)
            setFacebook(data.social.facebook)
        if (data.social.twitter)
            setTwitter(data.social.twitter)
        if (data.social.linkedIn)
            setLinkedIn(data.social.linkedIn)
        setPhoto(data.photo)
    }, [])

    const updateMember = () => {
        if (!fName || !lName || !position) {
            setMessageMini('Check first/last name or position!')
        }
        else if (!facebook || !twitter || !linkedIn)
            setMessageMini('Check the social link!')
        else if (facebook === '0' && twitter === '0' && linkedIn === '0')
            setMessageMini('enter at least one social link!')
        else if (facebook !== '0' && !isValidURL(facebook)) {
            setMessageMini('Check Facebook social link!')
        }
        else if (twitter !== '0' && !isValidURL(twitter)) {
            setMessageMini('Check Twitter social link!')
        }
        else if (linkedIn !== '0' && !isValidURL(linkedIn)) {
            setMessageMini('Check LinkedIn social link!')
        }

        else {
            let social = {}
            if (facebook !== '0')
                social["facebook"] = facebook
            if (twitter !== '0')
                social["twitter"] = twitter
            if (linkedIn !== '0')
                social["linkedIn"] = linkedIn
            const editMember = new FormData()
            editMember.append("fName", fName)
            editMember.append("lName", lName)
            editMember.append("position", position)
            editMember.append("social", JSON.stringify(social))
            editMember.append('photo', photo)
            editMember.append('id', data.id)
            handleAction(editMember, 'EDIT')
        }
    }
    const deletMember = () => {
        if (window.confirm('Do you want ot delete this Member ?')) {
            handleAction(data, 'DELETE')
        }
    }

    return (
        <MemberCardWrapper height={edit ? '900px' : '340px'} zIndex={edit ? '10' : '1'}>
            {
                edit ?
                    <DivTwoSide>
                        <SpanSideCard onClick={() => setEdit(false)}>
                            <ButtonInCard>
                                {iconStyle(FaTimes)}
                            </ButtonInCard>
                        </SpanSideCard>
                    </DivTwoSide>
                    : ''
            }
            <MmeberImgWrapper>
                <MemberImg src={data.photo ? data.photo : ''} />
            </MmeberImgWrapper>
            {
                edit ?
                    <MemberEditBox>
                        <DivTwoSide>
                            <StrWord>Edit photo</StrWord><br></br>
                            <InputBox type='file' name='photo' onChange={(e) => setPhoto(e.target.files[0])} />
                        </DivTwoSide>
                    </MemberEditBox>

                    : ''
            }
            {
                edit ?
                    <>
                        <MemberEditBox>
                            <DivTwoSide>
                                <StrWord>First name</StrWord><br></br>
                                <InputBox type='text' name='fName' placeholder='Enter First name' value={fName} onChange={(e) => setFName(e.target.value)} />
                            </DivTwoSide>
                        </MemberEditBox>
                        <MemberEditBox>
                            <DivTwoSide>
                                <StrWord>Last name</StrWord><br></br>
                                <InputBox type='text' name='lName' placeholder='Enter Last name' value={lName} onChange={(e) => setLName(e.target.value)} />
                            </DivTwoSide>
                        </MemberEditBox>
                    </>
                    :
                    <MmeberFullName>
                        {data.fName.length > 12
                            ? (<><span style={{ fontSize: '12px' }}>{data.fName} {data.lName}</span></>)
                            : (<>{data.fName} {data.lName}</>)
                        }
                    </MmeberFullName>
            }
            <MemberLine />
            {
                edit ?
                    <MemberEditBox>
                        <DivTwoSide>
                            <StrWord>Position</StrWord><br></br>
                            <InputBox type='text' name='position' placeholder='Enter position job' value={position} onChange={(e) => setPosition(e.target.value)} />
                        </DivTwoSide>
                    </MemberEditBox>

                    :
                    <MmeberPosition>
                        {data.position}
                    </MmeberPosition>
            }

            {
                edit ?
                    <MemberEditBoxNote>
                        <DivTwoSide><StrWord>If you put 0: mean no social media</StrWord>   </DivTwoSide>
                    </MemberEditBoxNote>
                    : ''
            }
            {
                edit ?
                    <>
                        <MemberEditBox>
                            <DivTwoSide>
                                <StrWord>Facebook</StrWord><br></br>
                                <InputBox type='text' name='facebook' placeholder='Enter Facebook social link' value={facebook} onChange={(e) => setFacebook(e.target.value)} />
                            </DivTwoSide>
                        </MemberEditBox>
                        <MemberEditBox>
                            <DivTwoSide>
                                <StrWord>Twitter</StrWord><br></br>
                                <InputBox type='text' name='twitter' placeholder='Enter Twitter social link' value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                            </DivTwoSide>
                        </MemberEditBox>
                        <MemberEditBox>
                            <DivTwoSide>
                                <StrWord>LinkedIn</StrWord><br></br>
                                <InputBox type='text' name='linkedIn' placeholder='Enter LinkedIn social link' value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} />
                            </DivTwoSide>
                        </MemberEditBox>
                    </>
                    :
                    <MemberSocialMedia>
                        {
                            facebook !== '0'
                                ? <SocialIcon
                                    href={data.social.facebook}
                                    target="_blank"
                                    aria-label='Facebook'
                                >
                                    {iconStyle(FaFacebook)}
                                </SocialIcon> : ''
                        }
                        {
                            twitter !== '0'
                                ? <SocialIcon
                                    href={data.social.twitter}
                                    target="_blank"
                                    aria-label='Twitter'
                                >
                                    {iconStyle(FaTwitter)}
                                </SocialIcon> : ''
                        }
                        {
                            linkedIn !== '0'
                                ? <SocialIcon
                                    href={data.social.linkedIn}
                                    target="_blank"
                                    aria-label='LinkedIn'
                                >
                                    {iconStyle(FaLinkedin)}
                                </SocialIcon> : ''
                        }
                    </MemberSocialMedia>
            }
            <DivTwoSide>
                <SpanSideCard onClick={edit ? () => updateMember() : () => setEdit(true)}>
                    <ButtonInCard>
                        {edit ? iconStyle(FaSave) : iconStyle(FaEdit)}
                    </ButtonInCard>
                </SpanSideCard>
                <SpanSideCard onClick={() => deletMember()}>
                    <ButtonInCard>
                        {iconStyle(FaTrashAlt)}
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
        </MemberCardWrapper >
    )
}

export default MemberCard