import styled from 'styled-components'
import { darkRed, lightGray, lightGreen, lightRed, white } from '../../../services/colors'
import { Column, MainHeading1, Section } from '../../../services/globalStyles'

export const SubscrbiersAdminSection = styled(Section)`
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
export const DivTwoSide = styled.div`
    display: flex;
    flex-wrap: wrap;
	width:100%;
	height:25px;
	margin-top:${(marginTop) => (marginTop ? marginTop : 'auto')}
    align-content: space-between;
    justify-content: space-between;
`
export const InputBox = styled.input`
	width:${({ width }) => (width ? width : '250px')};
    height:${({ height }) => (height ? height : '25px')};
    background:${({ background }) => (background ? background : lightGray)};
    color:${({ color }) => (color ? color : white)};
	outline:none;
	box-shadow:none;
	border-top-style: hidden;
	border-right-style: hidden;
	border-left-style: hidden;
	border-bottom-style: groove;
	border-bottom-color:${white};
	&::placeholder{
		background:${({ placeholderColor }) => (placeholderColor ? placeholderColor : white)};
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
export const SpanSide = styled.span`
    width:150px;
    height:25px;
	margin-left:auto;
	margin-right:auto;
	text-align:center;
	color:${({ color }) => (color ? color : lightGreen)}
`
export const SubscribersTable = styled.table`
    width:100%;
    margin-left:auto;
    margin-right:auto;
    border:1p solid ${lightRed};
`
export const MiniTable = styled.table`
    width:160%;
    margin-left:auto;
    margin-right:auto;
    display:${({ display }) => (display ? display : 'none')};
    transition: all 1s linear;
    animation: show 1s linear;
    -webkit-animation: show 1s  linear; 
    background:${({ background }) => (background ? background : darkRed)};
    @keyframes show {
        from {
            transform: translateY(-100px);
        }
        to {
            transform: translateY(0px);
        }
    }
    @-webkit-keyframes show {
        from {
            transform: translateY(-100px);
        }
        to {
            transform: translateY(0px);
        }
    } 
    @media screen and (max-width:960px){
        width:120%;
    } 
`
export const SubscriberCardRow = styled.tr`
    width:100% !important;
    margin-left:auto;
    margin-right:auto;
    font-weight:500;
    color:${white};
    background-color:${({ backgroundColor }) => (backgroundColor ? backgroundColor : lightGreen)};
    &:hover{
        background-color:${darkRed};
        font-weight:600;
    }
`
export const SubscriberCardColumn = styled.td`
    margin-left:auto;
    margin-right:auto;
    padding:10px;
`