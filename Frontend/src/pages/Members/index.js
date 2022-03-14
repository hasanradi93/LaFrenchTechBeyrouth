import React from 'react'
import Navbar from '../../components/Navbar'
import Members from '../../components/Members'
import Star from '../../components/Star'
import Footer from '../../components/Footer'

const MembersPage = () => {
    return (
        <>
            <Navbar />
            <Star
                backImg={process.env.PUBLIC_URL + '/assets/images/MemebrsPageHeader.jpg'}
                pageName={'Members'}
                heightSection="65vh"
                heightImg="63vh"
                fontSizeHeader="80px"
                fontSizeText="40px"
            />
            <Members pageName={'Members'} />
            <Footer />
        </>
    )
}

export default MembersPage