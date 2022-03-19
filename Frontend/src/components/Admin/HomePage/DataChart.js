import React, { useEffect, useState } from 'react'
import backend from '../../../services/ConnectWithBackend'
import ErrorNotice from '../../ErrorNotice'
import { SetDataDiv, SecondHeadingEdited } from './HomePageStyles'
import 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { darkRed, lightGray, lightRed,white } from '../../../services/colors'

const DataChart = () => {
    const [data, setData] = useState(undefined)
    const [messageMini, setMessageMini] = useState(undefined)
    useEffect(() => {
        backend
            .getForChart('LaFrenchTechToken')
            .then(response => {
                const events = response.data.data
                let labels = []
                let subscribers = []
                let colors = []
                let i = 0
                events.forEach(event => {
                    labels.push(event.title)
                    subscribers.push(event.subscribers.length)
                    if (i % 2 === 0)
                        colors.push(darkRed)
                    else
                        colors.push(lightRed)
                    i++
                });
                const dataChart = {
                    labels: labels,
                    datasets: [{
                        label: 'Number of Subscribers/Event',
                        data: subscribers,
                        backgroundColor: colors,
                        hoverOffset: 4
                    }]
                }
                setData(dataChart)
            })
            .catch(error => setMessageMini(error.response.data.error))
    }, [])
    return (
        <SetDataDiv height={'height'} mb={'100px'} background={lightGray}>
            {
                data
                    ?
                    <>
                        <SecondHeadingEdited
                            fontSize={'1.5rem'}
                            color={white}
                        >
                            Line Chart: Count of Subscribers/Event
                        </SecondHeadingEdited>
                        <Chart type='line' data={data} />
                    </>
                    :
                    <>
                        <img src={process.env.PUBLIC_URL + '/assets/images/loadingTirangles.gif'} alt='loading' width='32px' height='32px' />
                        <h3>No data events</h3>
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