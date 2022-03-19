import React, { useEffect } from 'react'
import { Parallax } from 'react-parallax'
import { contentOne, contentTwo, contentThree, contentFour, contentFive } from '../../data/AboutData'
import { Content } from '../Content'
import OurLocation from './OurLocation'
import TheySupportUS from './TheySupportUS'

const About = () => {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <>
            <Parallax className='image' blur={0} bgImage={''} strength={500} bgImageStyle={{ minHeight: "100vh" }} style={{ marginTop: '-10px' }}>
                <Content  {...contentOne} contentIndex={0} pageName="About" />
            </Parallax>
            <Parallax className='image' blur={0} bgImage={''} strength={800} bgImageStyle={{ minHeight: "100vh" }}>
                <Content {...contentTwo} contentIndex={1} pageName="About" />
            </Parallax>
            <Parallax className='image' blur={0} bgImage={''} strength={1000} bgImageStyle={{ minHeight: "100vh" }}>
                <Content {...contentThree} contentIndex={2} pageName="About" />
            </Parallax>
            <Parallax className='image' blur={0} bgImage={''} strength={600} bgImageStyle={{ minHeight: "100vh" }}>
                <Content {...contentFour} contentIndex={3} pageName="About" />
            </Parallax>
            <Parallax className='image' blur={0} bgImage={''} strength={900} bgImageStyle={{ minHeight: "100vh" }}>
                <Content {...contentFive} contentIndex={4} pageName="About" />
            </Parallax>
            <Parallax className='image' blur={0} bgImage={''} strength={400} bgImageStyle={{ minHeight: "100vh" }}>
                <OurLocation />
            </Parallax>
            <Parallax className='image' blur={0} bgImage={''} strength={400} bgImageStyle={{ minHeight: "100vh" }}>
                <TheySupportUS />
            </Parallax>
        </>
    )
}
//https://www.google.com/search?q=our+events+website+page+quotes&sxsrf=APq-WBv6Q9-sj3I_33lSfcSZ23vTbS4TuQ:1646761583275&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjFmM35iLf2AhUu4YUKHVOrDBIQ_AUoAXoECAEQAw&biw=1366&bih=657&dpr=1#imgrc=seLRNXlk3bbFBM&imgdii=FgJ9DIbwvnpShM
export default About
// “Let your advance worrying become advance thinking and planning.”  – Winston Churchill 
// “If Plan A didn’t work LA FRENCH TECH has 25 more for you."
// “Perfection is not attainable, but "La french tech" chase perfection and she can catch excellence.” – Vince Lombaridi
