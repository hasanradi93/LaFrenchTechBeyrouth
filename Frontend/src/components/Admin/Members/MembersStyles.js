import { motion } from 'framer-motion'
import styled from 'styled-components'
import { darkGray, darkRed, lightGray, white } from '../../../services/colors'
import {
    MainHeading1,
    Section
} from '../../../services/globalStyles'

export const MembersAdminSection = styled(Section)`
    width:80% !important;
    margin-left:auto;
    margin-right:auto;
    &${Section}
`
export const TitlePage = styled(MainHeading1)`
    &${MainHeading1}
    color:${lightGray};
	background:${lightGray};
	font-size:${({ fontSize }) => (fontSize ? fontSize : '2rem')}
`
export const StrWord = styled.span`
    font-size:9px;
    font-weight:500;
`
export const SectionData = styled(Section)`
    width:80%;
    height:auto;
    margin-top:10px;
    margin-bottom:20px;
    padding-bottom:10px
    margin-left:auto;
    margin-right:auto;
    padding-top:20px;
    text-align:center;
    background:transparent;
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    align-item:center;
    @media screen and (max-width:960px){
        margin-top:5px;
        padding-top:20px;
        width:100%;
    }
`
export const MemberCardWrapper = styled(motion.div)`
    width:22%;
    height:${({ height }) => (height ? height : '340px')};
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
export const MemberEditBox = styled(motion.div)`
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
export const MemberEditBoxNote = styled(motion.div)`
    width:100%;
    height:10px;
    margin-top:10px;
    padding:5px 15px;
    margin-bottom:5px;
    font-weight:600;
    font-weight:bold;
    letter-spacing:1px; 
    color:${darkGray};
`
export const MmeberImgWrapper = styled(motion.div)`
    width:100%;
    height:180px;
    margin-bottom:5px;
`
export const MemberImg = styled(motion.img)`
    object-fit:cover;
    width:100%;
    height:100%;
    background:linear-gradient(to right,rgba(0,0,0,0.7),rgba(0,0,0,0.1));
`
export const MmeberFullName = styled(motion.div)`
    width:100%;
    height:40px;
    padding:5px 15px;
    margin-bottom:5px;
    font-weight:600;
    font-weight:bold;
    letter-spacing:1px;
    
    color:${darkGray};
`
export const MemberLine = styled(motion.div)`
    width:50%;
    border-bottom:1px solid ${lightGray};
    margin:auto;
    opacity:0.4;
`
export const MmeberPosition = styled(motion.div)`
    width:100%;
    height:25px;
    padding:5px 15px;
    margin-bottom:5px;
    font-weight:500;
    font-weight:bold;
    color:${lightGray};
`
export const MemberSocialMedia = styled(motion.div)`
    width:80%;
    height:35px;
    margin:auto;
    margin-bottom:5px;
    display:flex;
    justify-content: space-between;
`
export const SocialIcon = styled.a`
    color:  ${lightGray};
    font-size: 24px;
    cursor:pointer;
    &:hover{
        color:${darkRed};
    }
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