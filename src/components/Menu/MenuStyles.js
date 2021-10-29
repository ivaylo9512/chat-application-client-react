import styled from 'styled-components'

export const MenuCircle = styled.button`
    border-radius: 50%;
    border: 0px;
    box-shadow: 0px 0px 0.2vw 0.1vw rgba(0,0,0,0.75);
    height: 4vw;
    width: 4vw;
    background: rgb(24,27, 33);
    color: white;
    font-size: 1.4vw;
    position: absolute;
    bottom: -4vw;
    left: -4vw;

    transition: ${props => props.isHidden 
        ? 'transform 2s 1.75s' 
        : 'transform 2s'
    };
    transform: ${props => props.isHidden 
        ? 'translate(7vw, -7vw)'
        : 'translate(0, 0)'
    };
`

export const MenuContainer = styled.div`
    width: ${props => props.isHidden 
        ? '0%' 
        : '27%'
    };
    transition: all 4s;

    > div{
        height: 100%;
        width: 100%;
        transform: ${props => props.isHidden 
            ? 'translate(-27.8vw, 21vw);'
            : 'translate(0, 0)'
        };
        transition: all 4s; 
    }
`

export const CircleNav = styled.div`
    overflow: hidden;
    position: fixed;
    bottom: -13.2vw;
    margin-right: -19.8vw;
    border: 0.1vw solid white;
    right: 100%;
    border-radius: 50%;
    background: rgb(24,27, 33);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 0.3vw 0.1vw rgb(0 0 0 / 65%);


    ul{
        margin: 0;
    }
`

export const CircleBtn = styled.button`
    background: rgb(24,27, 33);
    border: 0px;
    color: white;
    font-size: 2.3vw;
    height: 22.5vw;
    width: 22.5vw;
    position: absolute;
    right: 50%;
    top: 50%;
    margin-right: -11.25vw;
    margin-top: -11.25vw;
    bottom: -6.7vw;
    border-radius: 50%;
    cursor: pointer;
    z-index: 3;
    padding: 0;
`