import styled from "styled-components"
import { Section, MainHeading1, TextWrapper } from '../../services/globalStyles'
import { lightGreen, darkGreen, lightGray } from '../../services/colors'

export const TitlesAndSubTitlesSection = styled(Section)`
height:${({ heightDesktop }) => (heightDesktop ? heightDesktop : '')};
z-index:${({ zIndex }) => (zIndex ? zIndex : '')};
	opacity:${({ opacity }) => (opacity ? opacity : 1)};
@media screen and (max-width:960px){
    height: ${({ heightMobile }) => (heightMobile ? heightMobile : '')};
}
&${Section}
`
export const MainHeading1Edited = styled(MainHeading1)`
text-shadow:2px 2px 0 ${lightGray}, 3px 3px 0 ${lightGreen},
4px 4px ${lightGray}, 5px 5px 0 ${darkGreen};
  &${MainHeading1}
`
export const TextWrapperEdited = styled(TextWrapper)`
width:${({ width }) => (width ? width : '100%')};
text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
text-justify: ${({ textJustify }) => (textJustify ? textJustify : '')};
text-shadow:0.3px 0.3px 0 ${lightGray}, 0.3px 0.3px 0 ${lightGreen},
0.4px 0.4px ${lightGray}, 0.5px 0.5px 0 ${darkGreen};
margin:${({ margin }) => (margin ? margin : 'auto')};
  &${TextWrapper}

  @media screen and (max-width:960px){
      font-size:0.7rem;
      width:80%;
  }
`