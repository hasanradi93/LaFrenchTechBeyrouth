import React, { useEffect, useReducer, useState } from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'
import backend from '../../../services/ConnectWithBackend'
import ErrorNotice from '../../ErrorNotice'
import AddMember from './AddMember'
import {
    ButtonInCard,
    DivTwoSide,
    MembersAdminSection,
    SectionData,
    SpanSideCard,
    TitlePage
} from './MembersStyles'
import MemberCard from './MmeberCardAdmin'

const MembersAdmin = ({ message, setMessage, initialMembers, titlePage, titlePageSize }) => {
    const [add, setAdd] = useState(false)
    const [btnPressed, setBtnPressed] = useState(false)
    const iconStyle = (Icon) => <Icon />
    const reducer = (membersState, action) => {
        switch (action.type) {
            case "VIEW":
                membersState = initialMembers
                return membersState
            case "ADD":
                console.log("test0", btnPressed)
                if (btnPressed) {
                    console.log("test", btnPressed)
                    addNewMember(action.theMember)
                    const theNewMember = {
                        "id": 1,
                        "fName": action.theMember.get('fName'),
                        "lName": action.theMember.get('lName'),
                        "photo": action.theMember.get('photo'),
                        "position": action.theMember.get('position'),
                        "social": JSON.parse(action.theMember.get('social'))
                    }
                    membersState.push(theNewMember)
                }
                return membersState
            case "EDIT":
                let idEdit = action.theMember.get('id')
                editMember(action.theMember, idEdit)
                const theEditedMember = {
                    "id": idEdit,
                    "fName": action.theMember.get('fName'),
                    "lName": action.theMember.get('lName'),
                    "photo": action.theMember.get('photo'),
                    "position": action.theMember.get('position'),
                    "social": JSON.parse(action.theMember.get('social'))
                }
                let foundIndex = membersState.findIndex(x => x.id === idEdit);
                membersState[foundIndex] = theEditedMember
                return membersState
            case "DELETE":
                let idDelete = action.theMember.id
                deleteMember(idDelete)
                membersState.filter(x => x.id !== idDelete)
                return membersState
            default:
                return membersState
        }
    }

    const addNewMember = (theMember) => {
        console.log("test1", btnPressed)
        backend
            .addMember('LaFrenchTechToken', theMember)
            .then(response => {
                setMessage("Member added successfully, load the page")
                setAdd(false)
            })
            .catch(error => setMessage(error.response.data.error))
    }

    const editMember = (theMember, id) => {
        backend
            .editMember('LaFrenchTechToken', theMember, id)
            .then(response => setMessage("Memebr eidted succssfully"))
            .catch(error => setMessage(error.response.data.error))
    }

    const deleteMember = (id) => {
        backend
            .deleteMember('LaFrenchTechToken', id)
            .then(response => setMessage("Member successfully deleted"))
            .catch(error => setMessage(error.response.data.error))
    }

    const [members, dispatch] = useReducer(reducer, initialMembers)

    const handleAction = (member, actionName) => {
        dispatch({ type: actionName, theMember: member });
    }

    useEffect(() => {
        console.log("initialMembers", initialMembers)
        handleAction(initialMembers, 'VIEW')
    }, [])

    return (
        <MembersAdminSection>
            <TitlePage fontSize={titlePageSize}>{titlePage}</TitlePage>
            <DivTwoSide>
                {
                    members.length
                        ?
                        (
                            add ?
                                <SpanSideCard onClick={() => setAdd(false)}>
                                    <ButtonInCard>
                                        {iconStyle(FaTimes)}
                                    </ButtonInCard>
                                </SpanSideCard>
                                :
                                <SpanSideCard onClick={() => setAdd(true)}>
                                    <ButtonInCard>
                                        {iconStyle(FaPlus)}
                                    </ButtonInCard>
                                </SpanSideCard>
                        )
                        : ''
                }
            </DivTwoSide>
            <DivTwoSide>
                {
                    members.length
                        ?
                        (
                            add
                                ? <AddMember btnPressed={btnPressed} setBtnPressed={setBtnPressed} setMessage={setMessage} handleAction={handleAction} /> : ''
                        )
                        : <AddMember btnPressed={btnPressed} setBtnPressed={setBtnPressed} setMessage={setMessage} handleAction={handleAction} />
                }
            </DivTwoSide>
            <SectionData>
                {
                    message === undefined
                        ? (
                            members.length
                                ? members.map((member, index) => (<MemberCard key={index} data={member} setMessage={setMessage} handleAction={handleAction} />))
                                :
                                <>
                                    <img src={process.env.PUBLIC_URL + '/assets/images/loadingTirangles.gif'} alt='loading' width='32px' height='32px' />
                                    <h3>No members</h3>
                                </>
                        )
                        : <ErrorNotice
                            message={message}
                            clearError={() => setMessage(undefined)}
                            type={0}
                        />
                }
            </SectionData>
        </MembersAdminSection>
    )
}

export default MembersAdmin