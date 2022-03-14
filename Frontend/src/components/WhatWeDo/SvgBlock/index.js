import React from 'react'
import { Rb, Img } from './SvgBlockStyles'
const SvgBlock = ({ svg, alt }) => {
    const SvgIcon = process.env.PUBLIC_URL + `/assets/images/${svg}`
    return (
        <Rb id="svgBlock">
            <Img src={SvgIcon} alt={alt} />
        </Rb>
    )
}

export default SvgBlock