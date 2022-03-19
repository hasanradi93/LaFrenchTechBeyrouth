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
    , EventCardlocation,
    EventCardShare
} from './EventsStyles'
import DOMPurify from 'dompurify'
import { TextWrapper } from '../../services/globalStyles'
import { darkGray, darkRed } from '../../services/colors'
import CarouselPhotos from '../CarouselPhotos'
import GoogleMapBox from '../GoogleMapBox'
import BoxSubscriber from './BoxSubscriber'
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from "react-share"
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share"
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
                        <EventCardShare>
                            <FacebookShareButton
                                url={"https://lafrenchtechbeiyrouth.org/events"}
                                quote={"La French Tech Beyrouth Event: " + data.title}
                                hashtag={"#events #lafrenchtech #beirut"}
                                description={data.title}
                                className="Demo__share-button"
                            >
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <TwitterShareButton
                                url={"https://lafrenchtechbeiyrouth.org/events"}
                                quote={"La French Tech Beyrouth Event: " + data.title}
                                hashtag={"#events #lafrenchtech #beirut"}
                                description={data.title}
                                className="Demo__share-button"
                            >
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            <WhatsappShareButton
                                url={"https://lafrenchtechbeiyrouth.org/events"}
                                quote={"La French Tech Beyrouth Event: " + data.title}
                                hashtag={"#events #lafrenchtech #beirut"}
                                description={data.title}
                                className="Demo__share-button"
                            >
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                        </EventCardShare>
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