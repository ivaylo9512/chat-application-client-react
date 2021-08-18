import React, { useEffect, useState, useRef } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { getHeaderVisibility } from 'app/slices/stylesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getChatsQuery, getChatsData, getChatsState, chatsRequest } from 'app/slices/chatsSlice';
import ChatList from 'components/ChatList/ChatList';
import { Scroll, Container } from './HeaderStyle';

const HeaderScroll = () => {
    const listContainer = useRef()
    const scrollContainer = useRef()
    const [paddingBottom, setPaddingBottom] = useState(0)
    const query = useSelector(getChatsQuery)
    const isHidden = useSelector(getHeaderVisibility) 
    const { isLoading, data: { isLastPage } } = useSelector(getChatsState);
    const dispatch = useDispatch();

    useEffect(() => {
        hideScrollBar()
    }, [query])
    
    useEffect(() => {
        window.addEventListener('resize', hideScrollBar)
        smoothscroll.polyfill()

        return () => window.removeEventListener('resize', hideScrollBar)
    }, []) 

    const hideScrollBar = () => {
        const height = parseFloat(window.getComputedStyle(listContainer.current).height)
        const containerHeight = parseFloat(window.getComputedStyle(scrollContainer.current).height)

        const barHeight = containerHeight - height
    
        setPaddingBottom(`${barHeight}px`)
    }

    const scroll = ({currentTarget, deltaY}) => {
        const {scrollLeft, scrollTop} = currentTarget
        currentTarget.scroll({left: scrollLeft + deltaY * 4 , top: scrollTop, behavior: 'smooth'})

        fetchMoreChats(currentTarget);
        console.log(scrollLeft + currentTarget.clientWidth == currentTarget.scrollWidth);
    }

    const fetchMoreChats = ({scrollLeft, clientWidth, scrollWidth}) => {
        if(scrollLeft + clientWidth == scrollWidth && !isLastPage && !isLoading){
            dispatch(chatsRequest({...query}))
        }
    }

    return (
        <Scroll isHidden={isHidden} ref={scrollContainer}>
            <Container ref={listContainer} style={{paddingBottom}} onWheel={scroll}>
                <ChatList />
            </Container>
        </Scroll>
    )
}

export default HeaderScroll