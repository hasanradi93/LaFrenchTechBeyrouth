import React, { useEffect, useState } from 'react'
import ErrorNotice from '../../ErrorNotice'
import SubscriberCard from './SubscriberCard'
import { SubscrbiersAdminSection, SubscribersTable, TitlePage } from './SubscribersStyles'
import backend from '../../../services/ConnectWithBackend'
import FilterSectionData from './FilterSection'
const SubscribersAdmin = ({ titlePage, titlePageSize }) => {
    const [theTitle, setTheTitle] = useState('null')
    const [titleSize, setTitleSize] = useState(null)
    const [subscrbiers, setSubscribers] = useState(null)
    const [filterBy, setFilterBy] = useState(0)
    const [searchData1, setSearchData1] = useState(null)
    const [limit, setLimit] = useState(0)
    const [message, setMessage] = useState()

    useEffect(() => {
        getSubscribers()
        setTheTitle(titlePage)
        setTitleSize(titlePageSize)
    }, [])

    const handleAction = () => {
        let data = ``
        let yourSearch = ``
        let send = false
        if (Number(filterBy) === 0) {
            setTheTitle('Please choose a method to filter')
            setTitleSize('1.5rem')
        }
        else if (Number(filterBy) === 1 || Number(filterBy) === 2) {
            if (!searchData1 || searchData1 === -1) {
                setTheTitle('Please choose ascending or descending')
                setTitleSize('1.5rem')
            }
            else {
                let field = 'createdAt'
                let filetTitle = 'Creation date'
                if (Number(filterBy) === 2) {
                    field = 'events'
                    filetTitle = 'Events'
                }
                data = `field=${field}&order=${searchData1}&nbLimit=${limit}`
                yourSearch = `Filter:${filetTitle} - method=${searchData1} - limit=${limit}`
                send = true
            }
        }
        if (send) {
            setTheTitle(yourSearch)
            setTitleSize('1.5rem')
            searchSubscribers(data)
        }
        let intervalData = setInterval(() => {
            setMessage(undefined)
            clearInterval(intervalData)
        }, 7000)
    }

    const getSubscribers = () => {
        backend
            .getSubscribers('LaFrenchTechToken')
            .then(response => {
                console.log("response data for get subscribers", response.data.data)
                setSubscribers(response.data.data)
            })
            .catch(error => {
                console.log("Error get subcribers", error)
                setMessage(error.response.data.error)
            })
    }
    const searchSubscribers = (textSearch) => {
        backend
            .searchSubscribers('LaFrenchTechToken', textSearch)
            .then(response => {
                console.log("response data for search subscribers", response.data.data)
                setSubscribers(response.data.data)
            })
            .catch(error => {
                console.log("Error search subcribers", error)
                setMessage(error.response.data.error)
            })
    }

    return (
        <SubscrbiersAdminSection>
            <TitlePage fontSize={Number(filterBy) > 0 ? titleSize : titlePageSize}>{Number(filterBy) > 0 ? theTitle : titlePage}</TitlePage>
            <FilterSectionData
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                searchData1={searchData1}
                setSearchData1={setSearchData1}
                handleAction={handleAction}
                setLimit={setLimit}
            />
            {
                message === undefined
                    ? (
                        subscrbiers !== null

                            ? <SubscribersTable>
                                <tbody>
                                    {subscrbiers.map((subscriber, index) => (
                                        <SubscriberCard key={index} nbRow={index} data={subscriber} />
                                    ))}
                                </tbody>
                            </SubscribersTable>
                            : <img src={process.env.PUBLIC_URL + '/assets/images/loadingTirangles.gif'} width='32px' height='32px' alt='loading' />
                    )
                    : <ErrorNotice
                        message={message}
                        fontSize={'1rem'}
                        clearError={() => setMessage(undefined)}
                        type={0}
                    />
            }
        </SubscrbiersAdminSection>
    )
}

export default SubscribersAdmin