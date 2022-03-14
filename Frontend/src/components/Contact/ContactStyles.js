import { motion } from 'framer-motion'
import styled from 'styled-components'
import { white, lightGray, darkGreen, darkRed, lightRed, darkGray, lightGreen } from '../../services/colors'
import { Row, Column, Section, SecondHeading, MainHeading1 } from '../../services/globalStyles'

export const ContactFormSection = styled(Section)`
    &${Section}
`
export const RowForm = styled(Row)`
    &${Row}
`
export const ColumnForm = styled(Column)`
    &${Column}

    @media screen and (max-width: 960px) {
		max-width: 100% !important;
		flex-basis: 100%;
	}
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
export const FormSelect = styled.select`
	display: block;
	padding-left: 10px;
	outline: none;
	height: 40px;
	width: 100%;
	border: none;
	border-bottom: 1px solid ${lightGray};
	font-size: 1rem;
	color:${({ color }) => (color ? color : lightRed)};
    transition: all 1s;
`
export const FormOption = styled.option`
    font-size: 1rem;
    outline: none;
    color:${({ color }) => (color ? color : lightRed)};
`
export const FormTextarea = styled.textarea`
	display: block;
	padding-left: 10px;
	outline: none;
	height: 40px;
	width: 100%;
	border: none;
	border-bottom: 1px solid ${lightGray};
	font-size: 1rem;
    transition: all 1s;
	color:${lightRed};
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
	text-align: left;
`
export const FAQSetion = styled(Section)`
    &${Section}
`
export const FAQWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	width: ${({ width }) => (width ? width : 'auto')};
	@media screen and (max-width: 960px) {
		margin: 0 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`
export const MainHeading1Edited = styled(MainHeading1)`
  text-shadow:2px 2px 0 ${lightGray}, 3px 3px 0 ${lightGray},
  4px 4px ${darkGreen}, 5px 5px 0 ${lightGray}; 
//   transition: all 1.5s ease;
//   transform:${({ transformX }) => (transformX ? (`translateX(-150%)`) : 'translateX(50%)')};
${MainHeading1}
`
export const ArticleSection = styled.div`
	width:100%;
	height:auto;
`
export const ArticleHeader = styled.div`
	width: 100%;
	display: flex;
	padding:5px;
	justify-content: space-between;
	transition:all 0.5s ease-in;
	color:${({ color }) => (color ? color : lightGray)};
	background-color:${({ backgroundTitle }) => (backgroundTitle ? backgroundTitle : white)}
`
export const ArticleHeaderQuestion = styled.div`
	width: 100%;
	border: solid 1px ${({ backgroundQuestion }) => (backgroundQuestion ? lightRed : lightGray)};
	display: flex;
	color:${({ backgroundQuestion }) => (backgroundQuestion ? white : lightRed)};
	justify-content: space-between;
	transition:all 0.5s ease-in;
	background-color:${({ backgroundQuestion }) => (backgroundQuestion ? lightGray : white)};
`
export const ArticleQuestionName = styled.h2`
	width: 80%;
	padding:5px;
	font-size:2rem;
	font-weight: 500;
	transition:all 0.5s ease-in;
`
export const QuestionToggleBtn = styled.button`
	width: 100px;
	height: 20px;
	font-size: 2rem;
	font-weight: 600;
	transition:all 0.5s ease-in;
`
export const ArticleTitle = styled.h1`
	width: 80%;
	transition:all 0.5s ease-in;
`
export const AritcleData = styled.div`
	width: 100 %;
	height: auto;
	transition:all 0.5s ease-in;
`
export const ArticleDescription = styled.p`
	width: 100 %;
	height: auto;
	transition:all 0.5s ease-in;
	padding:15px;
	font-size:1.3rem;
	color:${lightGray};
	text-align: justify;
  	text-justify: inter-word;
	border: 1px solid ${({ backgroundQuestion }) => (backgroundQuestion ? lightRed : lightRed)};
`
export const TitleToggleBtn = styled.button`
	width: 100px;
	height: 35px;
	background:none;
	outline:none;
	transition:all 0.5s ease-in;
	border:none;
	font-size: 2rem;
	font-weight: 600;
	color:${({ color }) => (color ? color : lightGray)};
`