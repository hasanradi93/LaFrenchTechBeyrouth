import styled from 'styled-components'
import { lightGray, white, darkRed, darkGray, lightGreen, lightRed } from '../../../services/colors'
import { Section, MainHeading1, Column, TextWrapper, Button } from '../../../services/globalStyles'

export const EventsSection = styled(Section)`
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
export const FilterSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: space-between;
    width:100%;
    height:35px;
	margin-bottom:15px;
    background:${lightGray};
`
export const ButtonInEvents = styled.a`
	color:  ${white};
	border:1px solid ${white};
	font-size: 22px;
    cursor:pointer;
	width:36px;
	text-align:center;
	paddin-bottm:2px;
    margin-top:-5px;
    &:hover{
        color:${darkRed};
		background-color:${white};
    }
`
export const ButtonInEvents2 = styled.a`
	color:  ${lightGray};
	// border:1px solid ${lightGray};
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
export const ColumnFilter = styled(Column)`
    padding:5px;
`
export const CMBFilter = styled.select`
    padding-top:5px;
    width:150px;
    height:25px;
	margin-right:5px;
    background:${lightGray};
    color:${white};
	border:1px solid ${white};
	&:hover{
        color:${darkRed};
		border:1px solid ${darkRed};
    }
	&:focus{
        color:${darkRed};
		border:1px solid ${darkRed};
    }
`
export const InputBox = styled.input`
    width:250px;
    height:25px;
    background:${lightGray};
    color:${white};
	outline:none;
	box-shadow:none;
	border-top-style: hidden;
	border-right-style: hidden;
	border-left-style: hidden;
	border-bottom-style: groove;
	border-bottom-color:${white};
	&::placeholder{
		color:${white};
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
export const DivTwoSide = styled.div`
    display: flex;
    flex-wrap: wrap;
	width:100%;
	height:25px;
    align-content: space-between;
    justify-content: space-between;
`
export const SpanSide = styled.span`
    width:150px;
    height:25px;
`
export const SpanSide2 = styled.span`
    width:50%;
	float:left;
    height:36px;
	cursor:pointer;
	text-align:center;
	&:hover{
        color:${darkRed};
		background-color:${darkGray};
		>a{
			color:${darkRed};
		}
    }
`
export const EventsContainer = styled.div`
    background:${lightGray};
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
	height: 85vh;

	display: flex;
	flex-direction: column;
	padding: 24px;
	color: ${white};
	margin: auto;

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