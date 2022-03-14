import React from 'react'
import Navbar from '../../components/Navbar'
import Star from '../../components/Star'
import Footer from '../../components/Footer'
import EventsWallpaperPage from '../../components/Events/EventsWallpaperPage'
const EventsPage = () => {
    return (
        <>
            <Navbar />
            <Star
                backImg={process.env.PUBLIC_URL + '/assets/images/EventsPageHeader.jpg'}
                pageName={'Events'}
                heightSection="65vh"
                heightImg="63vh"
                fontSizeHeader="80px"
                fontSizeText="40px"
            />
            <EventsWallpaperPage pageName={'Events'} />
            <Footer />
        </>
    )
}

export default EventsPage