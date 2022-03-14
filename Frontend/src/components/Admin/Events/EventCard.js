import React, { useState } from 'react'
import Tilt from 'react-parallax-tilt'
import { useTranslation } from 'react-i18next'
import { checkDates } from '../../../services/FunctionsAndTools'
import DOMPurify from 'dompurify'
import {
    EventCardInfo
    , EventCardTitle
    , EventCardImage
    , EventImg
    , EventCardDates
    , EventCardAddress
    , EventCardDetails
    , DivTwoSide
    , SpanSide2
    , ButtonInEvents2
} from './EventsStyles'
import { TextWrapper } from '../../../services/globalStyles'
import { darkGray, darkRed } from '../../../services/colors'
import Modal from '../../Modal'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
const EventCard = ({ data, id, pageName, handleAction }) => {
    const iconStyle = (Icon) => <Icon />
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

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    const handleActionChild = (type) => {
        if (type === "Edit")
            toggleModal()
        else
            handleAction(data, type)
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
                            {checkDates(data.startDate, data.endDate, 'en', t)}
                        </span>
                    </EventCardDates>
                    <EventCardAddress>
                        <img src={process.env.PUBLIC_URL + '/assets/images/location.png'} alt='location icon' />
                        <span>{data.address}</span>
                    </EventCardAddress>
                    <EventCardDetails height={'200px'} overflow={'hidden'} id={'content' + id}>
                        <div className="preview" dangerouslySetInnerHTML={createMarkup(data.description)}></div>
                    </EventCardDetails>
                    {/* <TextWrapper
                        fontSize={'10px'}
                        color={darkRed}
                        textAlign={'center'}
                    >
                        Press View more to see full description
                    </TextWrapper> */}
                    {/* <ButtonEvent
                        transition={{ delay: 1, duration: 0.6 }}
                        inverse={false}
                        style={{ opacity: '1 !important' }}
                        onClick={toggleModal}>
                        View more
                    </ButtonEvent> */}
                    <DivTwoSide>
                        <SpanSide2>
                            <ButtonInEvents2
                                onClick={() => handleActionChild('Edit')}
                            >
                                {iconStyle(FaEdit)}
                            </ButtonInEvents2>
                        </SpanSide2>
                        <SpanSide2>
                            <ButtonInEvents2 onClick={() => handleActionChild('Delete')}>
                                {iconStyle(FaTrashAlt)}
                            </ButtonInEvents2>
                        </SpanSide2>
                    </DivTwoSide>
                </EventCardInfo>
            </Tilt>
            <Modal showModal={showModal} toggleModal={toggleModal} openedBy={'EventAdmin'} pageName={handleAction} data={data} />
        </>
    )
}

export default EventCard