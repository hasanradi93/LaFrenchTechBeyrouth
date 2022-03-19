import React, { useEffect, useState } from 'react'
import { darkGray } from '../../services/colors'
import TitlesAndSubTitles from '../TitlesAndSubtitles'
import backend from '../../services/ConnectWithBackend'
import {
    MembersSection
    , ContainerMembers
    , ContainerText
    , SectionData
} from './MembersStyles'
import ErrorNotice from '../ErrorNotice'
import MemberCard from './MemberCard'

const Members = ({ pageName }) => {
    const [members, setMembers] = useState([])
    const [error, setError] = useState()
    useEffect(() => {
        backend
            .members()
            .then(response => { setMembers(response.data); console.log(response.data) })
            .catch(error => setError(error.response.data.error))
    }, [])
    return (
        <MembersSection style={{ marginTop: '-10px' }}>
            <ContainerMembers>
                <SectionData>
                    {
                        error === undefined
                            ? (
                                members.length
                                    ? members.map((member, index) => (<MemberCard key={index} data={member} />))
                                    : <img src={process.env.PUBLIC_URL + '/assets/images/loadingTirangles.gif'} alt='loading' width='32px' height='32px' />
                            )
                            : <ErrorNotice
                                message={error}
                                clearError={() => setError(undefined)}
                                type={0}
                            />
                    }
                </SectionData>
            </ContainerMembers>
            <ContainerText>
                <TitlesAndSubTitles pageName={pageName} index={1} mt={'0px'} mb={'0px'} width={'100%'} bC={darkGray} colorMainTitle={darkGray} opacity={0.5} zIndex={9} heightDesktop={'35vh'} heightMobile={'35vh'} />
            </ContainerText>
        </MembersSection>
    )
}

export default Members