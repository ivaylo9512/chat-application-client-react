import styled from 'styled-components'

export const Container = styled.div`
    height: 26%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 3s;

    margin-bottom: ${props => props.isHidden ? '-26vh' : '0'}
`

export const Button = styled.button`
    width: 25%;
    background: #181b21;
    border: 0;
    color: #c2001b;
    outline: none;
    font-size: 1vw;
`

export const FormNode = styled.form`
    height: 47%;
    width: 70%;
    display: flex;
    box-shadow: 0px 0px 0.3vw 0px rgb(0, 0, 0, 0.75);
    border-radius: 0.5vw 0px 0px 0.5vw;
    
    input{
        flex: 1;
        border: 0.2vh solid #171a20;
        border-radius: 0.5vw 0px 0px 0.5vw;
        text-align: center;
        outline: none;
        box-sizing: border-box;
        font-size: 1vw;
    }
`