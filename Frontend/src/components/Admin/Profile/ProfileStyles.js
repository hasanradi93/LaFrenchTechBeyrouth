import { motion } from 'framer-motion'
import styled from 'styled-components'
import {
    white,
    lightGray,
    darkRed,
    darkGray
} from '../../../services/colors'
import { Section } from '../../../services/globalStyles'

export const ProfileAdminSection = styled(Section)`
    width:80% !important;
    margin-left:auto;
    margin-right:auto;
    &${Section}
`
export const SectionDataDiv = styled(motion.div)`
    width:100%;
    height:${({ height }) => (height ? height : '250px')};
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
export const SetDataDiv = styled(motion.div)`
    width:100%;
    height:60px;
    margin-top:10px;
    padding:5px 15px;
    margin-bottom:5px;
    font-weight:600;
    font-weight:bold;
    letter-spacing:1px;
    color:${darkGray};
`
export const DivTwoSide = styled.div`
    display: flex;
    flex-wrap: wrap;
	width:100%;
	height:25px;
	margin-top:${(marginTop) => (marginTop ? marginTop : 'auto')}
    align-content: space-between;
    justify-content: space-between;
`
export const SpanSideCard = styled.span`
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
export const InputBox = styled.input`
	width:${({ width }) => (width ? width : '200px')};
    height:${({ height }) => (height ? height : '25px')};
    background:${({ background }) => (background ? background : lightGray)};
    color:${({ color }) => (color ? color : white)};
	outline:none;
	box-shadow:none;
	border-top-style: hidden;
	border-right-style: hidden;
	border-left-style: hidden;
	border-bottom-style: groove;
	border-bottom-color:${white};
	&::placeholder{
		background:${({ placeholderColor }) => (placeholderColor ? placeholderColor : lightGray)};
	}
	&:hover{
        color:${darkRed};
		border-bottom-color:${darkRed};
    }
	&:focus{
        color:${darkRed};
		border-bottom-color:${darkRed};
    }
`
export const ButtonInCard = styled.a`
	color:  ${lightGray};
	font-size: 22px;
    cursor:pointer;
	width:100%;
	height:25px;
	text-align:center;
	paddin-bottm:2px;
    margin-top:-5px;
    &:hover{
        color:${darkRed};
		background-color:${darkGray};
    }
`