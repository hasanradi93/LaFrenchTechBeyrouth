import React, { useState } from 'react'
import { formatDate } from '../../../services/FunctionsAndTools'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import {
    ButtonInEvents,
    CardColumn,
    CardRow,
    MiniTable,
    SpanSide,
    CardColumn,
    CardRow
} from './HomePageStyles'
import { darkGray, darkRed, lightGray } from '../../../services/colors'

const MailCard = ({ data, nbRow }) => {
    const iconStyle = (Icon) => <Icon />
    const [viewSubscribers, setViewSubscribers] = useState(false)
    return (
        <>
            <CardRow backgroundColor={nbRow % 2 === 0 ? darkGray : lightGray}>
                <CardColumn>
                    {data.eventId.title}
                </CardColumn>
                <CardColumn>
                    {formatDate(data.eventId.startDate, 'en')}
                </CardColumn>
                <CardColumn>
                    {formatDate(data.createdAt, 'en')}
                </CardColumn>
                <CardColumn>
                    <SpanSide onClick={viewSubscribers ? () => setViewSubscribers(false) : () => setViewSubscribers(true)}>
                        <ButtonInEvents>
                            {viewSubscribers ? iconStyle(FaEyeSlash) : iconStyle(FaEye)}
                        </ButtonInEvents>
                    </SpanSide>
                </CardColumn>
            </CardRow>
            <CardRow style={{ display: viewSubscribers ? 'block' : 'none' }}>
                <MiniTable display={viewSubscribers ? 'block' : 'none'}>
                    <tbody>
                        {
                            data.subscribers.map((sub, index) => (
                                <CardRow backgroundColor={darkRed} key={index}>
                                    <CardColumn>
                                        {sub.email}
                                    </CardColumn>
                                </CardRow>
                            ))
                        }
                    </tbody>
                </MiniTable>
            </CardRow>
        </>
    )
}

export default MailCard