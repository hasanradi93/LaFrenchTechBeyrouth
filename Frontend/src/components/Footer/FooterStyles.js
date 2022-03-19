import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Column, Row } from '../../services/globalStyles';
import { darkGray, darkRed, lightGray, lightGreen, white } from '../../services/colors';

export const FooterContainer = styled.div`
	background-color: ${darkGray};
	padding: 4rem 0 2rem 0;
`
export const FooterWrapper = styled.div`
	max-width: 1280px;
	margin-left: auto;
	margin-right: auto;
    padding-top:10px;
    border-top: 1px solid ${white};
`
export const FooterSubscription = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin-bottom: 24px;
	padding: 24px;
	color: ${white};
`
export const FooterSubHeading = styled.p`
	margin-bottom: 24px;
	font-size: 24px;
`
export const FooterRow = styled(Row)`
	flex-wrap: wrap;
    justify-content: center;
	align-items: center;
	text-align: center;
    color: ${white};
	@media screen and (max-width: 820px) {
		> div {
			width: 20%;
            font-size:14px;
		}

		> div:first-child {
			width: 100%;
		}
	}

	@media screen and (max-width: 420px) {
		flex-direction: column;
		align-items: center;

		* {
			width: 100%;
			text-align: center;
		}
	}
`
export const FooterGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	justify-content: center;
	align-items: center;
`
export const FooterColumn = styled(Column)`
	@media screen and (max-width: 999px) {
		align-items: center;
		grid-column: 1/-1;
	}
`
export const FooterSubText = styled.p`
	margin-bottom: 24px;
	font-size: 20px;
`
export const FooterLinksContainer = styled.div`
	width: 100%;
	max-width: 1000px;
	display: flex;
	justify-content: center;

	@media screen and (max-width: 820px) {
		padding-top: 32px;
	}
`
export const FooterLinkItems = styled.div`
	display: flex;
	flex-direction: column;
	margin: 16px;
	text-align: center;
	box-sizing: border-box;
	color: ${white};

	@media screen and (max-width: 1000px) {
		align-items: center;
	}
`
export const FooterLinkTitle = styled.h2`
	margin-bottom: 16px;
`
export const FooterLink = styled(Link)`
	color:  ${white};
	text-decoration: none;
	margin-bottom: 0.5rem;

	&:hover {
		color: ${lightGreen};
		transition: 0.3s ease-out;
	}
`
export const FooterLogo = styled(Link)`
	color:  ${white};
	justify-self: start;
	cursor: pointer;
	text-decoration: none;
	font-size: 1.5rem;
	display: flex;
	align-items: center;
	margin-bottom: 16px;
    &:hover{
        color:${lightGreen};
    }
`
export const SocialIcon = styled.img`
	margin: auto;
	width: 128px;
    background:${white};
    border-radius:50%;
    &:hover{
        background:${lightGreen};
    }
`
export const FooterRights = styled.div`
	color:  ${white};
	margin-bottom: 16px;
	width: 100%;
	font-size: 0.8rem;
	text-align: center;
	border-top: 1px solid ${lightGreen};
	padding: 1rem 0;
	margin: 1rem 0 0;
`
export const FooterSocialIcon = styled.a`
	color:  ${white};
	font-size: 24px;
    &:hover{
        color:${darkRed};
    }
`
export const FooterAddress = styled.div`
	color:  ${white};
	margin: 0.4rem auto 0.4rem;
	max-width: 20rem;
	font-weight: 500;
	font-size: 0.875rem;
	line-height: 2;
	text-align: center;

	@media screen and (min-width: 1000px) {
		margin-left: 0px;
		text-align: left;
		margin-right: 1rem;
	}
`
export const FooterMailPhone = styled.div`
	color:  ${white};
	margin: 0.4rem auto 0.4rem;
	max-width: 20rem;
	font-weight: 500;
	font-size: 1rem;
	line-height: 1.5;
	text-align: center;

	@media screen and (min-width: 1000px) {
		margin-left: 0px;
		text-align: left;
		margin-right: 1rem;
	}

	>a{
		color:  ${white};
		text-decoration:none;
	}
	>a:hover{
		color:  ${lightGray};
	}
`