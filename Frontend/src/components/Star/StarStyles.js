import styled from 'styled-components'
import { lightRed } from '../../services/colors'
import { MainHeading2, TextWrapper } from '../../services/globalStyles'
export const StarSection = styled.div`
    height:${({ height }) => (height ? height : '103vh')};
    background-position:center;
    background-size:cover;
    padding-top:clam(70px,25vh,220px);
    box-shadow:inset 0 0 0 1000px rgba(0,0,0,0.2);
    bacground-attachment:fixed;
    display:flex;

    @media screen and (max-width: 960px) {
		padding-top: 120px;
        height:80vh;
        >div h1{
            font-size:50px !important;
            margin-top:-25vh;
        }
        >div span{
            font-size:28px !important;
        }
	}
`
export const StarImg = styled.img`
    object-fit:cover;
    width:100%;
    height:${({ height }) => (height ? height : '100%')};
    opacity:0.7;
    background:linear-gradient(to right,rgba(0,0,0,0.7),rgba(0,0,0,0.1));
    top:0;
    position:absolute;
    z-index:-1;
    @media screen and (max-width: 960px) {
        height:78vh;
	}
`
export const TextWrapperEdited = styled(TextWrapper)`
transform:${({ transform }) => (transform ? (`translateY(${transform}px)`) : 'translateY(0px)')};
opacity:${({ opacity }) => (opacity ? opacity : '1')};
  ${TextWrapper}

  @media screen and (max-width: 960px) {
    font-size:28px;
  }

`
export const MainHeading2Edited = styled(MainHeading2)`
background-color:${lightRed};
opacity:0.7;
  ${MainHeading2}
  background-color:${lightRed};
  @media screen and (max-width: 960px) {
    font-size:40px !important;
  }
`