import React, {useEffect} from 'react';
import ChatUser from './ChatUser';
import smoothscroll from 'smoothscroll-polyfill';

const ChatUsersList = ({setUserChats, setCurrentChat, setChatsContainer, userChats }) => {
    const chats = React.useRef()
    const chatsContainer = React.useRef()

    useEffect(() =>  {
        fetch('http://localhost:8080/api/chat/auth/getChats?pageSize=3',{
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        }).then(data => data.json())
          .then(data => setUserChats(data))

          smoothscroll.polyfill()
          setChatsContainer(chatsContainer)
    }, [])

    useEffect(() => {
        hideScrollBar()
    })  

    const hideScrollBar = () => {
        const clientHeight = chats.current.clientHeight
        const offsetHeight = chats.current.offsetHeight

        const height = parseFloat(window.getComputedStyle(chats.current).height)
        const containerHeight = parseFloat(window.getComputedStyle(chatsContainer.current).height)
        const paddingBottom = window.getComputedStyle(chatsContainer.current).paddingBottom


        const barHeight = containerHeight - height 
        const newHeight = offsetHeight > clientHeight && height >= containerHeight ? height + paddingBottom : Math.max(containerHeight, containerHeight + barHeight)
        

        chats.current.style.height = `${newHeight}px` 
        chats.current.style.paddingBottom = `${barHeight}px`
    }
    const scroll = (e) => {
        e.currentTarget.scroll({left: e.currentTarget.scrollLeft + e.deltaY * 4 , top: e.currentTarget.scrollTop, behavior: 'smooth'})
        
    }
    return (
        <div className="chat-users" ref={chatsContainer}>
            <div ref={chats} onWheel = {scroll}>
                {userChats.map(chat => {
                    return (
                        <div className="chat-user" key={chat.id} onClick={() => setCurrentChat(chat)}> 
                            <ChatUser chat={chat}/>
                        </div>
                    )
                })}  
            </div>
        </div>
    )
}

export default ChatUsersList