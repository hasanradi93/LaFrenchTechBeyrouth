import styled from 'styled-components'
import { darkGray, darkRed, lightRed, white } from '../../services/colors'
export const ErrorContainer = styled.div`
    width:${({ width }) => (width ? width : '100%')};
    height:${({ height }) => (height ? height : '35px')};
    display:flex;
    margin-bottom:10px;
`
export const Error = styled.span`
    width: 100%;
    height:${({ height }) => (height ? height : '35px')};
    padding: 0.5em;
    border-radius: 8px;
    margin: 1rem 0;
    border: 1px solid ${lightRed};
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${white};
    color: ${({ color }) => (color ? color : darkGray)};
    font-size:${({ fontSize }) => (fontSize ? fontSize : '2.5rem')};
    text-align:center;
    animation: bounce 1s infinite alternate;
    -webkit-animation: bounce 1s infinite alternate; 
    @keyframes bounce {
        from {
            transform: translateY(0px);
        }
        to {
            transform: translateY(-15px);
        }
    }
    @-webkit-keyframes bounce {
        from {
            transform: translateY(0px);
        }
        to {
            transform: translateY(-15px);
        }
    }    
`
export const ErrorButton = styled.button`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${darkRed};
    color:  ${white};
`