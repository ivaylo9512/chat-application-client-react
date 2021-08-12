import styled from 'styled-components'
import { ImageContainer } from '../Chat/ChatStyles'

export const Container = styled.div`
    height: 20vh;
    margin-bottom: 2vh;
    display: flex;
    justify-content: center;
    align-items: center;
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
`

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    font-size: 1vw;
    flex: 1;
    text-align: center;
`

export const EnterButton = styled.button`
    background: rgb(24,27,33);
    margin-left: 1vw;
    height: 2.5vh;
    width: 2.5vh;
    font-size: 1vh;
    color: white;
    border-radius: 50%;
    box-shadow: 0px 0px 0.15vw 0.15vw rgb(0 0 0);
`

export const Image = styled(ImageContainer)`
    display: inline-flex;
`