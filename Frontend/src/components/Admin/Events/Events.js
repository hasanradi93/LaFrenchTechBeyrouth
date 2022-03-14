import React from 'react'
import {
    EventsContainer
    , NoEvent
} from './EventsStyles'
import { white } from '../../../services/colors'
import ErrorNotice from '../../ErrorNotice'
import EventCard from './EventCard'

const Events = ({ pageName, events, handleAction, message, setMessage }) => {
    return (
        <EventsContainer>
            {console.log("eventssss", events)}
            {message === undefined
                ? (
                    events !== null
                        ? events.map((event, index) => <EventCard data={event} id={index} key={index} pageName={pageName} handleAction={handleAction} />)
                        : <NoEvent color={white}>No Events</NoEvent>
                )
                : <ErrorNotice
                    message={message}
                    fontSize={'1rem'}
                    clearError={() => setMessage(undefined)}
                    type={0}
                />}
        </EventsContainer>
    )
}

export default Events