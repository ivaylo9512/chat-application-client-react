import styled from 'styled-components'
import { ImageContainer } from '../Chat/ChatStyles'

export const Container = styled.div`
    height: 20vh;
    margin-bottom: 2vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    height: 100%;
    justify-content: center;

    span:nth-child(2){
        text-decoration: overline;
    }
`

export const InfoContainer = styled.div`
    display: inline-block;
    width: 19vw;
    height: 9.5vh;
    vertical-align: bottom;
    margin-left: 1vw;
    display: inline-flex;
    border-radius: 0.5vw;
    background: rgb(24,27,33);
    text-decoration: none;
    box-shadow: 0px 0px 0.15vw 0.15vw rgb(0 0 0);
    position: relative;
    display: flex;
    color: white;
    align-items: center;
    font-size: 0.8vw;
    justify-content: center;

    ${Info}{
        display: ${props => props.isInfoVisible ? 'flex' : 'none'}
    }

    > span{
        display: ${props => props.isInfoVisible ? 'none' : 'block'}
    }
`

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 1vw;
`

export const Button = styled.button`
    background: rgb(24,27,33);
    margin-left: 1vw;
    height: 2.5vh;
    width: 2.5vh;
    font-size: 1vh;
    margin: 0.5vh 0;
    color: white;
    border-radius: 50%;
    box-shadow: 0px 0px 0.15vw 0.15vw rgb(0 0 0);

    :hover{
        transform: scale(1.1);
    }
`

export const Image = styled(ImageContainer)`
    display: inline-flex;
    box-shadow: 0px 0px 0.15vw 0.15vw rgb(0 0 0);
`