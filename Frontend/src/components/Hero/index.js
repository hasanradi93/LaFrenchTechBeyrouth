import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Row,
    Column,
    Button,
    MainHeading1,
    MainHeading2,
    TextWrapper
} from '../../services/globalStyles'
import {
    HeroSection,
    HeroVideo,
    ButtonWrapper,
    HeroButton,
    BannerFadeButton
} from './HeroStyles'
import Modal from '../Modal'
import { useInView } from 'react-intersection-observer'
import { FiMail } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useAnimation } from 'framer-motion'

const Hero = ({ pageName }) => {
    const { t } = useTranslation()
    const videoUrl = process.env.PUBLIC_URL + '/assets/videos/Video-Background-FrenchTechV3.mp4'
    const [showModal, setShowModal] = useState(false)
    const toggleModal = () => {
        showModal ?
            document.body.style.overflow = 'hidden'
            :
            document.body.style.overflow = 'visible'

        setShowModal(!showModal)
    }

    const { ref, inView } = useInView({
        rootMargin: '-100px'
    }, { threshold: 0.2 })
    const scrollTo = (id) => {
        const element = document.getElementById(id);

        element.scrollIntoView({
            behavior: 'smooth',
        });
    }

    const initial = { opacity: 0, y: 300 };
    const transition = { delay: 3.3, duration: 5.6 };
    const animation = useAnimation();


    useEffect(() => {
        if (inView) {
            animation.start({
                opacity: 1,
                y: 0,
            });
        }
    }, [inView, animation])

    return (
        <>
            <HeroSection id="hero" ref={ref}>
                <HeroVideo src={videoUrl} autoPlay muted loop type="video/mp4" />
                <Row justify="center" align="center" height="100%" width="100%" mt="10%" padding="2rem">
                    <Column align="center" mb="10%" width="100%">
                        <MainHeading1 inverse={inView ? 1 : 0} color={'white'}>{t('Hero.mainHeading')}</MainHeading1>
                        <MainHeading2
                            inverse={inView ? 1 : 0}
                            initial={initial}
                            transition={transition}
                            animate={animation}
                        >
                            LA FRENCH TECH Beyrouth
                        </MainHeading2>
                        <TextWrapper mb="5%" fontSize="22px" textAlign="center">
                            {t('Hero.text')}
                        </TextWrapper>
                        <ButtonWrapper>
                            <Link to="#whoWeAre" onClick={() => scrollTo('whoWeAre')}>
                                <Button inverse={inView ? 1 : 0}>{t('Hero.getStartedBtn')}</Button>
                            </Link>
                            <Button inverse={inView ? 1 : 0} onClick={toggleModal} className={inView ? '' : 'corner'}>
                                {t('Hero.contactBtn')}
                            </Button>
                            <HeroButton style={{ opacity: inView ? 0 : 1 }} onClick={toggleModal} className={inView ? '' : 'corner'}>
                                {inView ? (
                                    <> {t('Hero.chatBtn')}</>
                                ) : (
                                    <FiMail color="white" size="2.3rem" />
                                )}
                            </HeroButton>
                        </ButtonWrapper>
                    </Column>
                </Row>
                <BannerFadeButton />
            </HeroSection>
            <Modal showModal={showModal} toggleModal={toggleModal} openedBy={'Contact'} />
        </>
    )
}

export default Hero