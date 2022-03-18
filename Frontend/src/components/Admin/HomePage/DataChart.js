import React, { useEffect, useState } from 'react'
import backend from '../../../services/ConnectWithBackend'
import ErrorNotice from '../../ErrorNotice'
import { SetDataDiv } from './HomePageStyles'
import { Doughnut } from 'react-chartjs-2'
import { darkGray, darkRed, lightGray } from '../../../services/colors'

const DataChart = () => {
    const [data, setData] = useState(undefined)
    const [messageMini, setMessageMini] = useState(undefined)
    useEffect(() => {
        backend
            .getForAdmin()
            .then(response => {
                const events = response.data.data
                console.log("events", events)
                const dataChart = {
                    labels: [
                        events[0].title,
                        events[1].title,
                        events[2].title
                    ],
                    datasets: [{
                        label: 'My First Dataset',
                        data: [
                            events[0].subscribers.length,
                            events[1].subscribers.length,
                            events[2].subscribers.length
                        ],
                        backgroundColor: [
                            lightGray,
                            darkGray,
                            darkRed
                        ],
                        hoverOffset: 4
                    }]
                }
                setData(dataChart)
            })
            .catch(error => {
                console.log("error data chart", error.response.data.error)
                setMessageMini(error.response.data.error)
            })
    }, [])
    return (
        <SetDataDiv>
            {
                data.length
                    ?
                    <Doughnut data={data} />
                    :
                    <>
                        <img src={process.env.PUBLIC_URL + '/assets/images/loadingTirangles.gif'} alt='loading' width='32px' height='32px' />
                        <h3>No data</h3>
                    </>
            }
            {
                messageMini !== undefined
                    ? <ErrorNotice
                        style={{ marginTop: '20px;' }}
                        message={messageMini}
                        clearError={() => setMessageMini(undefined)}
                        type={1}
                    />
                    : ''
            }
        </SetDataDiv>
    )
}

export default DataChart