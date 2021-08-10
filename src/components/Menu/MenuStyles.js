import styled from 'styled-components'

export const MenuCircle = styled.button`
    border-radius: 50%;
    border: 0px;
    box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.75);
    height: 2.7em;
    width: 2.7em;
    background: rgb(24,27, 33);
    color: white;
    font-size: 1.2em;
    position: absolute;
    top: 100%;
    left: -2em;
`

export const MenuContainer = styled.div`
    width: ${props => props.isHidden 
        ? '0%' 
        : '27%'
    };
    transition: all 4s;

    ${MenuCircle}{
        transition: ${props => props.isHidden 
            ? 'all 2s 1.75s' 
            : 'all 2s'
        };
        transform: ${props => props.isHidden 
            ? 'translate(4em, -5em)'
            : 'translate(0, 0)'
        };
    }

    > div{
        height: 100%;
        width: 100%;
        transform: ${props => props.isHidden 
            ? 'translate(-22.5em, 18em);'
            : 'translate(0, 0)'
        };
        transition: all 4s; 
    }
`

export const CircleNav = styled.div`
    overflow: hidden;
    position: fixed;
    bottom: -11.6vw;
    border: 0.5px solid #c2001b;
    right: 100%;
    border-radius: 50%;
    margin-right: -26.8vw;
    background: rgb(24,27, 33);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 0.4vw 0.2vw rgb(0, 0, 0, 0.75);


    ul{
        margin: 0;
    }
`

export const CircleBtn = styled.button`
    background: rgb(24,27, 33);
    border: 0px;
    color: #c2001b;
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