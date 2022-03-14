import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Row } from '../../services/globalStyles'
import { MainHeading1Edited, TextWrapperEdited, OurLocationSection } from './AboutStyles'
import { useTranslation } from 'react-i18next'
import { darkGray, lightGray } from '../../services/colors'
import GoogleMapBox from '../GoogleMapBox'
const OurLocation = () => {
    const { t } = useTranslation()
    const [offsetY, setOffsetY] = useState()
    const handleOffsetY = () => setOffsetY(window.pageYOffset)
    const { ref, inView } = useInView({
        rootMargin: '-50px',
    })

    useEffect(() => {
        window.addEventListener('scroll', handleOffsetY)
        console.log("inviewww", inView)
        console.log("offsetYoffsetYoffsetY", offsetY)
        return () => window.removeEventListener('scroll', handleOffsetY)
    }, [inView])

    return (
        <OurLocationSection id="ourLocation" ref={ref} mt={"5px"} mb={"100px"} ml={"auto"} mr={"auto"} width={"80%"} backgroundColor={darkGray}>
            <Row padding={"10px"}>
                <MainHeading1Edited
                    textAlign={"right"}
                    fontSize={'6rem'}
                    textTransform={'capitalize'}
                    transform={inView ? (offsetY / 12) : 0}
                    color={lightGray}
                >
                    {t('About.ourLocation.title')}
                </MainHeading1Edited>
            </Row>
            <Row>
                <TextWrapperEdited
                    fontSize={"1rem"}
                    transform={inView ? offsetY / 12 : 0}
                >
                    {t('About.ourLocation.text')}
                </TextWrapperEdited>
            </Row>
            <Row>
                <GoogleMapBox X={234343.43543} Y={3442.243432} />
            </Row>
        </OurLocationSection >
    )
}

export default OurLocation