import styled from 'styled-components'
import { lightGray, lightGreen, darkGreen } from '../../services/colors'
import { MainHeading1 } from '../../services/globalStyles'
export const Img = styled.img`
  width: 100%;
  height: auto;
  margon-right:auto;
  margin-left:auto;
  position: absolute;
`
export const MainHeading1Edited = styled(MainHeading1)`
text-shadow:2px 2px 0 ${lightGray}, 3px 3px 0 ${lightGreen},
4px 4px ${lightGray}, 5px 5px 0 ${darkGreen};
  &${MainHeading1}
`