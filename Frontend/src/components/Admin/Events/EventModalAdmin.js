import React from 'react'
import cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'
import { checkDates } from '../../../services/FunctionsAndTools'
import {
    EventModalData
    , EventCardTitle
    , EventCardImage
    , EventCardDates
    , EventCardAddress
    , EventCardDetails
    , EventCardSubscribe
    , EventCardlocation
    , DivTwoSide
    , SpanSide
    , ButtonInEvents
} from './EventsStyles'
import DOMPurify from 'dompurify'
import { darkGray } from '../../../services/colors'
import CarouselPhotos from '../../CarouselPhotos'
import GoogleMapBox from '../../GoogleMapBox'
import { FaEdit } from 'react-icons/fa'
const EventModalAdmin = ({ data, handleAction }) => {
    const iconStyle = (Icon) => <Icon />
    const newPhotos = (allPhotos) => {
        let newArr = [];
        for (let i = 0; i < allPhotos.length; i++)
            newArr.push({ image: allPhotos[i], caption: '' })
        return newArr
    }

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    const handleActionChild = (type) => {
        handleAction(data, type)//handleAction
    }

    return (
        <EventModalData>
            <EventCardTitle fontSize={'2rem'}>{data.title}</EventCardTitle>
            <EventCardImage height={'350px'}>
                <CarouselPhotos photos={newPhotos(data.photos)} width={'100%'} height={'300px'} />
            </EventCardImage>
            <>
                <EventCardDates color={darkGray}>
                    <img src={process.env.PUBLIC_URL + '/assets/images/date.png'} alt='date icon' />
                    <span>
                        {checkDates(data.startDate, data.endDate, 'en')}
                    </span>
                </EventCardDates>
                <EventCardAddress>
                    <img src={process.env.PUBLIC_URL + '/assets/images/location.png'} alt='location icon' />
                    <span>{data.address}</span>
                </EventCardAddress>
            </>
            <EventCardDetails margin={'2.5%'}>
                <div className="preview" dangerouslySetInnerHTML={createMarkup(data.description)}></div>
            </EventCardDetails>
            <>
                <EventCardSubscribe>

                </EventCardSubscribe>
                <EventCardlocation>
                    <GoogleMapBox X={data.location.X} Y={data.location.Y} />
                </EventCardlocation>
                <DivTwoSide>
                    <SpanSide>
                        <ButtonInEvents
                            onClick={() => handleActionChild('Edit')}
                        >
                            {iconStyle(FaEdit)}
                        </ButtonInEvents>
                    </SpanSide>
                </DivTwoSide>
            </>
        </EventModalData>
    )
}

export default EventModalAdmin