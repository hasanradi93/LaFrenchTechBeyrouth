import React from 'react'
import { Parallax } from 'react-parallax'
import { darkGray, lightGray } from '../../services/colors'
import TitlesAndSubTitles from '../TitlesAndSubtitles'
import { ContactFormSection } from './ContactFormSection'
import FAQ from './FAQ'

const Contact = ({ pageName }) => {
    return (
        <>
            <Parallax className='image' blur={0} bgImage={''} strength={2000} bgImageStyle={{ minHeight: "100vh", marginTop: '-3px' }}>
                <TitlesAndSubTitles pageName={pageName} index={3} mt={'0px'} mb={'0px'} width={'100%'} bC={lightGray} colorMainTitle={darkGray} opacity={1} zIndex={9} heightDesktop={'26vh'} heightMobile={'28vh'} />
            </Parallax>
            <Parallax className='image' blur={0} bgImage={''} strength={-200} bgImageStyle={{ minHeight: "100vh" }}>
                <ContactFormSection />
            </Parallax>
            <Parallax className='image' blur={0} bgImage={''} strength={900} bgImageStyle={{ minHeight: "100vh" }}>
                <FAQ />
            </Parallax>
        </>
    )
}

export default Contact