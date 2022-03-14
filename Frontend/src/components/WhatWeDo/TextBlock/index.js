import React from 'react'
import {
    Lb,
    Topic,
    Circle,
    Title,
    SubText
} from './textBlockStyles'
const TextBlock = ({ topic, title, subText, children }) => {
    return (
        <Lb id="leftBlock">
            <Topic>
                <Circle />
                <span>{topic}</span>
            </Topic>
            <Title>{title}</Title>
            <SubText>{subText}</SubText>
            {children}
        </Lb>
    )
}
export default TextBlock