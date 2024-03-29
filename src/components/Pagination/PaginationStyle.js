import styled from "styled-components";

export const Container = styled.div`
    text-align: center;
`

export const Ul = styled.ul`
    text-align: center;
    margin: 0;
    padding: 0;
    display: inline-block;
`

export const Li = styled.li`
    list-style: none;
    display: inline-block;
    border-radius: 0.2vw;
    margin-right: 0.2vw;
    font-size: 0.6vw;
    padding: 0.6vw 1.3vw;
    border: 1px solid rgb(24,27,33);
    cursor: pointer;

    background: ${props => props.isSelected && props.pagesOnSlide > 0 ? 'transparent' : 'rgb(24,27,33)'};
    color: ${props => props.isSelected && props.pagesOnSlide > 0 ? 'rgb(24,27,33)' : 'white'};
    text-decoration: ${props => props.isSelected && props.pagesOnSlide > 0 ? 'underline' : 'none'};
    box-shadow:  ${props => props.isSelected && props.pagesOnSlide > 0 ? 'none' : '0px 0px 0.15vw 0.15vw rgb(0 0 0)'};
    border-color ${props => props.isSelected && props.pagesOnSlide > 0 ? 'transparent' : 'rgb(24,27,33)'};


`