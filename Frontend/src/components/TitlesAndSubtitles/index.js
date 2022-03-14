import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Row } from '../../services/globalStyles'
import { MainHeading1Edited, TextWrapperEdited, TitlesAndSubTitlesSection } from './TitlesAndSubTitlesStyles'
import { useTranslation } from 'react-i18next'
const TitlesAndSubTitles = ({ pageName, index, mt, mb, width, bC, colorMainTitle, opacity, zIndex, heightDesktop, heightMobile }) => {
    const { t } = useTranslation()
    const [offsetY, setOffsetY] = useState()
    const handleOffsetY = () => setOffsetY(window.pageYOffset)
    const { ref, inView } = useInView({
        rootMargin: '-50px',
    })

    useEffect(() => {
        window.addEventListener('scroll', handleOffsetY)
        console.log("pageNameeee", pageName)
        console.log("inviewww", inView)
        console.log("offsetYoffsetYoffsetY", offsetY)
        return () => window.removeEventListener('scroll', handleOffsetY)
    }, [inView])

    return (
        <TitlesAndSubTitlesSection
            id={'titleAndSubTitle' + index}
            ref={ref}
            mt={mt}
            mb={mb}
            ml={"auto"}
            mr={"auto"}
            width={width}
            backgroundColor={bC}
            opacity={opacity}
            zIndex={zIndex}
            heightDesktop={heightDesktop}
            heightMobile={heightMobile}>
            <Row padding={"10px"}>
                <MainHeading1Edited
                    textAlign={"right"}
                    fontSize={'4rem'}
                    textTransform={'capitalize'}
                    transform={inView ? (offsetY / 12) : 0}
                    color={colorMainTitle}
                >
                    {
                        pageName === "Events"
                            ? (index === 1 ? t('Events.mainHeading_events_1') : t('Events.mainHeading_events_2'))
                            : (
                                pageName === "Contact"
                                    ? t('Contact.mainHeading_underForm')
                                    : (
                                        pageName === "Members"
                                            ? t('Members.Members_mainHeading')
                                            : ''
                                    )
                            )
                    }
                </MainHeading1Edited>
            </Row>
            <Row>
                <TextWrapperEdited
                    fontSize={"1.5rem"}
                    transform={inView ? offsetY / 12 : 0}
                    textAlign={pageName === "Events" ? 'justify' : (pageName === "Contact" ? 'left' : 'center')}
                    textJustify={pageName === "Events" ? ' inter-word' : (pageName === "Contact" ? ' inter-word' : 'center')}
                    width={pageName === "Events" ? ' 60%' : (pageName === "Contact" ? ' 90%' : '100%')}
                    margin={pageName === "Events" ? ' 15px' : (pageName === "Contact" ? ' 2px' : 'auto')}
                >
                    {
                        pageName === "Events"
                            ? (index === 1 ? t('Events.secondHeading_events_1') : t('Events.secondHeading_events_2'))
                            : (
                                pageName === "Contact"
                                    ? t('Contact.secondHeading_underForm')
                                    : (
                                        pageName === "Members"
                                            ? t('Members.Members_secondHeading')
                                            : ''
                                    )
                            )
                    }
                </TextWrapperEdited>
            </Row>
        </TitlesAndSubTitlesSection >
    )
}

export default TitlesAndSubTitles