import React, { useEffect, useState, useRef } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import './HeaderScroll.css'
import { getStylesHeaderState } from '../../app/slices/stylesSlice';

const HeaderScroll = () => {
    const listContainer = useRef()
    const scrollContainer = useRef()
    const [listPadding, setListPadding] = useState({})
    const name = useSelector(getChatSearchName)
    const isHidden = useSelector(getStylesHeaderState) 

    useEffect(() => {
        hideScrollBar()
    }, [name])
    
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