import React, { useEffect, useState } from 'react'
import { formatDate } from '../../../services/FunctionsAndTools'
import { eventValidation } from '../../../services/CheckEvent'
import {
    EventModalData
    , EventCardTitle
    , EventCardImage
    , EventCardDates
    , EventCardAddress
    , EventCardDetails
    , EventCardSubscribe
    , EventCardLocation
    , DivTwoSide
    , SpanSide
    , ButtonInEvents2
    , InputBox
    , TableDates,
    SpanSide2
    , MiniClick
    , LocationCardXY
} from './EventsStyles'
import { darkGray, darkRed, lightGray, lightRed, white } from '../../../services/colors'
import CarouselPhotos from '../../CarouselPhotos'
import GoogleMapBox from '../../GoogleMapBox'
import { FaSave } from 'react-icons/fa'
import ErrorNotice from '../../ErrorNotice'
import SeePhotosUpload from './SeePhotosUpload'
import SeePhotosView from './SeePhotosView'
import TextEditorBlock from '../../TextEditor'
const EventModalAdmin = ({ data, handleAction }) => {//1234!@wW
    const [pressed, setPressed] = useState(false)
    const [typeAction, setTypeAction] = useState('Add')
    const [active, setActive] = useState(false)
    const [seePhotos, setSeePhotos] = useState(false)
    const [addPhotos, setAddPhotos] = useState(false)
    const [viewPhotos, setViewPhotos] = useState(false)
    const [photosToUpload, setPhotosToUpload] = useState(null)
    const [message, setMessage] = useState()
    const [eventTitle, setEventTitle] = useState('')
    const [availableFromDate, setAvailableFromDate] = useState('')
    const [availableToDate, setAvailableToDate] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [locationX, setLocationX] = useState(0)
    const [locationY, setLocationY] = useState(0)
    const [subscribers, setSubscribers] = useState([])

    const iconStyle = (Icon) => <Icon />
    const newPhotos = (allPhotos) => {
        let newArr = [];
        for (let i = 0; i < allPhotos.length; i++)
            newArr.push({ image: allPhotos[i], caption: '' })
        return newArr
    }

    const handleActionChild = () => {
        console.log("pressed", pressed)
        setMessage(undefined)
        setPressed(true)
        if (!eventTitle
            || !availableFromDate
            || !availableToDate
            || !startDate
            || !endDate
            || !address
            || !description
            || !locationX
            || !locationY
        ) {
            setMessage("Fill all data")
            setPressed(false)
        }
        else {
            const validateEvent = eventValidation({
                "title": eventTitle,
                "description": description,
                "active": active,
                "availableFromDate": availableFromDate,
                "availableToDate": availableToDate,
                "startDate": startDate,
                "endDate": endDate,
                "address": address,
                "location": { "X": locationX, "Y": locationY }
            })
            if (validateEvent.error) {
                setMessage(validateEvent.error.message)
                setPressed(false)
            }
            else {
                const theEvent = new FormData()
                theEvent.append('title', eventTitle)
                theEvent.append('description', description)
                theEvent.append('active', active)
                theEvent.append('availableFromDate', availableFromDate)
                theEvent.append('availableToDate', availableToDate)
                theEvent.append('startDate', startDate)
                theEvent.append('endDate', endDate)
                theEvent.append('address', address)
                theEvent.append('location', JSON.stringify({ "X": locationX, "Y": locationY }))
                if (photosToUpload)
                    for (const key of Object.keys(photosToUpload))
                        theEvent.append('photos', photosToUpload[key])
                if (typeAction === 'Edit')
                    theEvent.append('id', data.id)
                handleAction(theEvent, typeAction)
            }
        }
    }

    useEffect(() => {
        if (data === null) {
            setTypeAction('Add')
        }
        else {
            setTypeAction('Edit')
            setEventTitle(data.title)
            setAvailableFromDate(data.availableFromDate.split('T')[0])
            setAvailableToDate(data.availableToDate.split('T')[0])
            let startDateFormat = data.startDate.split('T')
            let startDateDate = startDateFormat[0]
            let startDateTime = startDateFormat[1].substring(0, 5)
            let endDateFormat = data.endDate.split('T')
            let endDateDate = endDateFormat[0]
            let endDateTime = endDateFormat[1].substring(0, 5)
            setStartDate(startDateDate + ' ' + startDateTime)
            setEndDate(endDateDate + ' ' + endDateTime)
            setAddress(data.address)
            setDescription(data.description)
            setLocationX(data.location.X)
            setLocationY(data.location.Y)
            setSubscribers(data.subscribers)
            console.log("data.active", data.active)
            setActive(data.active)
        }
    }, [])

    const changePhotosViewForEditing = (nb) => {
        if (nb === 1) {
            setSeePhotos(true)
            setAddPhotos(false)
            setViewPhotos(false)
        }
        else if (nb === 2) {
            setSeePhotos(false)
            setAddPhotos(true)
            setViewPhotos(false)
        }
        else {
            setSeePhotos(false)
            setAddPhotos(false)
            setViewPhotos(true)
        }
    }

    const newPhotosFiles = (dataFiles) => {
        setPhotosToUpload(dataFiles)
    }

    return (
        <EventModalData>
            <EventCardTitle fontSize={'2rem'}>
                <InputBox type='text' height={'35px'} width={'90%'} color={darkGray} background={'transparent'} value={eventTitle} placeholder='Enter event title' onChange={(e) => setEventTitle(e.target.value)} />
            </EventCardTitle>
            <DivTwoSide>
                <SpanSide2 backColor={white} width={'100%'}>
                    <input type='checkbox' checked={active ? 'checked' : ''} onChange={() => setActive(!active)} />{active ? 'Active' : 'Not Active'}
                </SpanSide2>
            </DivTwoSide>
            {
                typeAction === 'Edit'
                    ? (
                        <EventCardImage height={'350px'}>
                            <DivTwoSide>
                                <MiniClick onClick={() => changePhotosViewForEditing(1)} color={seePhotos ? lightRed : lightRed}>
                                    see photos
                                </MiniClick>
                                <MiniClick onClick={() => changePhotosViewForEditing(2)} color={addPhotos ? lightRed : lightRed}>
                                    add photos
                                </MiniClick>
                                <MiniClick onClick={() => changePhotosViewForEditing(3)} color={viewPhotos ? lightRed : lightRed}>
                                    view carousel
                                </MiniClick>
                            </DivTwoSide>
                            {
                                seePhotos
                                    ? <SeePhotosView photos={data.photos} id={data.id} />
                                    :
                                    (addPhotos
                                        ? (<SeePhotosUpload newPhotosFiles={newPhotosFiles} />)
                                        : (<CarouselPhotos photos={newPhotos(data.photos)} width={'100%'} height={'300px'} />)
                                    )
                            }
                        </EventCardImage>
                    )
                    : (
                        <EventCardImage height={'150px'}>
                            <SeePhotosUpload newPhotosFiles={newPhotosFiles} />
                        </EventCardImage>
                    )
            }
            <>
                <EventCardDates color={darkGray}>
                    <img src={process.env.PUBLIC_URL + '/assets/images/date.png'} alt='date icon' /><br></br>
                    <TableDates>
                        <tbody>
                            <tr>
                                <td>Available from</td>
                                <td><InputBox type='date' value={availableFromDate} onChange={(e) => setAvailableFromDate(e.target.value)} /></td>
                                <td>{typeAction === 'Edit' ? formatDate(data.availableFromDate, 'en') : ((formatDate(availableFromDate, 'en') !== 'undefined, NaN undefined NaN') ? formatDate(availableFromDate, 'en') : '')}</td>
                            </tr>
                            <tr>
                                <td>Available to</td>
                                <td><InputBox type='date' value={availableToDate} onChange={(e) => setAvailableToDate(e.target.value)} /></td>
                                <td>{typeAction === 'Edit' ? formatDate(data.availableToDate, 'en') : ((formatDate(availableToDate, 'en') !== 'undefined, NaN undefined NaN') ? formatDate(availableToDate, 'en') : '')}</td>
                            </tr>
                            <tr>
                                <td>Start in</td>
                                <td><InputBox type='datetime-local' value={startDate} onChange={(e) => setStartDate(e.target.value)} /></td>
                                <td>{typeAction === 'Edit' ? (formatDate(data.startDate, 'en') + ' T' + data.startDate.split('T')[1].substring(0, 5)) : ((formatDate(startDate, 'en') !== 'undefined, NaN undefined NaN') ? (formatDate(startDate, 'en') + ' T' + startDate.split('T')[1]) : '')}</td>
                            </tr>
                            <tr>
                                <td>End in</td>
                                <td><InputBox type='datetime-local' value={endDate} onChange={(e) => setEndDate(e.target.value)} /></td>
                                <td>{typeAction === 'Edit' ? (formatDate(data.endDate, 'en') + ' T' + data.endDate.split('T')[1].substring(0, 5)) : ((formatDate(endDate, 'en') !== 'undefined, NaN undefined NaN') ? (formatDate(endDate, 'en') + ' T' + endDate.split('T')[1]) : '')}</td>
                            </tr>
                        </tbody>
                    </TableDates>
                </EventCardDates>
                <EventCardAddress>
                    <img src={process.env.PUBLIC_URL + '/assets/images/location.png'} alt='location icon' /><br></br>
                    <InputBox color={darkGray} background={'transparent'} value={address} placeholder={'Enter the address of event'} onChange={(e) => setAddress(e.target.value)} />
                </EventCardAddress>
            </>
            <EventCardDetails margin={'2.5%'}>
                <TextEditorBlock description={(data !== null) ? data.description : 'Write text here..'} setDescription={setDescription} />
            </EventCardDetails>
            <>
                {
                    typeAction === 'Edit'
                        ? (
                            subscribers.length
                                ? (<EventCardSubscribe>
                                    {subscribers.map((sub, i) => (<DivTwoSide><SpanSide color={darkRed}>{sub.email}</SpanSide></DivTwoSide>))}
                                </EventCardSubscribe>
                                )
                                : <DivTwoSide><SpanSide2 backColor={white} width={'100%'}>No subscribers</SpanSide2></DivTwoSide>
                        )
                        : ''
                }
                <EventCardLocation marginBottom={typeAction === 'Edit' ? '200px' : '50px'} height={typeAction === 'Edit' ? '330px' : '25px'}>
                    <LocationCardXY>
                        <SpanSide2 backColor={white} >
                            Location X : <InputBox placeholderColor={lightGray} type='text' value={locationX} onChange={(e) => setLocationX(e.target.value)} />
                        </SpanSide2>
                        <SpanSide2 backColor={white}>
                            Location Y : <InputBox placeholderColor={lightGray} type='text' value={locationY} onChange={(e) => setLocationY(e.target.value)} />
                        </SpanSide2 >
                    </LocationCardXY>
                    {
                        typeAction === 'Edit'
                            ? <GoogleMapBox X={data.location.X} Y={data.location.Y} />
                            : ''
                    }
                </EventCardLocation>
                <DivTwoSide>
                    {
                        !pressed
                            ? <SpanSide2 width={'60%'} onClick={() => handleActionChild()} >
                                <ButtonInEvents2>
                                    {iconStyle(FaSave)}
                                </ButtonInEvents2>
                            </SpanSide2>
                            : ''
                    }

                </DivTwoSide>
            </>
            {
                message === undefined
                    ? ''
                    :
                    <DivTwoSide marginTop={'10px'}>
                        <ErrorNotice
                            message={message}
                            fontSize={'0.7rem'}
                            clearError={() => setMessage(undefined)}
                            type={1}
                        />
                    </DivTwoSide>

            }
        </EventModalData >
    )
}

export default EventModalAdmin