import React, { useEffect, useState } from 'react';
import ChatUser from '../ChatUser';
import smoothscroll from 'smoothscroll-polyfill';
import Order from '../Order';
import { useHistory } from 'react-router-dom'
import './HeaderScroll.css'

const HeaderScroll = ({headerType, headerClass, currentList}) => {
    const listContainer = React.useRef()
    const scrollContainer = React.useRef()
    const [listPadding, setListPadding] = useState({})
    const history = useHistory()

    useEffect(() => {
        hideScrollBar()
        window.addEventListener('resize', hideScrollBar)
        return () => window.removeEventListener('resize', hideScrollBar)
    }, [currentList])
    
    useEffect(() => {
        smoothscroll.polyfill()
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
            {currentList.map(element => 
                <div className='element-container' key={element.id}> 
                    {headerType == 'chats' 
                        ? <ChatUser onClick={() => history.push('/chat/' + element.id)} chat={element}/> 
                        : <Order onClick={() => history.push('/chat/' + element.id)} order={element}/>
                    }
                </div>
            )}  
            </div>
        </div>
    )
}

export default HeaderScroll