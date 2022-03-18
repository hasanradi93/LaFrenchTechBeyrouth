import React, { useState } from 'react'
import { FaSave } from 'react-icons/fa'
import {
    ButtonInCard,
    DivTwoSide,
    InputBox,
    MemberCardWrapper,
    MemberEditBox,
    MemberEditBoxNote,
    SpanSideCard,
    StrWord
} from './MembersStyles'
import { isValidURL } from '../../../services/FunctionsAndTools'
import ErrorNotice from '../../ErrorNotice'
const AddMember = ({ setMessage, handleAction, setBtnPressed, btnPressed }) => {
    const [photo, setPhoto] = useState(null)
    const [fName, setFName] = useState(null)
    const [lName, setLName] = useState(null)
    const [position, setPosition] = useState(null)
    const [facebook, setFacebook] = useState(null)
    const [twitter, setTwitter] = useState(null)
    const [linkedIn, setLinkedIn] = useState(null)
    const [messageMini, setMessageMini] = useState(undefined)
    const iconStyle = (Icon) => <Icon />
    const saveMember = () => {
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
        else if (!photo) {
            setMessageMini('Please select a photo for memebr!')
        }
        else {
            console.log("test-2", btnPressed)
            if (!btnPressed) {
                console.log("test-1", btnPressed)
                let social = {}
                if (facebook !== '0')
                    social["facebook"] = facebook
                if (twitter !== '0')
                    social["twitter"] = twitter
                if (linkedIn !== '0')
                    social["linkedIn"] = linkedIn
                console.log("social", social)
                const newMember = new FormData()
                newMember.append("fName", fName)
                newMember.append("lName", lName)
                newMember.append("position", position)
                newMember.append("social", JSON.stringify(social))
                newMember.append('photo', photo)
                setBtnPressed(true)
                handleAction(newMember, 'ADD')
            }
        }
    }
    return (
        <MemberCardWrapper zIndex={'20'} height={'600px'}>
            <MemberEditBox>
                <DivTwoSide>
                    <StrWord>Add photo</StrWord><br></br>
                    <InputBox type='file' name='photo' onChange={(e) => setPhoto(e.target.files[0])} />
                </DivTwoSide>
            </MemberEditBox>
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
            <MemberEditBox>
                <DivTwoSide>
                    <StrWord>Position</StrWord><br></br>
                    <InputBox type='text' name='position' placeholder='Enter position job' value={position} onChange={(e) => setPosition(e.target.value)} />
                </DivTwoSide>
            </MemberEditBox>
            <MemberEditBoxNote>
                <DivTwoSide><StrWord>If you put 0: mean no social media</StrWord>   </DivTwoSide>
            </MemberEditBoxNote>
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
            <DivTwoSide>
                <SpanSideCard onClick={() => saveMember()}>
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
        </MemberCardWrapper >
    )
}

export default AddMember