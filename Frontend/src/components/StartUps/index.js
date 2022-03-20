import React, { useEffect } from 'react'
import { Container, LinkText } from '../../services/globalStyles'
import {
    SecondHeadingEdited
    , StartUpsSection
    , StartUpCard
    , ImgRow
    , Img
    , TitleRow
    , DescriptionRow
    , LinkRow
    , ContentRowEdited
} from './StartUpsStyles'
import {
    ContentRow
    , Subtitle
} from '../Content/ContentStyles'
import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MainHeading1Edited } from '../Contact/ContactStyles'
import { darkGray, darkRed, lightGray, lightRed } from '../../services/colors'
import { StartUpsImgsLink } from '../../data/StartUpsData'

const StartUps = () => {
    const { t } = useTranslation()
    const initial = { opacity: 0, y: 30 }
    const transition = { delay: 0.3, duration: 0.6 }
    const animation = useAnimation()
    const data = t('StartUps.StartUpsCompanies', { returnObjects: true })
    const { ref, inView } = useInView({ threshold: 0.2 })
    useEffect(() => {
        window.scrollTo(0, 0)
        if (inView) {
            animation.start({
                opacity: 1,
                y: 0,
            });
        }
    }, [inView, animation])

    return (
        <StartUpsSection style={{ marginTop: '-10px' }}>
            <Container
                padding={'15px'}
            >
                <ContentRow
                    initial={initial}
                    transition={transition}
                    animate={animation}
                >
                    <MainHeading1Edited
                        initial={initial}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        animate={animation}
                        fontSize={'2.8rem'}
                        lineHeight={'15px'}
                        color={lightRed}
                    >
                        {t('StartUps.StartUps_mainHeading')}
                    </MainHeading1Edited>
                </ContentRow>
                <ContentRow
                    initial={initial}
                    transition={transition}
                    animate={animation}
                    width={'70%'}
                >
                    <SecondHeadingEdited
                        initial={initial}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        animate={animation}
                        fontSize={'1.2rem'}
                        lineHeight={'5px'}
                        padding={'10px'}
                        mt={'25px'}
                        color={darkGray}
                    >
                        {t('StartUps.StartUps_secondHeading')}
                    </SecondHeadingEdited>
                </ContentRow>
                <ContentRow
                    initial={initial}
                    transition={transition}
                    animate={animation}
                    style={{ width: '100%' }}
                >
                    <Subtitle style={{ width: '100%' }}>
                        {t('StartUps.StartUps_note')}&nbsp;
                        <LinkText color={lightRed} to='/contact'>
                            {t('StartUps.StartUps_contactLink')}
                        </LinkText>
                    </Subtitle>
                </ContentRow>
            </Container>
            <Container
                initial={initial}
                transition={transition}
                animate={animation}
            >
                <ContentRowEdited
                    initial={initial}
                    transition={transition}
                    animate={animation}
                >
                    {data.map((data, index) => (
                        <StartUpCard
                            key={index}
                        >
                            <ImgRow>
                                <Img src={StartUpsImgsLink[index].img} />
                            </ImgRow>
                            <TitleRow>
                                {data.name}
                            </TitleRow>
                            <DescriptionRow>
                                {data.description}
                            </DescriptionRow>
                            <LinkRow>
                                <LinkText to={StartUpsImgsLink[index].link} color={lightGray}>
                                    {t('StartUps.linkLearnMore')}→
                                </LinkText>
                            </LinkRow>
                        </StartUpCard>
                    ))}
                </ContentRowEdited>
            </Container>
        </StartUpsSection>
    )
}

export default StartUps