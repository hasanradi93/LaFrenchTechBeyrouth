import React from 'react'
import Navbar from '../../components/Navbar'
import Star from '../../components/Star'
import About from '../../components/About'
import Footer from '../../components/Footer'
const AboutPage = () => {
    return (
        <>
            <Navbar />
            <Star
                backImg={process.env.PUBLIC_URL + '/assets/images/AboutPageHeader.jpg'}
                pageName={'About'}
                heightSection="65vh"
                heightImg="63vh"
                fontSizeHeader="80px"
                fontSizeText="40px"
            />
            <About />
            <Footer />
        </>
    )
}

export default AboutPage