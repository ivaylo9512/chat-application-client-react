import React, { useEffect, useState, useRef } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import './HeaderScroll.css'
import { getHeaderVisibility } from '../../app/slices/stylesSlice';
import { useSelector } from 'react-redux';
import { getChatsQuery } from '../../app/slices/chatsSlice';
import ChatList from '../ChatList/ChatList';

const HeaderScroll = () => {
    const listContainer = useRef()
    const scrollContainer = useRef()
    const [listPadding, setListPadding] = useState({})
    const query = useSelector(getChatsQuery)
    const isHidden = useSelector(getHeaderVisibility) 

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
    
        setListPadding({paddingBottom:`${barHeight}px`})
    }

    const scroll = (e) => {
        e.currentTarget.scroll({left: e.currentTarget.scrollLeft + e.deltaY * 4 , top: e.currentTarget.scrollTop, behavior: 'smooth'})
    }

    return (
        <div className={`header-scroll${isHidden ? ' hidden' : ''}`} ref={scrollContainer}>
            <div ref={listContainer} style={listPadding} onWheel={scroll}>
                <ChatList />
            </div>
        </div>
    )
}

export default HeaderScroll