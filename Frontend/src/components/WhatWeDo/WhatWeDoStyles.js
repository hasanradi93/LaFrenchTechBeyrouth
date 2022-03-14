import styled, { keyframes } from 'styled-components'
import { darkGray, white } from '../../services/colors'

export const rotate = keyframes`
from { transform: rotate(0deg) }
to { transform: rotate(360deg) }        
`
export const bigSmall = keyframes`
from { width: 300px;height:300px;}
to { width: 350px;height:450px; }        
`
export const rotateBS = keyframes`
from { width: 100px;height:100px; transform: rotate(360deg);}
to { width: 250px;height:250px; transform: rotate(0deg); }        
`
export const WhatWeDoSection = styled.section`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding-top: 20rem;
    margin-bottom:20rem;
`
export const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-color: ${darkGray};
  background-size: auto 100vh;
  background-repeat: no-repeat;
`
export const Line = styled.span`
  border-left: 4px solid ${white};
  height: 15rem;
  margin-top: 2rem;
  border-radius: 20px 20px 0 0;
`
export const Triangle = styled.span`
  width: 0;
  height: 0;
  border-left: 1.2rem solid transparent;
  border-right: 1.2rem solid transparent;
  border-top: 2rem solid ${white};
`
export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10rem 10rem;
  /* margin-bottom: 10rem; */
  position: relative;
  @media only Screen and (max-width: 64em) {
    margin: 10rem calc(4rem + 5vw);
  }
  @media only Screen and (max-width: 48em) {
    display: block;
    &:last-child {
      margin-bottom: 2rem;
    }
  }
  @media only Screen and (max-width: 40em) {
    margin: 10rem calc(2rem + 3vw);
    &:last-child {
      margin-bottom: 1rem;
    }
  }
`
export const OBJ = styled.div`
  position: absolute;
  top: ${({ top }) => (top ? top : '75%')};
  right: 75 %;
  display: flex;
  justify - content: center;
  align - items: center;
  width: 10vw;
  /* z-index: 1; */

  @media only Screen and(max - width: 48em) {
    opacity: 0.5;
  }
`
export const OBJRotate = styled(OBJ)`
  &${OBJ};
  animation: ${rotate} 5s ease-in-out infinite;
`
export const OBJPyramide = styled(OBJ)`
  &${OBJ};
  animation: ${bigSmall} 5s ease-in-out infinite;
  animation-direction: alternate;
`
export const OBJTriangle = styled(OBJ)`
  &${OBJ};
  animation: ${rotateBS} 5s ease-in-out infinite;
  animation-direction: alternate;
`