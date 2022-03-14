import styled from 'styled-components'
import { motion } from 'framer-motion'
import { darkGray, darkRed, white } from '../../services/colors'
export const HeroSection = styled.div`
    height:103vh;
    background-position:center;
    background-size:cover;
    padding-top:clam(70px,25vh,220px);
    box-shadow:inset 0 0 0 1000px rgba(0,0,0,0.2);
    bacground-attachment:fixed;
    display:flex;

    @media screen and (max-width: 768px) {
		padding-top: 120px;
	}
`
export const HeroVideo = styled.video`
    object-fit:cover;
    width:100%;
    height:100%;
    background:linear-gradient(to right,rgba(0,0,0,0.7),rgba(0,0,0,0.1));
    top:0;
    position:absolute;
    z-index:-1;
`
export const ButtonWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	flex-flow: wrap;
	gap: 0.5rem;
`
export const HeroButton = styled(motion.button)`
	position: absolute;
	width: 250px;
	margin: 0 auto;
	padding: 15px 20px;
	bottom: calc(100vh - 100px);
	right: 50%;
	transform: translate(50%);
	font-weight: 700;
	font-size: 0.688rem;
	line-height: 18px;
	letter-spacing: 1.54px;
	text-transform: uppercase;
	border-radius: 25px;
	border: none;
	background-color: ${white};
	color: ${white};
	cursor: pointer;
	transition: all 0.4s ease-in;
	opacity:0;
	&.corner {
		position: fixed;
		bottom: 3rem;
		right: 3rem;
		width: 64px;
		height: 64px;
		padding: 10px;
		background-color: ${darkRed};
		border-radius: 50%;
		z-index:999;
	}

	&:hover {
		box-shadow: 0 0 2px 2px ${darkGray};
		transition: box-shadow 0.3s ease-in;
	}
`