import styled from 'styled-components'

export const ChatInfo = styled.div`
    color: white;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2.5vh;
`

export const Span = styled.span`
    border-radius: 1vw;
    padding: 0 3%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 0.85vw;
    position: relative;
    background: rgb(24,27, 33);
    box-shadow: 0px 0px 0.6vh 0.2vh rgb(0 0 0 / 75%);
`

export const MoreInfo = styled.span`
    width: 2.8vh;
    height: 2.8vh;
    text-align: center;
    box-shadow: 0px 0px 0.15vw 0.15vw rgb(0 0 0);
    background: rgb(24,27,33);
    border-radius: 50%;
    display: flex;
    color: white;
    align-items: center;
    justify-content: center;
    font-size: 1.5vh;
    flex: 0 0 2.8vh;
    margin-right: 1vw;
`

export const LoadingContainer = styled.div`
    width: 99%;
    display: flex;
    justify-content: center;
    top: 11vh;
    
    > div{
        width: 5vh;
        height: 5vh;
        background: rgb(24,27,33);
        box-shadow: 0px 0px 0.1vw 0.1vw rgb(0 0 0);
        border-radius: 1.5vh;
    }
`