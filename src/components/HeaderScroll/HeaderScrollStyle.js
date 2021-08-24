import styled from 'styled-components'

export const Scroll = styled.div`
    height: 11%;
    overflow: hidden;
    transition: all 3s;

    margin-top: ${props => props.isHidden ? '-11vh' : '0'}
`
export const Container = styled.div`
    height: 100%;
    width: 100%;
    padding: 0 0.5%;
    display: flex;
    overflow-y: hidden;
    align-items: center;
`