import { useState, useRef } from 'react'

const HeaderScroll = (headerType, headerClass, setCurrentChat) => {
    const chats = React.useRef()
    const chatsContainer = React.useRef()

    useEffect(() => {
        hideScrollBar()
        window.addEventListener('resize', hideScrollBar)
        return () => window.removeEventListener('resize', hideScrollBar)
    }, [userChats])
    
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
                {userChats.map(chat => 
                    <div className='chat-user' key={chat.id} onClick={() => setCurrentChat(chat)}> 
                        <ChatUser chat={chat}/>
                    </div>
                )}  
            </div>
        </div>
    )
}

export default HeaderScroll