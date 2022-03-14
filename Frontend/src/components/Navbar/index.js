import React, { useEffect, useState } from 'react'
import { languages, languages2, GlobeIcon } from '../../data/NavbarData'
import { useNavigate } from 'react-router-dom'
import { darkRed, white } from '../../services/colors'
import { FaBars, FaTimes } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { animateScroll as scroll } from 'react-scroll'
import {
    Nav,
    NavbarContainer,
    NavLogo,
    NavIcon,
    MobileIcon,
    NavMenu,
    NavItem,
    NavItemBtn,
    NavLinks,
    NavLangLinks,
    GlobalMenu,
    LangSpan,
    ALang
} from './NavbarStyles'

import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import classNames from 'classnames'

const Navbar = () => {
    const logoUrl = process.env.PUBLIC_URL + '/assets/images/logoWithTitle.png'
    const [show, setShow] = useState(false)
    const [downScreen, setDownScreen] = useState(false)
    let navigate = useNavigate()

    const handleClick = () => {
        setShow(!show)
        console.log("show", !show)
    }

    const scrollTo = (id) => {
        const element = document.getElementById(id)
        element.scrollIntoView({ behavior: 'smooth' })
    }

    const closeMobileMenu = (to, id) => {
        if (to !== '/')
            navigate(to)
        else
            scrollTo(id)

        setShow(false)
    }

    const openBoxUlLnguages = (event) => {
        event.stopPropagation()
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 80) {
                setDownScreen(true)
                return
            }
            setDownScreen(false)
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const currentLanguageCode = cookies.get('i18next') || 'en'
    const { t } = useTranslation()
    const menuData = t('Menu', { returnObjects: true })
    return (
        <IconContext.Provider value={{ color: white }}>
            <Nav background={downScreen} top={downScreen}>
                <NavbarContainer>
                    <NavLogo to="/" onClick={scroll.scrollToTop}>
                        <NavIcon src={logoUrl} logoIconWidth={downScreen} alt='logo' />
                        {/* La French Tech Beyrouth */}
                    </NavLogo>
                </NavbarContainer>
                <MobileIcon onClick={handleClick}>
                    {show ? <FaTimes /> : <FaBars />}
                </MobileIcon>

                <NavMenu show={show} onClick={handleClick}>
                    {menuData.map((navItem, index) => (
                        <NavItem key={index}>
                            <NavLinks onClick={() => closeMobileMenu(navItem.to, navItem.id)}
                                to={navItem.to}
                                spy={true}
                                duration={500}
                                smooth={true}
                                exact="true"
                                offset={-80}
                            >
                                {navItem.text}
                            </NavLinks>
                        </NavItem>
                    ))}
                    <NavItemBtn>
                        <GlobalMenu className="dropdown" onClick={(e) => openBoxUlLnguages(e)}>
                            <NavLangLinks
                                className="btn btn-link dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <GlobeIcon />
                            </NavLangLinks>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li>
                                    <span className="dropdown-item-text">{t('language')}</span>
                                </li>
                                {languages.map(({ code, name, country_code, flag }) => (
                                    <li key={country_code}>
                                        <NavLangLinks
                                            className={classNames('dropdown-item', {
                                                disabled: currentLanguageCode === code,
                                            })}
                                            onClick={() => {
                                                i18next.changeLanguage(code)
                                            }}
                                        >
                                            <span>
                                                <img src={flag} alt={code + 'flag'} />
                                            </span>
                                            <span
                                                style={{
                                                    opacity: currentLanguageCode === code ? 0.5 : 1,
                                                    marginLeft: '3px',
                                                }}
                                            ></span>
                                            {name}
                                        </NavLangLinks>
                                    </li>
                                ))}
                            </ul>
                        </GlobalMenu>
                        {/* {languages2.map(({ code, name, country_code }) => (
                            <LangSpan key={country_code}>
                                <ALang href="#"
                                    style={{ color: (currentLanguageCode === code ? darkRed : white) }}
                                    onClick={() => {
                                        i18next.changeLanguage(code)
                                    }}
                                >
                                    {name}
                                </ALang>
                                {
                                    code === 'fr'
                                        ? (' |') : ''
                                }
                            </LangSpan>
                        ))} */}
                    </NavItemBtn>
                </NavMenu>
            </Nav>
        </IconContext.Provider >
    )
}

export default Navbar