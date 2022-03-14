import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { darkRed, darkGray, white, black, lightGray, lightRed, lightGreen, darkGreen } from './colors'
const HelveticaExtra = process.env.PUBLIC_URL + '/assets/fonts/Helvetica LT Std Extra Compressed.otf'
const HelveticaBold = process.env.PUBLIC_URL + '/Helvetica LT Std Extra Compressed.otf'
const HelveticaLight = process.env.PUBLIC_URL + '/Helvetica LT Std Light Condensed.otf'
export const GlobalStyle = createGlobalStyle`
@import url(${HelveticaLight});
    // @font-face{
    //     font-family:"helvetica-lt-std-extra-compressed";
    //     src:url(${HelveticaExtra}) format("woff");
    // }
    // @font-face{
    //     font-family:"Helvetica-lt-std-bold-condensed";
    //     src:url(${HelveticaBold}) format("woff");
    // }
    // @font-face{
    //     font-family:"helvetica-lt-std-light-condensed";
    //     src:url(${HelveticaLight}) format("woff");
    // }

    *{
      box-sizing:border-box;
      margin:0;
      padding:0;
    //   font-family:"helvetica-lt-std-extra-compressed", sans-serif;  
        font-family:"Helvetica", sans-serif;
    }

    html{
        scroll-behavior:smooth;
        overflow-x: hidden;
    }
`
export const Container = styled.div`
    z-index:1;
    width:100%;
    max-width:1300px;
    margin:${({ margin }) => (margin ? margin : '0 auto')};
    padding:${({ padding }) => (padding ? padding : '0 50px')};

    @media screen and (max-width:960px){
        padding-right:30px;
        padding-left:30px;
    }
`
export const MainHeading1 = styled.h1`
    font-size:${({ fontSize }) => (fontSize ? fontSize : 'clamp(2.3rem, 6vw,4.5rem)')};
    margin:${({ margin }) => (margin ? margin : '')};
    margin-bottom:${({ mb }) => (mb ? mb : '')};
    margin-top:${({ mt }) => (mt ? mt : '')};
    margin-right:${({ mr }) => (mr ? mr : '')};
    margin-left:${({ ml }) => (ml ? ml : '')};
    color:${({ color }) => (color ? color : white)};
    width:${({ width }) => (width ? width : '100%')};
    text-align:${({ textAlign }) => (textAlign ? textAlign : 'center')};
    text-transform:${({ textTransform }) => (textTransform ? textTransform : 'none')};
    transform:${({ transform }) => (transform ? (`translateX(-${transform}px)`) : 'translateX(0px)')};
    letter-spacing:4px;
    font-family: "Helvetica", Sans-serif;
    font-weight: 600;
    @media screen and (max-width: 960px) {
        font-size:clamp(2.3rem, 6vw,4.5rem);
        transform:${({ transform }) => (transform ? (`translateX(-${transform * 0.08}px)`) : 'translateX(0px)')};
	}
`
export const myMove = keyframes`
from {top: -50px;opacity:0;}
  to {top:0px;opacity:1;}      
`
export const MainHeading2 = styled.h1`
    font-size:${({ fontSize }) => (fontSize ? fontSize : 'clamp(2.3rem, 6vw,4.5rem)')};
    margin:${({ margin }) => (margin ? margin : '')};
    margin-bottom:${({ mb }) => (mb ? mb : '')};
    margin-top:${({ mt }) => (mt ? mt : '')};
    margin-right:${({ mr }) => (mr ? mr : '')};
    margin-left:${({ ml }) => (ml ? ml : '')};
    color:${({ color }) => (color ? color : white)};
    width:${({ width }) => (width ? width : '100%')};
    transform:${({ transform }) => (transform ? (`translateX(-${transform}px)`) : 'translateX(0px)')};
    text-align:center;
    letter-spacing:4px;
    font-family: "Helvetica", Sans-serif;
    font-weight: 600;
    animation: ${myMove} 2s;
	-webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: white;
`
export const SecondHeading = styled.h2`
    font-size:${({ fontSize }) => (fontSize ? fontSize : 'clamp(1.3rem,6vw,3.1rem)')};
    font-weight:${({ fontWeight }) => (fontWeight ? fontWeight : '')};
    margin:${({ margin }) => (margin ? margin : '')};
    margin-bottom:${({ mb }) => (mb ? mb : '')};
    margin-top:${({ mt }) => (mt ? mt : '')};
    margin-right:${({ mr }) => (mr ? mr : '')};
    margin-left:${({ ml }) => (ml ? ml : '')};
    color:${({ color }) => (color ? color : white)};
    transform:${({ transform }) => (transform ? (`translateX(${transform}px)`) : 'translateX(0px)')};
    letter-spacing:0.4rem;
    text-align:center;
    width:${({ width }) => (width ? width : '')};
    @media screen and (max-width: 960px) {
        font-size:clamp(1.3rem,6vw,3.1rem);
        transform:${({ transform }) => (transform ? (`translateX(${transform * 0.08}px)`) : 'translateX(0px)')};
        margin-top:${({ mt }) => (mt ? (mt / 2) : '')};
	}
`
export const TextWrapper = styled.span`
    font-size:${({ fontSize }) => (fontSize ? fontSize : '')};
    font-weight:${({ weight }) => (weight ? weight : '')};
    color: ${({ color }) => (color ? color : white)};
    text-align:${({ textAlign }) => (textAlign ? textAlign : '')};
    letter-spacing:${({ spacing }) => (spacing ? spacing : '')};
    padding:${({ padding }) => (padding ? padding : '')};
    margin:${({ margin }) => (margin ? margin : '')};
    margin-bottom:${({ mb }) => (mb ? mb : '')};
    margin-top:${({ mt }) => (mt ? mt : '')};
    margin-right:${({ mr }) => (mr ? mr : '')};
    margin-left:${({ ml }) => (ml ? ml : '')};
    width: ${({ width }) => (width ? width : 'auto')};
	min-width: ${({ minWidth }) => (minWidth ? minWidth : '')};
	max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '')};
	height: ${({ height }) => (height ? height : '')};
    min-height: ${({ minHeight }) => (minHeight ? minHeight : '')};
	max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : '')};
    transform:${({ transform }) => (transform ? (`translateX(${transform}px)`) : 'translateX(0px)')};
    white-space: pre-line; 
    @media screen and (max-width: 960px) {
        transform:${({ transform }) => (transform ? (`translateX(${transform * 0.08}px)`) : 'translateX(0px)')};
        margin-top:${({ mt }) => (mt ? (mt / 2) : '')};
	} 
`
export const Section = styled.section`
    padding:${({ padding }) => (padding ? padding : '')};
    margin:${({ margin }) => (margin ? margin : '')};
    margin-bottom:${({ mb }) => (mb ? mb : '')};
    margin-top:${({ mt }) => (mt ? mt : '')};
    margin-left:${({ ml }) => (ml ? ml : 'auto')};
    margin-right:${({ mr }) => (mr ? mr : 'auto')};
    color: ${({ color }) => (color ? white : black)};
    background:${({ backgroundColor }) => (backgroundColor ? backgroundColor : white)};
    position: ${({ position }) => (position ? position : '')};
    width: ${({ width }) => (width ? width : 'auto')};
	min-width: ${({ minWidth }) => (minWidth ? minWidth : '')};
	max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '')};
	height: ${({ height }) => (height ? height : '')};
    min-height: ${({ minHeight }) => (minHeight ? minHeight : '')};
	max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : '')};

    @media screen and (max-width:768px){
        padding:${({ smPadding }) => (smPadding ? smPadding : '50px 0')};
        width:auto;
    }
`
export const Row = styled.div`
    display:flex;
    justify-content:${({ justify }) => (justify ? justify : '')};
    align-items:${({ align }) => (align ? align : '')};
    gap:${({ gap }) => (gap ? gap : '')};
    padding:${({ padding }) => (padding ? padding : '')};
    margin:${({ margin }) => (margin ? margin : '')};
    margin-bottom:${({ mb }) => (mb ? mb : '')};
    margin-top:${({ mt }) => (mt ? mt : '')};
    position: ${({ position }) => (position ? position : '')};
    width: ${({ width }) => (width ? width : 'auto')};
	min-width: ${({ minWidth }) => (minWidth ? minWidth : '')};
	max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '')};
	height: ${({ height }) => (height ? height : '')};
	min-height: ${({ minHeight }) => (minHeight ? minHeight : '')};
    max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : '')};
    flex-wrap: ${({ wrap }) => (wrap ? wrap : '')};
    color: ${({ color }) => (color ? color : '')};
    text-align:${({ textAlign }) => (textAlign ? textAlign : '')};
    @media screen and (max-width:960px){
        color:${lightGreen};
    }
`
export const Column = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:${({ justify }) => (justify ? justify : '')};
    align-items:${({ align }) => (align ? align : '')};
    gap:${({ gap }) => (gap ? gap : '')};
    padding:${({ padding }) => (padding ? padding : '')};
    margin:${({ margin }) => (margin ? margin : '')};
    margin-bottom:${({ mb }) => (mb ? mb : '')};
    margin-top:${({ mt }) => (mt ? mt : '')};
    position: ${({ position }) => (position ? position : '')};
    width: ${({ width }) => (width ? width : 'auto')};
	min-width: ${({ minWidth }) => (minWidth ? minWidth : '')};
	max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '')};
	height: ${({ height }) => (height ? height : '')};
	min-height: ${({ minHeight }) => (minHeight ? minHeight : '')};
    max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : '')};
    flex-wrap: ${({ wrap }) => (wrap ? wrap : '')};
    color: ${({ color }) => (color ? color : '')};
    text-align:${({ textAlign }) => (textAlign ? textAlign : '')};
`
export const LinkText = styled(Link)`
font-size:${({ fontSize }) => (fontSize ? fontSize : '')};
font-weight:${({ weight }) => (weight ? weight : '')};
color: ${({ color }) => (color ? color : white)};
text-align:${({ textAlign }) => (textAlign ? textAlign : '')};
letter-spacing:${({ spacing }) => (spacing ? spacing : '')};
padding:${({ padding }) => (padding ? padding : '')};
margin:${({ margin }) => (margin ? margin : '')};
margin-left:${({ ml }) => (ml ? ml : '')};
margin-right:${({ mr }) => (mr ? mr : '')};
margin-bottom:${({ mb }) => (mb ? mb : '')};
margin-top:${({ mt }) => (mt ? mt : '')};
width: ${({ width }) => (width ? width : 'auto')};
min-width: ${({ minWidth }) => (minWidth ? minWidth : '')};
max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '')};
height: ${({ height }) => (height ? height : '')};
min-height: ${({ minHeight }) => (minHeight ? minHeight : '')};
max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : '')};
&:hover{
    color:${darkGreen};
}
@media screen and (max-width:960px){
    margin:auto;
}
`
export const Button = styled(motion.button)`
    border-radius: 4px;
	background: none;
    opacity:1 !important;
	white-space: nowrap;
	padding: 10px 20px;
	font-size: 16px;
	color: ${({ inverse }) => (inverse ? white : darkRed)};
	outline: none;
	border: 2px solid ${({ inverse }) => (inverse ? white : darkRed)};
	cursor: pointer;
	overflow: hidden;
	position: relative;
    text-transform: uppercase;

	&:before {
		background:${({ inverse }) => (inverse ? darkRed : darkGray)};
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
		transition: all 0.6s ease;
		width: 100%;
		height: 0%;
        opacity:1 !important;
		transform: translate(-50%, -50%) rotate(45deg);
	}

	&:hover:before {
		height: 500%;
	}

	&:hover {
		color:${({ inverse }) => (inverse ? white : white)};
        box-shadow: 0 0 2px 2px ${({ inverse }) => (inverse ? lightGray : lightRed)};
        border: 2px solid ${({ inverse }) => (inverse ? darkRed : white)};
	}
`
export default GlobalStyle