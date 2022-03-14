import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'react-i18next'
import {
    Row
    , Column
} from '../../services/globalStyles'
import {
    StarSection
    , StarImg
    , TextWrapperEdited
    , MainHeading2Edited
} from './StarStyles'

const Star = ({ backImg, pageName, heightSection, heightImg, fontSizeHeader, fontSizeText }) => {
    const { t } = useTranslation()
    const [offsetY, setOffsetY] = useState()
    const handleOffsetY = () => setOffsetY(window.pageYOffset)
    const { ref, inView } = useInView({
        rootMargin: '-100px',
    })
    useEffect(() => {
        window.addEventListener('scroll', handleOffsetY)
        console.log("fontSizeHeader", fontSizeHeader)
        console.log("heightSection", heightSection)
        return () => window.removeEventListener('scroll', handleOffsetY)
    }, [inView])

    return (
        <StarSection id="star" ref={ref} height={heightSection}>
            <StarImg src={backImg} height={heightImg} />
            <Row justify="center" align="center" height="100%" width="100%" mt="10%" padding="2rem">
                <Column align="center" mb="10%" width="100%">
                    <MainHeading2Edited
                        inverse={inView ? 1 : 0}
                        textTransform={'capitalize'}
                        fontSize={fontSizeHeader}
                        transform={inView ? offsetY : 0}
                    >
                        {t(`Star.${pageName}.title`)}
                    </MainHeading2Edited>
                    <TextWrapperEdited
                        mb="5%"
                        fontSize={fontSizeText}
                        transform={inView ? offsetY : 0}
                        opacity={inView ? 0 : 1}
                        textAlign="center">
                        {t(`Star.${pageName}.subTitle`)}
                    </TextWrapperEdited>
                </Column>
            </Row>
        </StarSection>
    )
}

export default Star