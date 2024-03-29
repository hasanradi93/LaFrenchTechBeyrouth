import React, { useState } from 'react'
import {
    FilterSection
    , ButtonInEvents
    , ColumnFilter
    , CMBFilter
    , InputBox
    , SpanSide
    , DivTwoSide
} from './EventsStyles'
import Modal from '../../Modal'
import { cmbFilter, months, lastFiveYears, limit } from '../../../data/FilterInAdminEvents'
import { FaRegPlusSquare, FaSearch } from 'react-icons/fa'

const FilterSectionData = ({ filterBy, setFilterBy, searchData1, setSearchData1, setSearchData2, setLimit, searchEvents, handleAction }) => {
    const iconStyle = (Icon) => <Icon />
    const [showModal, setShowModal] = useState(false)
    const toggleModal = () => {
        showModal ?
            document.body.style.overflow = 'hidden'
            :
            document.body.style.overflow = 'visible'
        document.body.style.overflow = 'visible'
        setShowModal(!showModal)
    }

    return (
        <FilterSection>
            <ColumnFilter>
                <CMBFilter onChange={(e) => setFilterBy(e.target.value)}>
                    {
                        cmbFilter.map((opt, index) => {
                            return <option key={index} value={index}>{opt}</option>
                        })
                    }
                </CMBFilter>
            </ColumnFilter>
            <ColumnFilter>
                {
                    (Number(filterBy) > 0 && Number(filterBy) < 2)
                        ? (
                            <DivTwoSide>
                                <SpanSide>
                                    <CMBFilter onChange={(e) => setSearchData1(e.target.value)}>
                                        <option key={-1} value={-1} selected disabled>Choose a month</option>
                                        {
                                            months.map((month, index) => {
                                                return <option key={index} value={index}>{month}</option>
                                            })
                                        }
                                    </CMBFilter>
                                </SpanSide>
                                <SpanSide>
                                    <CMBFilter onChange={(e) => setSearchData2(e.target.value)}>
                                        <option key={-1} value={-1} selected disabled>Choose a year</option>
                                        {
                                            lastFiveYears.map((year, index) => {
                                                return <option key={index} value={year}>{year}</option>
                                            })
                                        }
                                    </CMBFilter>
                                </SpanSide>
                            </DivTwoSide>
                        )
                        : (
                            (Number(filterBy) >= 2 && Number(filterBy) <= 3)
                                ? <InputBox placeholder={(Number(filterBy) === 2) ? ('Search by Title..') : ('Search by Address..')} type='text' value={searchData1} onChange={(e) => setSearchData1(e.target.value)} />
                                : (Number(filterBy) === 4
                                    ?
                                    <DivTwoSide>
                                        <SpanSide>
                                            <CMBFilter onChange={(e) => setSearchData1(e.target.value)}>
                                                <option key={0} value='0'>Order by</option>
                                                <option key={1} value='asc'>Asc</option>
                                                <option key={2} value='desc'>Desc</option>
                                            </CMBFilter>
                                        </SpanSide>
                                    </DivTwoSide>
                                    : (
                                        Number(filterBy) === 5
                                            ? <DivTwoSide>
                                                <SpanSide>
                                                    <CMBFilter onChange={(e) => setSearchData1(e.target.value)}>
                                                        <option key={0} value='0'>Get by</option>
                                                        <option key={1} value='1'>Active</option>
                                                        <option key={2} value='2'>Not Active</option>
                                                    </CMBFilter>
                                                </SpanSide>
                                            </DivTwoSide>
                                            : ''
                                    )
                                )
                        )
                }
            </ColumnFilter>
            {
                Number(filterBy) > 0
                    ? (
                        <ColumnFilter>
                            <SpanSide>
                                <CMBFilter onChange={(e) => setLimit(e.target.value)}>
                                    <option key={-1} value={-1} selected disabled>Max. events</option>
                                    {
                                        limit.map((nb, index) => {
                                            return <option key={index} value={nb}>{nb}</option>
                                        })
                                    }
                                </CMBFilter>
                            </SpanSide>
                        </ColumnFilter>
                    ) : ''
            }
            {
                filterBy > 0 ? <ColumnFilter><ButtonInEvents onClick={() => handleAction(null, 'Search')}>{iconStyle(FaSearch)}</ButtonInEvents></ColumnFilter> : ''
            }
            <ColumnFilter>
                <ButtonInEvents onClick={toggleModal}>{iconStyle(FaRegPlusSquare)}</ButtonInEvents>
            </ColumnFilter>
            <Modal showModal={showModal} toggleModal={toggleModal} openedBy={'EventAdmin'} pageName={handleAction} data={null} />
        </FilterSection>
    )
}

export default FilterSectionData