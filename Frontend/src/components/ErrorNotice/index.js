import React from 'react'
import { darkGray, lightGray } from '../../services/colors'
import {
    Error
    , ErrorButton
    , ErrorContainer
} from './ErrorNoticeStyles'
export default function ErrorNotice(props) {
    return (
        <>
            {
                props.type === 0
                    ?
                    <ErrorContainer width={'70%'} height={'75px'} color={lightGray}>
                        <Error fontSize={'1.7rem'} height={'75px'}>{props.message}</Error>
                        <ErrorButton onClick={props.clearError}>X</ErrorButton>
                    </ErrorContainer>
                    :
                    <ErrorContainer width={'100%'} height={'55px'} color={darkGray}>
                        <Error fontSize={'1rem'} height={'50px'}>{props.message}</Error>
                        <ErrorButton onClick={props.clearError}>X</ErrorButton>
                    </ErrorContainer>
            }
        </>
    )
}
