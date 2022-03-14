import React from 'react'
import cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'
import { checkDates } from '../../services/FunctionsAndTools'
import {
    EventModalData
    , EventCardTitle
    , EventCardImage
    , EventCardDates
    , EventCardAddress
    , EventCardDetails
    , EventCardSubscribe
    , EventCardlocation
} from './EventsStyles'
import DOMPurify from 'dompurify'
import { TextWrapper } from '../../services/globalStyles'
import { darkGray, darkRed } from '../../services/colors'
import CarouselPhotos from '../CarouselPhotos'
import GoogleMapBox from '../GoogleMapBox'
import BoxSubscriber from './BoxSubscriber'
const EventModal = ({ data, pageName }) => {
    const { t } = useTranslation()
    const language = cookies.get('i18next') || 'en'
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

    return (
        <EventModalData>
            <EventCardTitle fontSize={'2rem'}>{data.title}</EventCardTitle>
            <EventCardImage height={'350px'}>
                <CarouselPhotos photos={newPhotos(data.photos)} width={'100%'} height={'300px'} />
            </EventCardImage>
            {
                pageName === "Events"
                    ? (
                        <>
                            <EventCardDates color={darkGray}>
                                <img src={process.env.PUBLIC_URL + '/assets/images/date.png'} alt='date icon' />
                                <span>
                                    {checkDates(data.startDate, data.endDate, language, t)}
                                </span>
                            </EventCardDates>
                            <EventCardAddress>
                                <img src={process.env.PUBLIC_URL + '/assets/images/location.png'} alt='location icon' />
                                <span>{data.address}</span>
                            </EventCardAddress>
                        </>
                    )
                    : ''
            }
            <EventCardDetails margin={'2.5%'}>
                <div className="preview" dangerouslySetInnerHTML={createMarkup(data.description)}></div>
            </EventCardDetails>
            {pageName === "Events"
                ? (
                    <>
                        <TextWrapper
                            fontSize={'12px'}
                            color={darkRed}
                            textAlign={'center'}
                        >
                            {t('Events.underDescriptionModal')}
                        </TextWrapper>
                        <EventCardSubscribe>
                            <BoxSubscriber id={data.id} />
                        </EventCardSubscribe>
                        <EventCardlocation>
                            <GoogleMapBox X={data.location.X} Y={data.location.Y} />
                        </EventCardlocation>
                    </>
                )
                : ''
            }
        </EventModalData>
    )
}

export default EventModal