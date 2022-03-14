import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'react-i18next'
import {
    Column
    , Row
    , SecondHeading
    , LinkText
} from '../../services/globalStyles'
import {
    EventSection
    , EventWrapper
    , MainHeading1EditedHome
    , EventsContainer
    , NoEvent
} from './EventsStyles'
import { darkGray, white, darkRed } from '../../services/colors'
import backend from '../../services/ConnectWithBackend'
import ErrorNotice from '../ErrorNotice'
import EventCard from './EventCard'

const Events = ({ pageName, width }) => {
    const { t } = useTranslation()
    const [events, setEvents] = useState(null)
    const [error, setError] = useState()
    const [offsetY, setOffsetY] = useState()
    const [innerHeight, setInnerHeight] = useState()
    const [scrollY, setScrollY] = useState(undefined)

    const handleOffsetY = () => {
        setOffsetY(window.pageYOffset)
        setScrollY(window.scrollY)
        setInnerHeight(window.innerHeight)
    }
    const { ref, inView } = useInView({
        rootMargin: '-50px',
    })

    useEffect(() => {
        if (pageName === "Home")
            getLatestEvents()
        else
            getUpcomingEvents()
        window.addEventListener('scroll', handleOffsetY)
        console.log("inviewww", inView)
        console.log("offsetYoffsetY", offsetY)
        console.log("innerHeight", innerHeight)
        console.log("scrollY", scrollY)
        return () => window.removeEventListener('scroll', handleOffsetY)
    }, [inView])

    const getLatestEvents = () => {
        backend
            .getLatestEvents()
            .then(events => setEvents(events.data))
            .catch(error => setError(error.response.data.error))
    }

    const getUpcomingEvents = () => {
        backend
            .getAvailableEvents()
            .then(events => setEvents(events.data))
            .catch(error => setError(error.response.data.error))
    }

    return (
        <EventSection
            id="Events"
            ref={ref}
            backgroundColor={darkGray}
            mt={'0px'}
            padding={"50px"}
            width={width}
        >
            {pageName === "Home"
                ? <Column
                    padding={'50px 0 50px'}
                    justify-content={'center'}
                >
                    <EventWrapper>
                        <Row padding={"10px"}>
                            <MainHeading1EditedHome
                                textAlign={"right"}
                                fontSize={'6rem'}
                                textTransform={'capitalize'}
                                transform={inView ? (offsetY / 15) : 0}
                                color={white}
                            >
                                {
                                    pageName === 'Home'
                                        ? t('Events.mainHeading_home') : ''
                                    // : t('Events.mainHeading_events_1')
                                }
                            </MainHeading1EditedHome>
                        </Row>
                        <Row>
                            <SecondHeading
                                fontWeight={"600"}
                                mt={"-70px"}
                                fontSize={"4rem"}
                                transform={inView ? (offsetY / 15) : 0}
                                color={darkRed}
                            >
                                {
                                    pageName === 'Home'
                                        ? t('Events.secondHeading_home') : ''
                                    // : t('Events.secondHeading_events_1')
                                }
                            </SecondHeading>
                        </Row>
                    </EventWrapper>
                </Column>
                : ''
            }
            <EventsContainer>
                {error === undefined
                    ? (
                        events !== null
                            ? events.data.map((event, index) => <EventCard data={event} id={index} key={index} pageName={pageName} />)
                            : <NoEvent color={white}>No Events</NoEvent>
                    )
                    : <ErrorNotice
                        message={error}
                        clearError={() => setError(undefined)}
                        type={0}
                    />}
            </EventsContainer>
            {pageName === "Home"
                ? <div style={{ textAlign: 'right', color: white }}>
                    <LinkText
                        to='/events'
                        color={white}
                    >
                        → {t('Events.bottomLink')}
                    </LinkText>
                </div> : ''}
        </EventSection >
    )
}

export default Events