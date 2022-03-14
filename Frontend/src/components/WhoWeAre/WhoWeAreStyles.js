
import { motion } from "framer-motion"
import styled, { keyframes } from "styled-components"
import { darkGray, darkPink, darkRed, lightGray } from "../../services/colors"

export const move = keyframes`
    0% { transform: translateY(-5px)         }
    50% { transform: translateY(10px) translateX(10px)        }
    100% { transform: translateY(-5px)         }
`
export const WhoWeAreSection = styled.section`
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index:1;
  margin-top:-5px;
`
export const Waves = styled.img`
  width: 100%;
  height: auto;
  margon-right:auto;
  margin-left:auto;
  position: absolute;
  top: -0.1rem;
`
export const Hand = styled.div`
  position: absolute;
  bottom: 0rem;
  right: 0.1rem;

  @media only Screen and (max-width: 40em) {
    display: none;
  }
`
export const Main = styled(motion.div)`
  margin: 0 15rem;
  margin-top: 15rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media only Screen and (max-width: 64em) {
    margin: 0 calc(5rem + 5vw);
    margin-top: 10rem;
  }
  @media only Screen and (max-width: 40em) {
    align-items: center;
    margin: 3rem calc(3rem + 3vw);
  }
`
export const CurvedLine = styled.div`
  width: 7rem;
  height: 2rem;
  border: solid 5px ${darkRed};
  border-color: ${darkRed} transparent transparent transparent;
  border-radius: 150%/60px 70px 0 0;
  transform:rotateZ(-26deg);
`
export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only Screen and (max-width: 40em) {
    flex-direction: column;
  }
`
export const Rocket = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 40%;
  padding-bottom: 5rem;
  animation: ${move} 2.5s ease infinite;
  @media only Screen and (max-width: 40em) {
    width: 50vw;
    padding-bottom: 0;
  }
`
export const Human = styled.div`
  width: 50%;
  position: absolute;
  right: 0;
  bottom: 100%;

  @media only Screen and (max-width: 40em) {
    display: none;
  }
`
export const Text = styled.h4`
  font-size: calc(0.5rem + 1vw);
  line-height: 1.5;
  color: ${darkGray};
`
export const Circle = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color:${({ backColor }) => (backColor ? darkRed : lightGray)};
  margin-right: 0.5rem;
  margin-top: 1rem;
  &:hover{
    cursor:pointer;
  }
`
export const WhoWeAreText = styled.div`
  width: 50%;
  position: relative;
  @media only Screen and (max-width: 40em) {
    width: 100%;
  }
`