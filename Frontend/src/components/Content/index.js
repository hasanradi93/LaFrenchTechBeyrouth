import React, { useEffect, useState } from 'react';
import { Container, Section, Button, LinkText } from '../../services/globalStyles';
import {
    ContentRow,
    TextWrapperContent,
    TopLine,
    Heading,
    Subtitle,
    ImgWrapper,
    Img,
    ContentColumn
} from './ContentStyles.js';

import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import Tilt from 'react-parallax-tilt'
import { darkGray, lightRed, white } from '../../services/colors';
import Modal from '../Modal';
import { useTranslation } from 'react-i18next'

export const Content = ({
    img,
    alt,
    backgroundColor,
    inverse,
    reverse,
    addLink,
    linkTo,
    inModal,
    animateImg,
    addButton,
    linkButton,
    pageName,
    contentIndex
}) => {
    const { t } = useTranslation()
    const data = t("About.Contents", { returnObjects: true })
    const [showModal, setShowModal] = useState(false)
    const toggleModal = () => {
        showModal ?
            document.body.style.overflow = 'hidden'
            :
            document.body.style.overflow = 'visible'

        setShowModal(!showModal)
    }

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
    }, [inView, animation]);

    return (
        <Section
            backgroundColor={inverse ? darkGray : white}
            ref={ref}
            padding={'100px 10px'}>
            <Container>
                <ContentRow reverse={reverse}>
                    <ContentColumn>
                        <TextWrapperContent>
                            <TopLine
                                initial={initial}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                animate={animation}
                            >
                                {data[contentIndex].topLine}
                            </TopLine>
                            <Heading
                                initial={initial}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                animate={animation}
                                inverse={inverse}
                            >
                                {data[contentIndex].headline}
                            </Heading>
                            <Subtitle
                                initial={initial}
                                transition={{ delay: 0.7, duration: 0.6 }}
                                animate={animation}
                                inverse={inverse}
                            >
                                {data[contentIndex].description}
                            </Subtitle>
                            <>
                                {addButton
                                    ? <Button
                                        initial={initial}
                                        transition={{ delay: 1, duration: 0.6 }}
                                        animate={animation}
                                        inverse={inverse}
                                        to={linkButton}
                                    >
                                        {data[contentIndex].buttonLabel}
                                    </Button>
                                    : ''
                                }
                            </>
                            <>
                                {addLink
                                    ? (
                                        <LinkText
                                            onClick={inModal ? toggleModal : ''}
                                            to={inModal ? '' : linkTo}
                                            color={inverse ? white : lightRed}
                                        >
                                            → {data[contentIndex].linkLabel}
                                        </LinkText>
                                    )
                                    : ''
                                }
                            </>
                        </TextWrapperContent>
                    </ContentColumn>
                    {animateImg
                        ? <ContentColumn
                            initial={initial}
                            transition={transition}
                            animate={animation}
                        >
                            <Tilt className="Tilt" options={{ max: 20, scale: 1.01, speed: 200 }}>
                                <ImgWrapper background={backgroundColor}>
                                    <Img
                                        src={img}
                                        alt={alt}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </ImgWrapper>
                            </Tilt>
                        </ContentColumn>
                        : <ContentColumn>
                            <ImgWrapper background={backgroundColor}>
                                <Img
                                    src={img}
                                    alt={alt}
                                />
                            </ImgWrapper>
                        </ContentColumn>}
                </ContentRow>
            </Container>
            {inModal ? <Modal showModal={showModal} toggleModal={toggleModal} openedBy={pageName} pageName={pageName} data={linkTo} /> : <></>}
        </Section >
    );
};
