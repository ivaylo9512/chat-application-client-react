import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    display: flex;
    position: relative;
    transition: 1.5s;
    bottom: 0;
`
export const Button = styled.button`
    width: 9vw;
    background: #181b21;
    border: 0;
    color: white;
    outline: none;
    font-size: 1vw;
    transition: 1.5s;
    border-radius: 5vw 5vw 5vw 5vw;
    cursor: pointer;
    border-radius: ${props => props.isHidden 
        ? '0 5vw 5vw 0'
        : '5vw 5vw 5vw 5vw'};
`
export const FormNode = styled.form`
    display: flex;
    position: absolute;
    justify-content: flex-end;
    background: #181b21;
    border: 0;
    color: #c2001b;
    outline: none;
    font-size: 1vw;
    border-radius: 0.5vw 5vh 5vh 0.5vw;
    cursor: pointer;
    box-shadow: 0px 0px 0.5vw 0.05vw rgb(0 0 0 / 85%);
    bottom: 3vw;
    right: 4vw;
    transition: transform 2s 1.75s,width 1.5s,height 1.5s,border-radius 1.5s;
    height: 4vw;
    width: 4vw;
    border-radius: 0.5vw 5vh 5vh 5vh;

    height: ${props => props.isHidden ? '11vh' : '4vw'};
    width: ${props => props.isHidden ? '40vw' : '4vw'};
    border-radius: ${props => props.isHidden 
        ? '0.5vw 5vh 5vh 0.5vw' 
        : '0.5vw 5vh 5vh 5vh'};

    input::placeholder {
        color: white;
        opacity: 1;
        font-size: 0.8vw;
        font-weight: bold;
    }
      
    input:-ms-input-placeholder {
        color: white;
        font-size: 0.8vw;
        font-weight: bold;
    }
      
    input::-ms-input-placeholder {
        color: white;
        font-size: 0.8vw;
        font-weight: bold;
    }
    
    input{
        flex: 1;
        border-radius: 0.5vw 0px 0px 0.5vw;
        text-align: center;
        outline: none;
        box-sizing: border-box;
        font-size: 1vw;
        background: #181b21;
        color: white;
        width: 0;
        padding: 0;
        border: 0;
        position: relative;
        right: -0.2vw;        
        max-width: ${props => props.isHidden ? 'none' : 0};
    }
`