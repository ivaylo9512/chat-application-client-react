import { useEffect, useState, useRef } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { getHeaderVisibility } from 'app/slices/stylesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getChatsState, chatsRequest } from 'app/slices/chatsSlice';
import ChatList from 'components/ChatList/ChatList';
import { Scroll, Container } from 'components/HeaderScroll/HeaderScrollStyle';

const HeaderScroll = () => {
    const listContainer = useRef()
    const scrollContainer = useRef()
    const [padding, setPadding] = useState(`0 0.5%`)
    const isHidden = useSelector(getHeaderVisibility) 
    const { isLoading, data: { chats, isLastPage }, query } = useSelector(getChatsState);
    const dispatch = useDispatch();

    useEffect(() => {
        if(query || chats){
            hideScrollBar()
        }
    }, [query, chats])
    
    useEffect(() => {
        window.addEventListener('resize', hideScrollBar)
        smoothscroll.polyfill()

        return () => window.removeEventListener('resize', hideScrollBar)
    }, []) 

    const hideScrollBar = () => {
        const height = parseFloat(window.getComputedStyle(listContainer.current).height)
        const containerHeight = parseFloat(window.getComputedStyle(scrollContainer.current).height)

        const barHeight = containerHeight - height
    
        setPadding(`${barHeight / 2}px 0.5% ${barHeight}px 0.5%`)
    }

    const scroll = ({currentTarget, deltaY}) => {
        const {scrollLeft, scrollTop} = currentTarget
        currentTarget.scroll({left: scrollLeft + deltaY * 4 , top: scrollTop, behavior: 'smooth'})

        if(deltaY > 0){
            fetchMoreChats(currentTarget);
        }
    }

    const fetchMoreChats = ({scrollLeft, clientWidth, scrollWidth}) => {
        if(scrollLeft + clientWidth >= scrollWidth && !isLastPage && !isLoading){
            dispatch(chatsRequest({...query}))
        }
    }

    return (
        <Scroll isHidden={isHidden} ref={scrollContainer}>
            <Container ref={listContainer} style={{padding}} onWheel={scroll}>
                <ChatList />
            </Container>
        </Scroll>
    )
}

export default HeaderScroll