import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Section as WorldIsGlobalSection, Row, SecondHeading } from '../../services/globalStyles'
import { Img, MainHeading1Edited } from './WorldIsGlobalStyles'
import { useTranslation } from 'react-i18next'
import { darkRed, lightGray } from '../../services/colors'
const WorldIsGlobal = () => {
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

    const worldIsGlobal = process.env.PUBLIC_URL + '/assets/images/worldIsGlobal.png'
    return (
        <WorldIsGlobalSection id="worldIsGlobal" ref={ref} mt={"5px"} mb={"100px"} height={"130vh"}>
            <Row padding={"10px"}>
                <MainHeading1Edited
                    textAlign={"right"}
                    fontSize={'6rem'}
                    textTransform={'capitalize'}
                    transform={inView ? (offsetY / 10) : 0}
                    color={lightGray}
                >
                    {t('WorldIsGlobal.mainHeading')}
                </MainHeading1Edited>
            </Row>
            <Row>
                <SecondHeading
                    fontWeight={"600"}
                    mt={"-70px"}
                    fontSize={"4rem"}
                    transform={inView ? (offsetY / 5.5) : 0}
                    color={darkRed}
                >
                    {t('WorldIsGlobal.secondHeading')}
                </SecondHeading>
            </Row>
            <Row>
                <Img src={worldIsGlobal} />
            </Row>
        </WorldIsGlobalSection >
    )
}

export default WorldIsGlobal