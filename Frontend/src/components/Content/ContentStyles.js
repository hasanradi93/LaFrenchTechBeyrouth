import styled from 'styled-components';
import { motion } from 'framer-motion';
import { darkGreen, darkRed, lightGray, white } from '../../services/colors';

export const ContentRow = styled.div`
	display: flex;
	margin: 0 -15px -15px -15px;
	flex-wrap: wrap;
	align-items: center;
	flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
	justify-content: space-around;

	@media screen and (max-width: 960px) {
		flex-direction: column-reverse;
	}
`
export const ContentColumn = styled(motion.div)`
	margin-bottom: 15px;
	padding-right: 15px;
	padding-left: 15px;
	flex: 1;
	z-index: 10;
	display: flex;
	flex-direction: column;
	@media screen and (max-width: 960px) {
		max-width: 100% !important;
		flex-basis: 100%;
		justify-content: center;
		align-items: center;
	}
`
export const TextWrapperContent = styled.div`
	max-width: 540px;
	padding-top: 0;

	@media screen and (max-width: 960px) {
		padding-bottom: 65px;
		> h1,
		p {
			text-align: center;
		}
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	> img {
		width: 300px;
		margin-left: -3px;
	}
`
export const ImgWrapper = styled(motion.div)`
display: flex;
justify-content: ${({ imgStart }) => (imgStart ? 'flex-start' : 'flex-end')};
max-height: 600px;
justify-content: center;
border-radius: 1rem;
position: relative;
background-image: ${({ background }) => (background ? background : `url(${process.env.PUBLIC_URL + '/assets/images/content/hero-pattern-bg-lg.png'})`)};
&:before {
    width: 100%;
    height: 100%;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
	background-image: ${({ background }) => (background ? background : `url(${process.env.PUBLIC_URL + '/assets/images/content/hero-pattern-bg-lg.png'})`)};
    background-size: 100% auto;
    object-fit: cover;
}
`
export const TopLine = styled(motion.div)`
	font-size: 0.9rem;
	line-height: 16px;
	font-weight: 550;
	letter-spacing: 1.4px;
	margin-bottom: 1.3rem;
	color: ${darkGreen};
`
export const Img = styled(motion.img)`
	padding-right: 0;
	border: 0;
	max-width: 100%;
	vertical-align: middle;
	display: inline-block;
	object-fit: cover;
	max-height: 700px;
	z-index: 1;
`
export const Heading = styled(motion.h2)`
	margin-bottom: 24px;
	font-size: 3rem;
	line-height: 1.1;
	font-weight: 600;
	color: ${({ inverse }) => (inverse ? white : darkRed)};

	@media screen and (max-width: 960px) {
		text-align: center;
		font-size: 2rem;
	}
`
export const Subtitle = styled(motion.p)`
	max-width: 440px;
	margin-bottom: 35px;
	line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '24px')};
	text-align: justify;
	text-justify: inter-word;
	color: ${({ inverse }) => (inverse ? white : lightGray)};
	font-size: ${({ fontSize }) => (fontSize ? fontSize : '1rem')};
`