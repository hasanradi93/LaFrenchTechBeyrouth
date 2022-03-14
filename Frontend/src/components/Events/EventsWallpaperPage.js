import React, { useEffect } from 'react'
import { Parallax } from 'react-parallax'
import Events from '../../components/Events'
import { darkGray, lightGray, lightRed } from '../../services/colors'
import TitlesAndSubTitles from '../TitlesAndSubtitles'
const EventsWallpaperPage = ({ pageName }) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Parallax className='image' blur={0} bgImage={''} strength={2000} bgImageStyle={{ minHeight: "100vh" }}>
                <TitlesAndSubTitles pageName={pageName} index={1} mt={'0px'} mb={'0px'} width={'100%'} bC={lightGray} colorMainTitle={darkGray} opacity={1} zIndex={9} heightDesktop={'25vh'} heightMobile={'25vh'} />
            </Parallax>
            <Parallax className='image' blur={0} bgImage={''} strength={1700} bgImageStyle={{ minHeight: "100vh" }} style={{ backgroundColor: darkGray }}>
                <Events id="upComingEvents" pageName={pageName} width={'75%'} />
            </Parallax>
            <Parallax className='image' blur={0} bgImage={''} strength={700} bgImageStyle={{ minHeight: "100vh" }}>
                <TitlesAndSubTitles pageName={pageName} index={2} mt={'0px'} mb={'0px'} width={'100%'} bC={lightGray} colorMainTitle={lightRed} opacity={1} zIndex={9} heightDesktop={'35vh'} heightMobile={'25vh'} />
            </Parallax>
        </>
    )
}

export default EventsWallpaperPage