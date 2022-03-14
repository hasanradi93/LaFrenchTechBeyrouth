import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTranslation } from 'react-i18next'
import TextBlock from './TextBlock'
import SvgBlock from "./SvgBlock"
import {
    WhatWeDoSection,
    Background,
    Line,
    Triangle,
    Content,
    OBJPyramide,
    OBJTriangle,
    OBJRotate
} from './WhatWeDoStyles'
import { MainHeading2, LinkText } from '../../services/globalStyles'
import { lightRed, white } from '../../services/colors'
const WhatWeDo = () => {
    const { t } = useTranslation()
    const title = t('WhatWeDo.title')
    const data = t('WhatWeDo.data', { returnObjects: true })
    const PyramideImg = process.env.PUBLIC_URL + '/assets/images/3dPyramide.png'
    const TriangleImg = process.env.PUBLIC_URL + '/assets/images/3dTriangle.png'
    const TrianglesCIrclesImg = process.env.PUBLIC_URL + '/assets/images/TrianglesCircle.png'

    const ref = useRef(null)
    gsap.registerPlugin(ScrollTrigger)
    const revealRefs = useRef([])
    revealRefs.current = []

    useEffect(() => {
        const element = ref.current
        ////returns a new MediaQueryList object that can then be used to determine if the document matches the media query string, as well as to monitor the document to detect when it matches (or stops matching) that media query.
        const mq = window.matchMedia("(max-width: 48em)")
        const t1 = gsap.timeline({
            scrollTrigger: {
                trigger: document.getElementById("whatWeDo"),
                start: "top top+=60",
                end: "bottom bottom+300",
                pin: element,
                pinReparent: true,
            },
        })
        t1.fromTo(
            document.getElementById("line"),

            {
                height: "15rem",
            },
            {
                height: "3rem",
                duration: 2,
                scrollTrigger: {
                    trigger: document.getElementById("line"),
                    start: "top top+=200",
                    end: "bottom top+=220",
                    scrub: true,
                },
            }
        )
        revealRefs.current.forEach((el, index) => {
            if (mq.matches) {
                t1.from(
                    el.childNodes[0],

                    {
                        x: -300,
                        opacity: 0,
                        duration: 2,
                        ease: "power2",
                        scrollTrigger: {
                            id: `section-${index + 1}`,
                            trigger: el,
                            start: "top center+=200",
                            end: "bottom bottom-=100",
                            scrub: true,
                            snap: true,
                        },
                    }
                )
                    .to(el.childNodes[1], {
                        transform: "scale(0)",
                        ease: "power2.inOut",
                        scrollTrigger: {
                            id: `section-${index + 1}`,
                            trigger: el.childNodes[1],
                            start: "top center",
                            end: "bottom center",
                            scrub: true,
                            snap: true,
                        },
                    })
                    .from(
                        el.childNodes[2],

                        {
                            y: 400,
                            duration: 2,
                            ease: "power2",
                            scrollTrigger: {
                                id: `section-${index + 1}`,
                                trigger: el,
                                start: "top center+=100",
                                end: "bottom bottom-=200",
                                scrub: true,
                                snap: true,
                            },
                        }
                    )
                    .to(
                        el,

                        {
                            opacity: 0,
                            ease: "power2",
                            scrollTrigger: {
                                id: `section-${index + 1}`,
                                trigger: el,
                                start: "top top+=300",
                                end: "center top+=300",
                                scrub: true,
                            },
                        }
                    );
            } else {
                t1.from(
                    el.childNodes[0],

                    {
                        x: -300,
                        opacity: 0,
                        duration: 2,
                        ease: "power2",
                        scrollTrigger: {
                            id: `section-${index + 1}`,
                            trigger: el,
                            start: "top center+=100",
                            end: "bottom bottom-=200",
                            scrub: true,
                            snap: true,
                        },
                    }
                )
                    .to(el.childNodes[1], {
                        transform: "scale(0)",
                        ease: "power2.inOut",
                        scrollTrigger: {
                            id: `section-${index + 1}`,
                            trigger: el.childNodes[1],
                            start: "top center",
                            end: "bottom center",
                            scrub: true,
                            snap: true,
                        },
                    })
                    .from(
                        el.childNodes[2],
                        {
                            y: 400,
                            duration: 2,
                            ease: "power2",
                            scrollTrigger: {
                                id: `section-${index + 1}`,
                                trigger: el,
                                start: "top center+=100",
                                end: "bottom bottom-=200",
                                scrub: true,
                                snap: true,
                            },
                        }
                    )
                    .to(
                        el,

                        {
                            opacity: 1,
                            ease: "power2",
                            scrollTrigger: {
                                id: `section-${index + 1}`,
                                trigger: el,
                                start: "top top+=200",
                                end: "center top+=300",
                                scrub: true,
                            },
                        }
                    );
            }
        });
    }, [])

    const addToRefs = (el) => {
        if (el && !revealRefs.current.includes(el)) {
            revealRefs.current.push(el);
        }
    }

    return (
        <WhatWeDoSection id="whatWeDo">
            <Background ref={ref}>
                <MainHeading2 inverse="1">{title}</MainHeading2>
                <Line id="line" />
                <Triangle id="tiangle" />
            </Background>
            <Content ref={addToRefs}>
                <TextBlock
                    topic={data[0].topic}
                    title={<h1>{data[0].title}</h1>}
                    subText={<h5>{data[0].subText}</h5>}
                />
                <OBJPyramide top="65%">
                    <img src={PyramideImg} alt="Pyramide Object" width="300" height="300" />
                </OBJPyramide>
                <SvgBlock svg="Design.svg" alt="Design" />
            </Content>
            <Content ref={addToRefs}>
                <TextBlock
                    topic={data[1].topic}
                    title={<h1>{data[1].title}</h1>}
                    subText={<h5>{data[1].subText}</h5>}
                />
                <OBJTriangle top="95%">
                    <img src={TriangleImg} alt="Tirangle Object" />
                </OBJTriangle>
                <SvgBlock svg="Develope.svg" alt="Develop" />
            </Content>
            <Content>
                <TextBlock
                    topic={data[2].topic}
                    title={<h1>{data[2].title}</h1>}
                    subText={<h5>{data[2].subText}</h5>}
                />
                <OBJRotate top="92%">
                    <img src={TrianglesCIrclesImg} alt="World Object" width="200" height="200" />
                </OBJRotate>
                <SvgBlock svg="Support.svg" alt="Support" />
            </Content>
            <div style={{ textAlign: 'right', color: white, width: '70%' }}>
                <LinkText
                    to='/startups'
                    color={white}
                >
                    → {t('WhatWeDo.bottomLink')}
                </LinkText>
            </div>
        </WhatWeDoSection>
    )
}

export default WhatWeDo