import styled from "styled-components"
import { Section, MainHeading1, TextWrapper, Button } from '../../services/globalStyles'
import { lightGreen, darkGreen, lightGray, white, darkRed, darkGray, lightRed } from '../../services/colors'
export const EventSection = styled(Section)`	
	height:auto;
	// @media screen and (max-width: 960px) {
	// 	height:280vh;
	// }	
	${Section}
`
export const EventWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;

	@media screen and (max-width: 960px) {
		margin: 0 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`
export const MainHeading1EditedHome = styled(MainHeading1)`
  text-shadow:2px 2px 0 ${lightGray}, 3px 3px 0 ${lightGreen},
  4px 4px ${darkGreen}, 5px 5px 0 ${lightGray}; 
//   transition: all 1.5s ease;
//   transform:${({ transformX }) => (transformX ? (`translateX(-150%)`) : 'translateX(50%)')};
${MainHeading1}
`
export const EventsContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-flow: wrap;
	> div {
		margin: 0.7rem;
	}

	@media screen and (max-width: 960px) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		> div {
			width: 90%;
		}
	}
`
export const EventCardInfo = styled.div`
	background: ${white};
	box-shadow: 0 4px 10px ${lightRed};
	width: 280px;
	text-decoration: none;
	border-radius: 4px;
	height: 100vh;

	display: flex;
	flex-direction: column;
	padding: 24px;
	color: ${white};
	margin: auto;
	> span {
		margin-top: auto;
	}

	&:hover {
		// transform: scale(1.06);
		transition: all 0.3s ease-out;
		box-shadow: 0 6px 20px ${lightGreen};
	}

	@media screen and (max-width: 960px) {
		width: 90%;
		height: 80vh;
		&:hover {
			transform: none;
		}
	}
`
export const ButtonEvent = styled(Button)`
	// ${Button}
	transform:translateY(0px) translateZ(0px) !important;
`
export const EventCardTitle = styled.h3`
	margin-bottom: 5px;
	font-size: ${({ fontSize }) => (fontSize ? fontSize : '2rem')};
	color: ${darkRed};
	text-align:center;
`
export const EventCardImage = styled.div`
	width:90%;
	height:${({ height }) => (height ? height : '20vh')};
	margin-left:auto;
	margin-right:auto;
`
export const EventImg = styled.img`
	object-fit:cover;
    width:100%;
    height:100%;
    background:linear-gradient(to right,rgba(0,0,0,0.7),rgba(0,0,0,0.1));
`
export const EventCardDates = styled(TextWrapper)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: ${darkGray};
	>img{
		width:20px;
		height:20px;
		margin-bottom:4px;
		margin-top:4px;
	}
	>span{
		display:block;
		text-align:center;
		font-size:${({ fontSize }) => (fontSize ? fontSize : '1rem')};
	}
`
export const EventCardAddress = styled(TextWrapper)`
	margin: 0.5rem 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 0.8rem;
	color: ${darkGray};
	>img{
		width:20px;
		height:20px;
		margin-bottom:4px;
		margin-top:4px;
	}
	>span{
		display:block;
		text-align:center;
	}
`
export const EventCardDetails = styled.div`
	margin:${({ margin }) => (margin ? margin : '6px')};
	height:${({ height }) => (height ? height : 'auto')};
	overflow:${({ overflow }) => (overflow ? overflow : 'auto')};
	text-align: justify;
  	text-justify: inter-word;
	list-style: none;
	display: flex;
	flex-direction: column;
	color: ${lightGray};
`
export const NoEvent = styled.h1`
	color:${({ color }) => (color ? color : 'white')};
	font-size: 5rem;

	@media screen and (min-width: 960px) {
		font-size: 3rem;
	}
`
export const EventModalData = styled.div`
	width: 100%;
	text-decoration: none;
	height: auto;
	display: flex;
	flex-direction: column;
	padding: 24px;
	color: ${darkGray};
	margin: auto;
`
export const EventCardlocation = styled.div`
	width:90%;
	height:330px;
	margin-left:auto;
	margin-right:auto;
`
export const EventCardSubscribe = styled.div`
	display:flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width:60%;
	margin-left:auto;
	margin-right:auto;
	margin-bottom:10px;
	>input{
		margin-top: auto;
		border:1px solid ${lightGray};
		color:${darkGray};
		height:30px;
		width:250px;
		padding-left:3px;
	}
	>input:hover{
		border:1px solid ${lightRed};
	}
	>input:focus{
		border:1px solid ${darkRed};
	}
	>button{
		margin-top: auto;
		border:1px solid ${lightGray};
		color:${darkGray};
		transition: all 0.6s ease;
		height:30px;
		width:150px;
	}
	>button:hover{
		border:1px solid ${lightRed};
		color:${darkRed};
		font-size:14px;
		font-weight:600;
	}
`