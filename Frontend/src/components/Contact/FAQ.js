import { useAnimation } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { white, darkRed, lightGray, darkGray } from '../../services/colors'
import {
    Column
    , Row
    , SecondHeading
} from '../../services/globalStyles'
import {
    FAQSetion
    , FAQWrapper
    , FormInput
    , FormInputRow
    , MainHeading1Edited
    , ArticleSection
    , ArticleTitle
    , AritcleData
    , ArticleHeader
    , ArticleHeaderQuestion
    , TitleToggleBtn
    , ArticleDescription
    , ArticleQuestionName
} from './ContactStyles'

const FAQ = () => {
    const { t } = useTranslation()
    const [searchFAQ, setSearchFAQ] = useState(null)
    const [findFAQ, setFindFAQ] = useState([])
    const initial = { opacity: 0, y: 30 };
    const transition = { delay: 0.3, duration: 0.6 };
    const animation = useAnimation()
    const [offsetY, setOffsetY] = useState()
    const { ref, inView } = useInView({ threshold: 0.2 });
    const handleOffsetY = () => setOffsetY(window.pageYOffset)

    useEffect(() => {
        getDataBySearch()

        if (inView) {
            setFindFAQ(t('Contact.FAQ', { returnObjects: true }))
            animation.start({
                opacity: 1,
                y: 0,
            });
        }
        window.addEventListener('scroll', handleOffsetY)
        return () => window.removeEventListener('scroll', handleOffsetY)
    }, [inView, animation])
    const searchFAQText = (value) => {
        setSearchFAQ(value)
        getDataBySearch()
    }

    const getDataBySearch = () => {
        const newFAQ = []
        let exist = false
        findFAQ.forEach((article) => {
            exist = false
            article.questions.forEach((question) => {
                if (question.questionName.includes(searchFAQ)) {
                    exist = true
                    question.toggleQuestion = true
                }
                else
                    question.toggleQuestion = false
            })
            if (exist)
                article.toggleTitle = true
            else
                article.toggleTitle = false
            newFAQ.push(article)
        })
        setFindFAQ(newFAQ)
    }

    const toggleTitleFunc = (titleWanted, toggleT) => {
        const newFAQ = []
        findFAQ.forEach((article) => {
            if (titleWanted === article.title) {
                article.toggleTitle = !toggleT
                console.log("arT", article.toggleTitle)
            }
            else {
                article.toggleTitle = false
            }
            article.questions.forEach((question) => {
                question.toggleQuestion = false
            })
            newFAQ.push(article)
        })
        setFindFAQ(newFAQ)
    }
    const toggleQuestionFunc = (questionWanted, toggleQ) => {
        const newFAQ = []
        let exist = false
        findFAQ.forEach((article) => {
            exist = false
            article.questions.forEach((question) => {
                if (question.questionName === questionWanted) {
                    exist = true
                    question.toggleQuestion = !toggleQ
                }
                else
                    question.toggleQuestion = false
            })
            if (exist)
                article.toggleTitle = true
            else
                article.toggleTitle = false
            newFAQ.push(article)
        })
        setFindFAQ(newFAQ)
    }
    return (
        <FAQSetion inverse={true} ref={ref}>
            <Column
                padding={'30px 0 30px'}
                justify-content={'center'}
            >
                <FAQWrapper
                    initial={initial}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    animate={animation}
                >
                    <Row padding={"10px"}>
                        <MainHeading1Edited
                            textAlign={"right"}
                            fontSize={'6rem'}
                            textTransform={'capitalize'}
                            transform={inView ? (offsetY / 15) : 0}
                            color={white}
                        >
                            {t('Contact.mainHeading_FAQ')}
                        </MainHeading1Edited>
                    </Row>
                    <Row>
                        <SecondHeading
                            fontWeight={"600"}
                            mt={"-70px"}
                            fontSize={"4rem"}
                            transform={inView ? (offsetY / 15) : 0}
                            color={darkRed}
                        >
                            {t('Contact.secondHeading_FAQ')}
                        </SecondHeading>
                    </Row>
                </FAQWrapper>
                <FAQWrapper style={{ width: '60%', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                    initial={initial}
                    transition={transition}
                    animate={animation}
                >
                    <FormInputRow style={{ width: '80%', textAlign: 'center' }}>
                        <FormInput type='text' style={{ textAlign: 'center' }} placeholder={t('Contact.searchFAQPlaceHolder')} value={searchFAQ} onChange={(e) => searchFAQText(e.target.value)} />
                    </FormInputRow>
                </FAQWrapper>
                <FAQWrapper
                    initial={initial}
                    transition={transition}
                    animate={animation}
                    width={'90%'}
                >
                    {
                        findFAQ.map((article, index) => (
                            <ArticleSection
                                initial={initial}
                                transition={{ delay: 0.3, duration: 0.3 }}
                                animate={animation}
                                key={index}
                            >
                                <ArticleHeader key={'AH' + index} backgroundTitle={article.toggleTitle ? darkGray : white} color={article.toggleTitle ? white : darkGray}>
                                    <ArticleTitle
                                        initial={initial}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                        animate={animation}
                                    >
                                        {article.title}
                                    </ArticleTitle>
                                    <TitleToggleBtn
                                        key={'TTB' + index}
                                        initial={initial}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                        animate={animation}
                                        onClick={() => toggleTitleFunc(article.title, article.toggleTitle)}
                                        color={article.toggleTitle ? white : darkGray}
                                    >
                                        {article.toggleTitle ? '-' : '+'}
                                    </TitleToggleBtn>
                                </ArticleHeader>
                                <AritcleData key={'AD' + index}>
                                    {
                                        article.questions.map((question, i) => (
                                            article.toggleTitle
                                                ? (
                                                    <>
                                                        <ArticleHeaderQuestion
                                                            key={i}
                                                            backgroundQuestion={article.toggleTitle ? lightGray : white}
                                                            initial={initial}
                                                            transition={{ delay: 0.5, duration: 0.6 }}
                                                            animate={animation}
                                                        >
                                                            <ArticleQuestionName
                                                                key={'AQN' + i}
                                                                initial={initial}
                                                                transition={{ delay: 0.5, duration: 0.6 }}
                                                                animate={animation}
                                                            >
                                                                {question.questionName}
                                                            </ArticleQuestionName>
                                                            <TitleToggleBtn
                                                                key={'TTBQ' + index}
                                                                onClick={() => toggleQuestionFunc(question.questionName, question.toggleQuestion)}
                                                                color={article.toggleTitle ? white : darkGray}
                                                                initial={initial}
                                                                transition={{ delay: 0.5, duration: 0.6 }}
                                                                animate={animation}
                                                            >
                                                                {question.toggleQuestion ? '-' : '+'}
                                                            </TitleToggleBtn>
                                                        </ArticleHeaderQuestion>
                                                        {
                                                            question.toggleQuestion
                                                                ? <ArticleDescription
                                                                    key={'ADD' + i}
                                                                    initial={initial}
                                                                    transition={{ delay: 0.5, duration: 0.6 }}
                                                                    animate={animation}
                                                                >
                                                                    {question.answear}
                                                                </ArticleDescription>
                                                                : ''
                                                        }
                                                    </>
                                                )
                                                : ''
                                        ))
                                    }
                                </AritcleData>
                            </ArticleSection>
                        ))
                    }
                </FAQWrapper>
            </Column>
        </FAQSetion >
    )
}

export default FAQ