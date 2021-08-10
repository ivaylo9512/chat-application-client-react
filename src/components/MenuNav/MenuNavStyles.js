import styled from 'styled-components'

export const Nav = styled.nav`
    position: relative;
    height: 32vw;
    width: 32vw;

    li:first-child {
        transform: rotate(-5deg);
    }
    li:nth-child(2) {
        transform: rotate(15deg);
    }
    li:nth-child(3) {
        transform: rotate(35deg);
    }
    li:nth-child(4) {
        transform: rotate(55deg);
    }
    li:nth-child(5) {
        transform: rotate(75deg);
    }
    li:nth-child(6) {
        transform: rotate(95deg);
    }
    li:nth-child(6) {
        transform: rotate(95deg);
    }
    li:nth-child(6) {
        transform: rotate(95deg);
    }
    li:nth-child(7) {
        transform: rotate(120deg);
    }
    li:nth-child(8) {
        transform: rotate(140deg);
    }
    li:nth-child(9) {
        transform: rotate(160deg);
    }
`

export const Li = styled.li`
    position: absolute;
    font-size: 1.5em;
    width: 4vw;
    height: 100%;
    left: 50%;
    margin-left: -2vw;
    transform-origin: center;
    list-style: none;

    a{
        text-align: center;
        line-height: 3vw;
        position: absolute;
        top: 1vw;
        border-radius: 50%;
        font-size: 0.95vw;
        color: white;
        height: 3vw;
        width: 3vw;
        background: rgb(24,27, 33);
        padding: 0;
        border: 0;
        box-shadow: 0px 0px 0.5vw 0.1vw rgb(0, 0, 0, 0.8)
    }
`

export const Button = styled.button`
    position: absolute;
    top: 1vw;
    border-radius: 50%;
    font-size: 0.95vw;
    color: white;
    height: 3vw;
    width: 3vw;
    background: rgb(24,27, 33);
    padding: 0;
    border: 0;
    box-shadow: 0px 0px 0.5vw 0.1vw rgb(0, 0, 0, 0.8);
`

export const Span = styled.span`
    font-size: 1.1em;
    opacity: 0.7;
`