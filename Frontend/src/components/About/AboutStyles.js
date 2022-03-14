import styled from "styled-components"
import { lightGray, lightGreen, darkGreen } from '../../services/colors'
import { MainHeading1, TextWrapper, Section } from '../../services/globalStyles'
export const VideoSection = styled.div`
display: flex;
width:100%;
flex-wrap: wrap;
align-items: center;
justify-content: space-around;
background:linear-gradient(to right,rgba(0,0,0,0.7),rgba(0,0,0,0.1));
`
export const ModalVideo = styled.div`
object-fit:cover;
width:100%;
height:95%;
margin-top:10%;
margin-left:auto;
margin-right:auto;
top:0;
position:absolute;
`
export const MainHeading1Edited = styled(MainHeading1)`
text-shadow:2px 2px 0 ${lightGray}, 3px 3px 0 ${lightGreen},
4px 4px ${lightGray}, 5px 5px 0 ${darkGreen};
  &${MainHeading1}
`
export const TextWrapperEdited = styled(TextWrapper)`
width:60%;
text-align: justify;
text-justify: inter-word;
text-shadow:0.3px 0.3px 0 ${lightGray}, 0.3px 0.3px 0 ${lightGreen},
0.4px 0.4px ${lightGray}, 0.5px 0.5px 0 ${darkGreen};
margin:15px;
  &${TextWrapper}

  @media screen and (max-width:960px){
      font-size:0.7rem;
      width:80%;
  }
`
export const OurLocationSection = styled(Section)`
height: 80vh;
@media screen and (max-width:960px){
    height: 70vh;
}
&${Section}
`
export const TheySupportUsSection = styled(Section)`
height: 10vh;
// @media screen and (max-width:960px){
//     height: 70vh;
// }
&${Section}
`