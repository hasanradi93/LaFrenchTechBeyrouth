import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { motion } from 'framer-motion';
import { white, darkPink } from '../../services/colors'

export const Background = styled(motion.div)`
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
	top: 0;
	left: 0;
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 99;
`
export const ModalWrapper = styled(motion.div)`
	width: clamp(400px, 90vw, 800px);
	height: 90vh;
	box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
	background: ${white};
	color: ${darkPink};
	display: flex;
	position: relative;
	overflow: scroll;
	border-radius: 3px;
	top:5px;
	z-index: 100;
	text-align:center;
	margin-top:-70px;
`
export const CloseModalButton = styled(MdClose)`
	cursor: pointer;
	position: absolute;
	top: 20px;
	right: 20px;
	width: 32px;
	height: 32px;
	padding: 0;
	z-index: 10;
`
export const ImgLoading = styled.img`
	display:flex;
	width:64px;
	height:64px;
	margin:auto;
`