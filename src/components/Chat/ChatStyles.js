import styled from 'styled-components';

export const ChatContainer = styled.div`
    height: 10.5vh;
    flex: 0 0 23vw;
    padding: 0 0.5%;
    background: white;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-right: 0.5vw;
    cursor: pointer;
`
export const ChatNode = styled.div`
    padding: 0 5%;
    border-radius: 0.5vw;
    width: 95%;
    height: 75%;
    position: relative;
    background: rgb(24,27, 33);
    text-decoration: none;
    box-shadow: 0px 0px 0.15vw 0.15vw rgb(0 0 0);

    > div {
        height: 100%;
        width: 100%;
        align-items: center;
        display: flex;
    }
`
export const ImageContainer = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 9.5vh;
    width: 9.5vh;
    border-radius: 50%;
    background: rgb(24,27, 33);
    box-shadow:0px 0px 0.2vw 0.09vw rgb(0, 0, 0, 0.8);

    img{
        border-radius: 50%;
        width: 5vh;
        height: 5vh;
        filter: drop-shadow(0px 1px 3px rgb(0 0 0));
    }
`

export const LastMsg = styled.span`
    color: #dbdada;
    text-decoration: overline;
    display: none;
    text-align: center;
`

export const Info = styled.div`
    flex: 1;
    font-size: 0.9vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    b{
        color: white;
        vertical-align: bottom;
        text-align: center;
    }

    ${LastMsg} {
        display: ${props => props.displayInfo ? 'block' : 'none'};
      }
`

export const InfoButton = styled.button`
    height: 2.5vh;
    width: 2.5vh;
    font-size: 1.2vh;
    border-radius: 50%;
    cursor: pointer;
`