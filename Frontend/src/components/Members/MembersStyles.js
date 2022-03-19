import { motion } from "framer-motion";
import styled from "styled-components";
import { darkGray, lightGray, white, darkRed } from "../../services/colors";
import { Section } from "../../services/globalStyles";
export const MembersSection = styled(Section)`
    width:100%;
    height:160vh;
    overflow: auto;
    position: relative;
    background: linear-gradient(to bottom right, ${white} 0%, ${white} 50%, ${lightGray} 50%, ${darkGray} 100%);
    @media screen and (max-width:960px){
        padding-top:5px;
    }
`
export const ContainerMembers = styled(Section)`
    width:100%;
    position: absolute;
    height:auto;
    margin-left:auto;
    margin-right:auto;
    z-index:10;
    background:transparent;
`
export const ContainerText = styled(Section)`
    width:100%;
    height:auto;
    z-index:9;
    text-align:center;
    padding-top:0px;
    padding-bottom:50px;
    position: relative;
    margin-left:auto;
    margin-right:auto;
    background:transparent;
    @media screen and (max-width:960px){
        margin-top:-7px;
    }
`
export const SectionData = styled(Section)`
    width:80%;
    height:auto;
    margin-top:30px;
    margin-bottom:20px;
    padding-bottom:10px
    margin-left:auto;
    margin-right:auto;
    padding-top:20px;
    z-index:11;
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
    height:450px;
    margin-bottom:15px;
    margin-top:15px;
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
export const MmeberImgWrapper = styled(motion.div)`
    width:100%;
    height:300px;
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
    margin-top:30px;
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