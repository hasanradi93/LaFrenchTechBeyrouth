import React from 'react'
import { NotFoundSection } from './NotFoundStyles'
import { useTranslation } from 'react-i18next'
import './Notfound.css'
const NotFound = () => {
    const { t } = useTranslation()
    return (
        <NotFoundSection>
            {/* <a href="https://codepen.io/uiswarup/full/wvqNWOY" target="new"> */}
            <header class="top-header">
            </header>

            <div>
                <div class="starsec"></div>
                <div class="starthird"></div>
                <div class="starfourth"></div>
                <div class="starfifth"></div>
            </div>
            <div class="lamp__wrap">
                <div class="lamp">
                    <div class="cable"></div>
                    <div class="cover"></div>
                    <div class="in-cover">
                        <div class="bulb"></div>
                    </div>
                    <div class="light"></div>
                </div>
            </div>
            <section class="error">
                <div class="error__content">
                    <div class="error__message message">
                        <h1 class="message__title">{t('NotFound.main_Heading')}</h1>
                        <p class="message__text">{t('NotFound.second_Heading')}</p>
                    </div>
                    <div class="error__nav e-nav">
                        <a href="/" target="_self" class="e-nav__link"></a>
                    </div>
                </div>

            </section>

            {/* </a> */}
        </NotFoundSection>
    )
}

export default NotFound