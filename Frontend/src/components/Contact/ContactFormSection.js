import React, { useEffect } from 'react'
import { Container, Section } from '../../services/globalStyles'
import {
    ContentRow,
    Subtitle,
    ImgWrapper,
    Img,
    ContentColumn
} from '../Content/ContentStyles'

import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { white } from '../../services/colors'
import { useTranslation } from 'react-i18next'
import ContactForm from './ContactForm'

export const ContactFormSection = () => {
    const { t } = useTranslation()
    const initial = { opacity: 0, y: 30 };
    const transition = { delay: 0.3, duration: 0.6 };
    const animation = useAnimation();

    const { ref, inView } = useInView({ threshold: 0.2 });

    useEffect(() => {
        if (inView) {
            animation.start({
                opacity: 1,
                y: 0,
            });
        }
    }, [inView, animation])

    return (
        <Section
            id="contactBody"
            backgroundColor={white}
            ref={ref}
            padding={'100px 10px'}>
            <Container>
                <ContentRow>
                    <ContentColumn>
                        <ContactForm />
                    </ContentColumn>
                    <ContentColumn
                        initial={initial}
                        transition={transition}
                        animate={animation}
                    >
                        <Subtitle
                            initial={initial}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            animate={animation}
                            fontSize={'1.7rem'}
                            lineHeight={'35px'}
                        >
                            {t('Contact.titleBesideForm')}
                        </Subtitle>
                        <Tilt className="Tilt" options={{ max: 20, scale: 1.01, speed: 5000 }}>
                            <ImgWrapper background={'linear-gradient(104deg,rgba(151,147,218,1) 0%, rgba(183,137,205,1) 100%)'}>
                                <Img
                                    src={process.env.PUBLIC_URL + '/assets/images/ContactsUsContent.png'}
                                    alt={'Contact Us'}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </ImgWrapper>
                        </Tilt>
                    </ContentColumn>
                </ContentRow>
            </Container>
        </Section>
    );
};
