import React, { useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt'
import { useTranslation } from 'react-i18next'
import { checkDates } from '../../services/FunctionsAndTools'
import cookies from 'js-cookie'
import DOMPurify from 'dompurify'
import {
    EventCardInfo
    , EventCardTitle
    , EventCardImage
    , EventImg
    , EventCardDates
    , EventCardAddress
    , EventCardDetails
    , ButtonEvent
} from './EventsStyles'
import { TextWrapper } from '../../services/globalStyles'
import { darkGray, darkRed } from '../../services/colors'
import Modal from '../Modal'
import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'
const EventCard = ({ data, id, pageName }) => {
    const { t } = useTranslation()
    const [showModal, setShowModal] = useState(false)
    const toggleModal = () => {
        showModal ?
            document.body.style.overflow = 'hidden'
            :
            document.body.style.overflow = 'visible'
        document.body.style.overflow = 'visible'
        setShowModal(!showModal)
    }
    const language = cookies.get('i18next') || 'en'

    const initial = { opacity: 0, y: 30 }
    const animation = useAnimation();

    const { ref, inView } = useInView({ threshold: 0.2 });

    useEffect(() => {
        if (inView) {
            animation.start({
                opacity: 1,
                y: 0,
            });
        }
    }, [inView, animation])

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    return (
        <>
            <Tilt
                key={id}
                className="Tilt"
            >
                <EventCardInfo>
                    <EventCardTitle fontSize={'1.5rem'}>{data.title.length > 20 ? (data.title.substring(0, 18) + '..') : data.title}</EventCardTitle>
                    <EventCardImage>
                        <EventImg src={data.photos[0]} />
                    </EventCardImage>
                    <EventCardDates color={darkGray} fontSize={'0.7rem'}>
                        <img src={process.env.PUBLIC_URL + '/assets/images/date.png'} alt='date icon' />
                        <span>
                            {checkDates(data.startDate, data.endDate, language, t)}
                        </span>
                    </EventCardDates>
                    <EventCardAddress>
                        <img src={process.env.PUBLIC_URL + '/assets/images/location.png'} alt='location icon' />
                        <span>{data.address}</span>
                    </EventCardAddress>
                    <EventCardDetails height={'200px'} overflow={'hidden'} id={'content' + id}>
                        <div className="preview" dangerouslySetInnerHTML={createMarkup(data.description)}></div>
                    </EventCardDetails>
                    <TextWrapper
                        fontSize={'10px'}
                        color={darkRed}
                        textAlign={'center'}
                    >
                        {pageName === "Home"
                            ? t('Events.underDescriptionCard1')
                            : t('Events.underDescriptionCard2')
                        }
                    </TextWrapper>
                    <ButtonEvent
                        initial={initial}
                        transition={{ delay: 1, duration: 0.6 }}
                        animate={animation}
                        inverse={false}
                        style={{ opacity: '1 !important' }}
                        onClick={toggleModal}>
                        {pageName === "Home"
                            ? t('Events.viewMore')
                            : t('Events.subscribeNow')
                        }
                    </ButtonEvent>
                </EventCardInfo>
            </Tilt>
            <Modal showModal={showModal} toggleModal={toggleModal} openedBy={'Event'} pageName={pageName} data={data} />
        </>
    )
}

export default EventCard