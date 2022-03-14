import React from 'react'
import { TheySupportUsSection } from './AboutStyles'
import { imagesTheySupportsUs } from '../../data/AboutData'
import { SecondHeading } from '../../services/globalStyles'
import CarouselPhotos from '../CarouselPhotos'
import { lightRed } from '../../services/colors'
import { useTranslation } from 'react-i18next'
const TheySupportUS = () => {
    const { t } = useTranslation()
    return (
        <TheySupportUsSection id="theySupportUs" mt={'15px'}>
            <SecondHeading color={lightRed} fontWeight={'600'}>
                {t('About.theySupportUs')}
            </SecondHeading>
            <CarouselPhotos photos={imagesTheySupportsUs} width={'100%'} height={'150px'} />
        </TheySupportUsSection>
    )
}

export default TheySupportUS