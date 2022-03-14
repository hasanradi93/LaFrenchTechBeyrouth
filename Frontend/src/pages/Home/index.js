import React from 'react'
import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import WhoWeAre from '../../components/WhoWeAre'
import WhatWeDo from '../../components/WhatWeDo'
import WorldIsGlobal from '../../components/WorldIsGlobal'
import Events from '../../components/Events'
import Footer from '../../components/Footer'

const HomePage = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <WhoWeAre />
            <WhatWeDo pageName={'Home'} />
            <WorldIsGlobal />
            <Events pageName={'Home'} width={'100%'} />
            <Footer />
        </>
    )
}

export default HomePage