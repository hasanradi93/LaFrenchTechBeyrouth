import { motion } from "framer-motion"
import styled from "styled-components"
import { white, lightGray, lightRed, darkGray, darkRed } from "../../services/colors"
import { MainHeading1, SecondHeading, Section } from "../../services/globalStyles"
import { ContentRow } from "../Content/ContentStyles"

export const StartUpsSection = styled(Section)`
    &${Section}
`
export const MainHeadingEdited = styled(MainHeading1)`
    &${MainHeading1}
    @media screen and (max-width:960px){
        width:100%;
        font-size:1.7rem !important;
    }
`
export const SecondHeadingEdited = styled(SecondHeading)`
    &${SecondHeading}
    font-size:1.5rem;
    text-align: justify;
    width:70%;
    margin-bottom: 15px;
	text-justify: inter-word;
    letter-spacing:0px;
    @media screen and (max-width:960px){
        width:100%;
        font-size:1.4rem;
        letter-spacing:0px;
    }
`
export const Subtitle = styled(motion.p)`
	margin-bottom: 35px;
	line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '24px')};
	text-align: justify;
	text-justify: inter-word;
	color: ${({ inverse }) => (inverse ? white : lightGray)};
	font-size: ${({ fontSize }) => (fontSize ? fontSize : '1rem')};
    margin-top:20px;
    @media screen and (max-width:960px){
        width:100%;
        font-size:1rem;
        letter-spacing:0px;
    }
`
export const ContentRowEdited = styled(ContentRow)`
    &${ContentRow}
    width:81%;
    margin-left:auto;
    margin-right:auto;
    margin-bottom:15px;
    @media screen and (max-width:960px){
        width:100%;
    }
`
export const StartUpCard = styled(motion.div)`
    width:31%;
    margin-left:1%;
    margin-right:1%;
    height:500px;
    margin-bottom:25px;
    transition: all 0.3s ease-out;
    box-shadow: 0 4px 10px ${lightGray};
    &:hover{
        transform: scale(1.06);
        box-shadow: 0 7px 12px ${lightRed};
    }
    @media screen and (max-width:960px){
        width:95%;
    }
`
export const ImgRow = styled(motion.div)`
    width:100%;
    height:170px;

`
export const Img = styled(motion.img)`
    object-fit:cover;
    width:100%;
    height:100%;
    background:linear-gradient(to right,rgba(0,0,0,0.7),rgba(0,0,0,0.1));
`
export const TitleRow = styled(motion.div)`
    width:100%;
    height:75px;
    padding:15px;  
    margin-bottom:12px;
    font-size:1.5rem;
    font-weight:bolder;
    color:${darkGray};
    @media screen and (max-width:960px){
        font-size:1rem;
    }
`
export const DescriptionRow = styled(motion.div)`
    width:100%;
    height:200px; 
    padding-left:15px; 
    padding-right:15px; 
    font-size:1.2rem;
    color:${lightGray}
    @media screen and (max-width:960px){
        font-size:0.8rem;
    } 
`
export const LinkRow = styled(motion.div)`
    width:100%;
    height:10px;
    text-align:right;
    padding-right:10px;
    text-decoration:underline;
    color:${darkRed} !important;
    text-decoration-color:${lightRed};
    font-style:italic;
    font-weight:bold;
    &:hover{
        color:${darkRed};
    }
`