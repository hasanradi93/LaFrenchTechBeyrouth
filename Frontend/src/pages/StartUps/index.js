import React from 'react'
import Navbar from '../../components/Navbar'
import Star from '../../components/Star'
import StartUps from '../../components/StartUps'
import Footer from '../../components/Footer'

const StartUpsPage = () => {
    return (
        <>
            <Navbar />
            <Star
                backImg={process.env.PUBLIC_URL + '/assets/images/StartupsPageHeader.jpg'}
                pageName={'StartUps'}
                heightSection="65vh"
                heightImg="63vh"
                fontSizeHeader="80px"
                fontSizeText="40px"
            />
            <StartUps pageName={'StartUps'} />
            <Footer />
        </>
    )
}

export default StartUpsPage