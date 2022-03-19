import { motion } from 'framer-motion'
import styled from 'styled-components'
import {
    white,
    lightGray,
    darkRed,
    darkGray,
    lightRed,
    lightGreen
} from '../../../services/colors'
import { MainHeading1, SecondHeading, Section } from '../../../services/globalStyles'

export const HomePageSection = styled(Section)`
    width:80% !important;
    margin-left:auto;
    margin-right:auto;
    &${Section}
`
export const SectionDataDiv = styled(motion.div)`
    width:100%;
    height:${({ height }) => (height ? height : '250px')};
    margin-bottom:${({ mb }) => (mb ? mb : 'auto')} !important;
    z-index:${({ zIndex }) => (zIndex ? zIndex : '1')};
    margin-bottom:25px;
    margin-top:25px;
    margin-left:auto;
    margin-right:auto;
    background-color:${white};
    box-shadow:0px 2px 2px ${lightGray};
    transition:all ease-in-out 0.6s;
    &:hover{
        transform:scale(1.1);
        box-shadow:0px 4px 5px ${darkRed};
    }
    @media screen and (max-width:960px){
        width:90%;
        margin-bottom:10px;
        margin-top:10px;
    }
`
export const TitlePage = styled(MainHeading1)`
    &${MainHeading1}
    color:${lightGray};
	background:${lightGray};
	font-size:${({ fontSize }) => (fontSize ? fontSize : '2rem')}
`
export const SetDataDiv = styled(motion.div)`
    width:100%;
    height:${({ height }) => (height ? height : '60px')};
    background:${({ background }) => (background ? background : white)};
    margin-top:10px;
    padding:5px 15px;
    margin-bottom:5px;
    font-weight:600;
    font-weight:bold;
    letter-spacing:1px;
    color:${darkGray};
`
export const SpanSide = styled.span`
    width:${({ width }) => (width ? width : '50%')};
	float:left;
	margin-left:auto;
	margin-right:auto;
    height:36px;
	cursor:pointer;
	text-align:center;
	&:hover{
        color:${({ colorHover }) => (colorHover ? colorHover : darkRed)};
		background-color:${({ backColor }) => (backColor ? backColor : darkGray)};
		>a{
			color:${({ colorHover }) => (colorHover ? colorHover : darkRed)};
		}
    }
`
export const MailsTable = styled.table`
    width:100%;
    margin-left:auto;
    margin-right:auto;
    border:1p solid ${lightRed};
`
export const MiniTable = styled.table`
    width:160%;
    margin-left:auto;
    margin-right:auto;
    display:${({ display }) => (display ? display : 'none')};
    transition: all 1s linear;
    animation: show 1s linear;
    -webkit-animation: show 1s  linear; 
    background:${({ background }) => (background ? background : darkRed)};
    @keyframes show {
        from {
            transform: translateY(-100px);
        }
        to {
            transform: translateY(0px);
        }
    }
    @-webkit-keyframes show {
        from {
            transform: translateY(-100px);
        }
        to {
            transform: translateY(0px);
        }
    } 
    @media screen and (max-width:960px){
        width:120%;
    } 
`
export const ButtonInEvents = styled.a`
	color:  ${white};
	border:1px solid ${white};
	font-size: 22px;
    cursor:pointer;
	width:36px;
	text-align:center;
	paddin-bottm:2px;
    margin-top:-5px;
    &:hover{
        color:${darkRed};
		background-color:${white};
    }
`
export const CardRow = styled.tr`
    width:100% !important;
    margin-left:auto;
    margin-right:auto;
    font-weight:500;
    color:${white};
    background-color:${({ backgroundColor }) => (backgroundColor ? backgroundColor : lightGreen)};
    &:hover{
        background-color:${darkRed};
        font-weight:600;
    }
`
export const CardColumn = styled.td`
    margin-left:auto;
    margin-right:auto;
    padding:10px;
`
export const Line = styled(motion.div)`
    width:50%;
    border-bottom:1px solid ${lightGray};
    margin:auto;
    opacity:0.4;
`
export const SecondHeadingEdited = styled(SecondHeading)`
color:${({ color }) => (color ? color : lightGray)};
&${SecondHeading}
`