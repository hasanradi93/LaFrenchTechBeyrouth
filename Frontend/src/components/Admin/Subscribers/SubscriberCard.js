import React, { useState } from 'react'
import { formatDate } from '../../../services/FunctionsAndTools'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import {
    ButtonInEvents,
    MiniTable,
    SpanSide,
    SubscriberCardColumn,
    SubscriberCardDiv,
    SubscriberCardRow
} from './SubscribersStyles'
import { darkGray, darkRed, lightGray } from '../../../services/colors'

const SubscriberCard = ({ data, nbRow }) => {
    const iconStyle = (Icon) => <Icon />
    const [viewEvents, setViewEvents] = useState(false)
    return (
        <>
            <SubscriberCardRow backgroundColor={nbRow % 2 === 0 ? darkGray : lightGray}>
                <SubscriberCardColumn>
                    {data.email}
                </SubscriberCardColumn>
                <SubscriberCardColumn>
                    {data.events.length}
                </SubscriberCardColumn>
                <SubscriberCardColumn>
                    {formatDate(data.createdAt, 'en')}
                </SubscriberCardColumn>
                <SubscriberCardColumn>
                    <SpanSide onClick={viewEvents ? () => setViewEvents(false) : () => setViewEvents(true)}>
                        <ButtonInEvents>
                            {viewEvents ? iconStyle(FaEyeSlash) : iconStyle(FaEye)}
                        </ButtonInEvents>
                    </SpanSide>
                </SubscriberCardColumn>
            </SubscriberCardRow>
            <SubscriberCardRow style={{ display: viewEvents ? 'block' : 'none' }}>
                <MiniTable display={viewEvents ? 'block' : 'none'}>
                    <tbody>
                        {
                            data.events.map((ev, index) => (
                                <SubscriberCardRow backgroundColor={darkRed} key={index}>
                                    <SubscriberCardColumn>
                                        {ev.title}
                                    </SubscriberCardColumn>
                                    <SubscriberCardColumn>
                                        {formatDate(ev.startDate, 'en')}
                                    </SubscriberCardColumn>
                                </SubscriberCardRow>
                            ))
                        }
                    </tbody>
                </MiniTable>
            </SubscriberCardRow>
        </>
    )
}

export default SubscriberCard