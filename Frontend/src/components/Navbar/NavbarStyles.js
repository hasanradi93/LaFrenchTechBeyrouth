import styled from 'styled-components'
import { Link as LinkScroll } from 'react-scroll'
import { Container } from '../../services/globalStyles'
import { darkGray, darkRed, white } from '../../services/colors'
import { Link } from 'react-router-dom'

export const Nav = styled.nav`
	background: ${({ background }) => (background ? darkGray : 'transparent')};
	margin-bottom: -80px;
	height: 65px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.2rem;
	position: sticky;
	top: 0;
	z-index: 999;
	transition: background-color 0.3s ease-in;
`
export const NavbarContainer = styled(Container)`
	display: flex;
	justify-content: start;
	height: 65px;
	@media screen and (min-width: 960px) {
		width:300px
	}

	${Container}
`
export const NavLogo = styled(Link)`
	color: ${white};
	justify-self: flex-start;
	cursor: pointer;
	text-decoration: none;
	font-size: 1.3rem;
	display: flex;
	align-items: center;
	z-index: 100;

	&:hover{
		color:${white}
	}

    @media only screen and (max-width: 600px) {
        font-size: 0.8rem;
    }
`
export const NavIcon = styled.img`
	margin-right: 0.5rem;
	width:${({ logoIconWidth }) => (logoIconWidth ? '3.5rem' : '5rem')};
	margin-top:${({ logoIconWidth }) => (logoIconWidth ? '5px' : '15px')};
    @media only screen and (max-width: 600px) {
        width: 3.5rem;
    }
`
export const MobileIcon = styled.div`
	display: none;
	z-index: 100;

	@media screen and (max-width: 960px) {
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		margin-top:-20px;
		transform: translate(-100%, 60%);
		font-size: 1.8rem;
		cursor: pointer;
	}
`
export const NavMenu = styled.ul`
	display: flex;
	align-items: center;
	list-style: none;
	text-align: center;
	width: 100%;

	@media screen and (max-width: 960px) {
		display: flex;
		flex-direction: column;
		margin-left:auto;
		margin-right:auto;
		width: 100%;
		height: 100vh;
		position: absolute;
		padding-top: 80px;
		padding-left:0px !important;
		top: ${({ show }) => (show ? 0 : '-100vh')};
		left: 0;
		opacity: 1;
		transition: all 0.5s ease;
		background: ${darkGray};
	}

	> li:first-child {
		margin-left: auto;
	}
`
export const NavItem = styled.li`
	height: 70px;
	padding-top:25px;
	cursor: pointer;

    @media only screen and (max-width: 600px) {
        height: 50px;
        margin-bottom:10px;
		padding-top:5px;
    }
	@media screen and (max-width: 960px) {
		width: 100%;

		&:hover {
			border: none;
		}
	}
`
export const NavLinks = styled(LinkScroll)`
	color: ${white};
	display: flex;
	align-items: center;
	text-decoration: none;
	padding: 1.5rem 1.5rem;
	height: 100%;
	font-weight:bold;
	&.active {
		border-bottom: 2px solid ${white};
	}
	&:hover {
		color:${darkRed};
		border-bottom: 2px solid ${darkRed};
	}
    @media only screen and (max-width: 600px) {
        padding: 0.3rem;

		&:hover {
			color: ${darkRed};
			transition: all 0.3s ease;
		}
    }
	@media screen and (max-width: 960px) {
		text-align: center;
		width: 100%;
		display: table;

		&:hover {
			color: ${darkRed};
			transition: all 0.3s ease;
		}
	}
`
export const NavItemBtn = styled.li`
	margin-top:25px;
	@media screen and (min-width: 961px) {
		margin-left:40px;
	}

	@media screen and (max-width: 960px) {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 70px;
		margin-top:10px;
	}
	@media only screen and (max-width: 600px) {
        margin-top:20px;
    }
	&:hover {
		box-shadow:none;
	}
	&:active {
		box-shadow:none;
		border:none;
		outline:none;
	}
	button {
		border-radius: 5px;

		@media screen and (max-width: 960px) {
			width: 100%;
		}
	}
`;

export const NavLangLinks = styled.span`
	color: ${darkGray};
	display: flex;
	align-items: center;
	text-decoration: none;
	padding: 1rem 1rem;
	font-weight:500;
	height: 20px;
	&:hover {
		color:${darkRed};
		border-bottom: 2px solid ${darkRed};
		cursor:pointer;
	}
	&:active {
		color:${white};
		border-bottom: 2px solid ${white};
		background-color:${darkRed};
	}
	@media only screen and (max-width: 600px) {
		padding: 0.3rem;
	}
	@media screen and (max-width: 960px) {
		text-align: center;
		padding: 0.5rem;
		width: 100%;
		display: table;

		&:hover {
			color: ${darkRed};
			transition: all 0.3s ease;
		}
	}
`
export const LangSpan = styled.span`
	height:20px;
	margin-left:5px;
	margin-right:5px;
	color:${white};
	&:hover{
		color${darkRed};
		cursor:pointer;
	}
`
export const ALang = styled.a`
	color:${white};
	text-decoration:none;
	&:hover{
		color:${darkRed};
		cursor:pointer;
	}
`
export const GlobalMenu = styled.div`
	display:block;
`