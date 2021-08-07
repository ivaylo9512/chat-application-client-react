import React, { useEffect, useState, useRef } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import './HeaderScroll.css'

const HeaderScroll = ({headerClass}) => {
    const listContainer = useRef()
    const scrollContainer = useRef()
    const [listPadding, setListPadding] = useState({})
    const name = useSelector(getChatSearchName)

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
        <div className={headerClass} ref={scrollContainer}>
            <div ref={listContainer} style={listPadding} onWheel={scroll}>
                <ChatList />
            </div>
        </div>
    )
}

export default HeaderScroll