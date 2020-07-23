import React, { useEffect } from 'react';
import ChatUser from './ChatUser';
import smoothscroll from 'smoothscroll-polyfill';


const HeaderScroll = ({headerType, headerClass, setCurrentChat, currentList}) => {
    const chats = React.useRef()
    const chatsContainer = React.useRef()

    useEffect(() => {
        hideScrollBar()
        window.addEventListener('resize', hideScrollBar)
        return () => window.removeEventListener('resize', hideScrollBar)
    }, [currentList])
    
    useEffect(() => {
        smoothscroll.polyfill()
    }, []) 

    const hideScrollBar = () => {
        const height = parseFloat(window.getComputedStyle(chats.current).height)
        const containerHeight = parseFloat(window.getComputedStyle(chatsContainer.current).height)

        const barHeight = containerHeight - height 
    
        chats.current.style.paddingBottom = `${barHeight}px`
    }

    const scroll = (e) => {
        e.currentTarget.scroll({left: e.currentTarget.scrollLeft + e.deltaY * 4 , top: e.currentTarget.scrollTop, behavior: 'smooth'})
    }

    return (
        <div className={headerClass} ref={chatsContainer}>
            <div ref={chats} onWheel = {scroll}>
            {currentList.map(chat => 
                <div className='chat-user' key={chat.id} onClick={() => setCurrentChat(chat)}> 
                    {headerType == 'chats' 
                        ? <ChatUser chat={chat}/> 
                        : <div></div>
                    }
                </div>
            )}  
            </div>
        </div>
    )
}

export default HeaderScroll