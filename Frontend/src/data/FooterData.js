import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin } from 'react-icons/fa';

const iconStyle = (Icon) => <Icon />;

export const footerSocialData = [
    {
        name: 'Facebook',
        icon: iconStyle(FaFacebook),
        link: 'https://www.facebook.com/people/La-French-Tech-Beyrouth/100066889004607/'
    },
    {
        name: 'Instagram',
        icon: iconStyle(FaInstagram),
        link: 'https://www.instagram.com/lafrenchtechbeyrouth/?hl=en'
    },
    {
        name: 'YouTube',
        icon: iconStyle(FaYoutube),
        link: '/'
    },
    {
        name: 'Twitter',
        icon: iconStyle(FaTwitter),
        link: '/'
    },
    {
        name: 'LinkedIn',
        icon: iconStyle(FaLinkedin),
        link: 'https://www.linkedin.com/company/la-french-tech-beyrouth'
    },
]