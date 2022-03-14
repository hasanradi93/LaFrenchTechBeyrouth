import React from 'react'
import { useTranslation } from 'react-i18next'
import {
    FooterLinkItems,
    FooterLinkTitle,
    FooterLink,
    FooterLogo,
    SocialIcon,
    FooterRights,
    FooterSocialIcon,
    FooterWrapper,
    FooterAddress,
    FooterColumn,
    FooterRow,
    FooterGrid,
} from './FooterStyles'
import { footerSocialData } from '../../data/FooterData'
import { Row, Section } from '../../services/globalStyles'
import { darkGray } from '../../services/colors';

function Footer() {
    const { t } = useTranslation()
    const footerData = t('Footer', { returnObjects: true })
    return (
        <Section id="footer" padding="4rem 0 2rem 0" backgroundColor={darkGray}>
            <FooterWrapper>
                <FooterRow>
                    <FooterLogo to="/">
                        <SocialIcon src={process.env.PUBLIC_URL + '/assets/images/logo-Big.png'} />
                    </FooterLogo>
                </FooterRow>
                <FooterRow>
                    LA FRENCH TECH BEYROUTH
                </FooterRow>
                <FooterRow>
                    <FooterAddress>
                        69 Hamrah Street, Delta Building, Beirut
                    </FooterAddress>
                </FooterRow>
                <FooterGrid justify="space-between">
                    {footerData.map((footerItem, index) => (
                        <FooterLinkItems key={index}>
                            <FooterLinkTitle>{footerItem.title}</FooterLinkTitle>
                            {footerItem.links.map((link, linkIndex) => (
                                <FooterLink key={linkIndex} to="/">
                                    {link}
                                </FooterLink>
                            ))}
                        </FooterLinkItems>
                    ))}
                </FooterGrid>
                <FooterRow>
                    <FooterColumn id="footerLogo">
                        <Row align="center" margin="auto  0 0 0" gap="1rem">
                            {footerSocialData.map((social, index) => (
                                <FooterSocialIcon
                                    key={index}
                                    href={social.link}
                                    target="_blank"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </FooterSocialIcon>
                            ))}
                        </Row>
                    </FooterColumn>
                </FooterRow>
                <FooterRights>LA FRENCH TECH BEYROUTH © {new Date().getFullYear()}</FooterRights>
            </FooterWrapper>
        </Section>
    );
}

export default Footer;
