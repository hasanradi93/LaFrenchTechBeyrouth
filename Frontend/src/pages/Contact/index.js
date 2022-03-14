import React from 'react'
import Navbar from '../../components/Navbar'
import Contact from '../../components/Contact'
import Footer from '../../components/Footer'
import Star from '../../components/Star'

const ContactPage = () => {
    return (
        <>
            <Navbar />
            <Star
                backImg={process.env.PUBLIC_URL + '/assets/images/ContactPageHeader.jpg'}
                pageName={'Contact'}
                heightSection="65vh"
                heightImg="63vh"
                fontSizeHeader="80px"
                fontSizeText="40px"
            />
            <Contact pageName={'Contact'} />
            <Footer />
        </>
    )
}

export default ContactPage