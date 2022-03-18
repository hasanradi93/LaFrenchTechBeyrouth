import React from 'react'
import {
    FilterSection
    , ButtonInEvents
    , ColumnFilter
    , CMBFilter
    , SpanSide
    , DivTwoSide
} from './SubscribersStyles'
import { cmbFilter, limit } from '../../../data/FilterInAdminSubscribers'
import { FaSearch } from 'react-icons/fa'

const FilterSectionData = ({ filterBy, setFilterBy, searchData1, setSearchData1, setLimit, handleAction }) => {
    const iconStyle = (Icon) => <Icon />
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
                    (Number(filterBy) === 1 || Number(filterBy) === 2)
                        ? (
                            <DivTwoSide>
                                <SpanSide>
                                    <CMBFilter onChange={(e) => setSearchData1(e.target.value)}>
                                        <option key={0} value='0'>Order by</option>
                                        <option key={1} value='asc'>Asc</option>
                                        <option key={2} value='desc'>Desc</option>
                                    </CMBFilter>
                                </SpanSide>
                            </DivTwoSide>
                        )
                        : ''
                }
            </ColumnFilter>
            {
                (Number(filterBy) === 1 || Number(filterBy) === 2)
                    ? (
                        <ColumnFilter>
                            <SpanSide>
                                <CMBFilter onChange={(e) => setLimit(e.target.value)}>
                                    <option key={-1} value={-1} selected disabled>Max. result</option>
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
                filterBy > 0 ? <ColumnFilter><ButtonInEvents onClick={() => handleAction()}>{iconStyle(FaSearch)}</ButtonInEvents></ColumnFilter> : ''
            }
        </FilterSection>
    )
}

export default FilterSectionData