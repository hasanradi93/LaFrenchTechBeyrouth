import { motion } from 'framer-motion'
import styled from 'styled-components'
import {
	lightGray
	, lightRed
	, white
	, darkRed
	, darkGreen
	, darkGray
} from '../../../services/colors'
import {
	Section
	, Row
	, Column
	, SecondHeading
} from '../../../services/globalStyles'

export const LoginSection = styled(Section)`
    &${Section}
`
export const RowForm = styled(Row)`
	margin:auto !important;
	&${Row}
`
export const ColumnForm = styled(Column)`
	margin:auto !important;
	width:30%;
    @media screen and (max-width: 960px) {
		max-width: 70% !important;
		flex-basis: 70%;
		width:90%;
	}
	&${Column}
`
export const FormTitle = styled(SecondHeading)`
    line-height: 1.1;
	padding-top:10px;
    ${SecondHeading}
    @media screen and (max-width: 960px) {
        font-size:36px;
        font-weight:500;
    }
`
export const FormInput = styled.input`
	display: block;
	padding-left: 10px;
	outline: none;
	height: 40px;
	width: 100%;
	border: none;
	border-bottom: 1px solid ${lightGray};
	color:${lightRed};
	font-size: 1rem;
    transition: all 1s;
`
export const FormInputRow = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: stretch;
    position: relative;
    margin: 0 0 30px 0;
    font-family: impact;
    font-size: 16px;
`
export const FormLabel = styled.label`
	display: inline-block;
	font-size: 0.9rem;
	margin-bottom: 0.3rem;
	position: absolute;
    left:0px;
    top: 0;
    line-height:15px;
    transition: all 0.5s;
    overflow: hidden;
    color: ${lightGray};
    white-space: nowrap;
    z-index: 1;
    opacity: 0;
	&${FormInputRow}:focus,${FormInputRow}:hover &{
		opacity: 1;
		top: -15px; 
		font-size:0.7rem;
	}
`
export const FormWrapper = styled.form`
	padding-top: 0;
	width: 100%;
	${FormInput}{
		outline: none;
  		border-color: rgba(82, 168, 236, 0.8);
	}
`
export const FormButton = styled.button`
	border-radius: 4px;
	background: ${white};
	white-space: nowrap;
	padding: 10px 20px;
	font-size: 16px;
	color: ${darkRed};
	outline: none;
	border: 2px solid ${darkRed};
	cursor: pointer;
    text-transform: uppercase;
	transition: all 0.6s ease;
	margin:auto;
	&:hover {
		color:${white};
        box-shadow: 0 0 2px 2px ${lightRed};
        border: 2px solid ${white};
		background: ${darkGray};
	}
`
export const FormMessage = styled(motion.div)`
	color: ${({ error }) => (error ? darkRed : darkGreen)};
	padding: 5px;
	font-size:1.3rem;
	width:80%;
	margin:auto;
	text-align: center;
	@media screen and (max-width: 960px) {
        width:100%;
    }
`