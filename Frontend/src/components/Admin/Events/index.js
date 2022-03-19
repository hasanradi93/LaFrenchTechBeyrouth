import React, { useEffect, useState } from 'react'
import { EventsSection } from './EventsStyles'
import Events from './Events'
import { TitlePage } from './EventsStyles'
import FilterSection from './FilterSection'
import backend from '../../../services/ConnectWithBackend'

const EventsAdmin = ({ titlePage, titlePageSize }) => {//1234!@wW
    const [theTitle, setTheTitle] = useState('null')
    const [titleSize, setTitleSize] = useState(null)
    const [events, setEvents] = useState(null)
    const [filterBy, setFilterBy] = useState(0)
    const [searchData1, setSearchData1] = useState(null)
    const [searchData2, setSearchData2] = useState(null)
    const [limit, setLimit] = useState(0)
    const [message, setMessage] = useState()

    useEffect(() => {
        getForAdmin()
        setTheTitle(titlePage)
        setTitleSize(titlePageSize)
    }, [])

    const getForAdmin = async () => {
        await backend
            .getForAdmin('LaFrenchTechToken')
            .then(events => setEvents(events.data.data))
            .catch(error => setMessage(error.response.data.error))
    }
    const deleteEvent = (id) => {
        backend
            .deleteEvent('LaFrenchTechToken', id)
            .then(response => {
                setMessage('Event Deleted Successfully!')
                let theEvents = events.filter(ev => (ev.id !== id))
                setEvents(theEvents)
            })
            .catch(error => setMessage(error.response.data.error))
    }
    const searchEvents = (textSearch, yourSearch) => {
        backend
            .searchEvents('LaFrenchTechToken', textSearch)
            .then(response => {
                setTheTitle(yourSearch)
                setTitleSize('1rem')
                setEvents(response.data.data)
            })
            .catch(error => {
                setMessage(error.response.data.error)
                setTheTitle(yourSearch)
                setTitleSize('1rem')
            })
        let intervalData = setInterval(() => {
            setTheTitle(titlePage)
            setTitleSize(titlePageSize)
            clearInterval(intervalData)
        }, 7000)
    }

    const editTheEvent = (event) => {
        let id = event.get('id')
        backend
            .editEvent('LaFrenchTechToken', event, id)
            .then(response => {
                setMessage('Event edited successfully')
                let foundIndex = events.findIndex(x => x.id === id);
                events[foundIndex] = response.data.data
                setEvents(events)
            })
            .catch(error => {
                setMessage(error.response.data.error)
            })
        let intervalData = setInterval(() => {
            setMessage(undefined)
            clearInterval(intervalData)
        }, 7000)
    }

    const addTheEvent = (event) => {
        backend
            .addEvent('LaFrenchTechToken', event)
            .then(response => {
                setEvents(prevEvents => prevEvents.concat(response.data.data))
                setMessage("Event added successfully")
            })
            .catch(error => setMessage(error.response.data.error))
        let intervalData = setInterval(() => {
            setMessage(undefined)
            clearInterval(intervalData)
        }, 7000)
    }

    const reducer = (event, action) => {
        switch (action) {
            case "Edit":
                console.log("eventEdited in index ", event)
                if (event) {
                    editTheEvent(event)
                }
                else {
                    setMessage("Check the data entered, something wrong!")
                }
                break
            case "Add":
                console.log("eventAdd in index ", event)
                if (event) {
                    addTheEvent(event)
                }
                else {
                    setMessage("Check the data entered, something wrong!")
                }
                break
            case "Delete":
                if (window.confirm('Do you want to delete this Event?')) {
                    deleteEvent(event.id)
                    break
                }
                break
            case "Search":
                let data = ``
                let yourSearch = ``
                let send = false
                if (Number(filterBy) === 1) {
                    if (!searchData1 || !searchData2 || searchData1 === -1 || searchData2 === -1)
                        setMessage("Please choose a month and a year")
                    else {
                        setMessage(undefined)
                        data = `type=1&month=${Number(searchData1) + 1}&year=${Number(searchData2)}&nbLimit=${limit}`
                        yourSearch = `Filter:month/year - month=${searchData1 + 1} - year=${searchData2} - limit=${limit}`
                        send = true
                    }
                }
                else if (Number(filterBy) === 2) {
                    if (!searchData1.trim())
                        setMessage("Please enter a title")
                    else {
                        setMessage(undefined)
                        data = `type=2&title=${searchData1}&nbLimit=${limit}`
                        yourSearch = `Filter:title - words=${searchData1} - limit=${limit}`
                        send = true
                    }
                }
                else if (Number(filterBy) === 3) {
                    if (!searchData1.trim())
                        setMessage("Please enter an address")
                    else {
                        setMessage(undefined)
                        data = `type=3&address=${searchData1}&nbLimit=${limit}`
                        yourSearch = `Filter:address - words=${searchData1} - limit=${limit}`
                        send = true
                    }
                }
                else if (Number(filterBy) === 4) {
                    if (searchData1 !== 'asc' && searchData1 !== 'desc')
                        setMessage("Please choose order by")
                    else {
                        setMessage(undefined)
                        data = `type=4&field=subscribers&order=${searchData1}&nbLimit=${limit}`
                        yourSearch = `Filter:subscribers - order=${searchData1} - limit=${limit}`
                        send = true
                    }
                }
                else if (Number(filterBy) === 5) {
                    if (Number(searchData1) !== 1 && Number(searchData1) !== 2)
                        setMessage("Please choose active or not")
                    else {
                        setMessage(undefined)
                        let choosed = "Active"
                        if (Number(searchData1) === 2)
                            choosed = "Not Acitve"
                        data = `type=5&field=active&forType=${searchData1}&nbLimit=${limit}`
                        yourSearch = `Filter:active - for=${choosed} - limit=${limit}`
                        send = true
                    }
                }
                else if (Number(filterBy) > 5 || Number(filterBy) <= 0) {
                    setMessage("Please choose filter by")
                }
                if (send) {
                    searchEvents(data, yourSearch)
                }
                break
            default:
                setMessage('Error execute the action')
                break
        }
    }

    return (
        <EventsSection>
            <TitlePage fontSize={Number(filterBy) > 0 ? titleSize : titlePageSize}>{Number(filterBy) > 0 ? theTitle : titlePage}</TitlePage>
            <FilterSection
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                searchData1={searchData1}
                setSearchData1={setSearchData1}
                setSearchData2={setSearchData2}
                searchEvents={searchEvents}
                handleAction={reducer}
                setLimit={setLimit}
            />
            <Events
                pageName={'EventAdmin'}
                events={events}
                handleAction={reducer}
                message={message}
                setMessage={setMessage}
            />

        </EventsSection>
    )
}

export default EventsAdmin