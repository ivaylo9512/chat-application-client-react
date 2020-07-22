import React, {useEffect} from 'react';
import ChatUser from './ChatUser';
import smoothscroll from 'smoothscroll-polyfill';

const ChatUsersList = ({setChats, setCurrentChat, chatsClass, userChats }) => {
    const chats = React.useRef()
    const chatsContainer = React.useRef()

    useEffect(() =>  {
        let isCurrent =  true;
        async function fetchChats(){
            const response = await fetch('http://localhost:8080/api/chat/auth/getChats?pageSize=3',{
                headers: {
                    'Authorization': localStorage.getItem('Authorization')
                }
            })
            const data = await response.text()
            if(isCurrent){
                if(response.ok){
                    setChats(JSON.parse(data))
                }else{
                
                }
            }  
        }   
        fetchChats() 

        return () => isCurrent = false
    }, [setChats])

    useEffect(() => {
        smoothscroll.polyfill()
    }, [])  

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
        <div className={chatsClass} ref={chatsContainer}>
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

export default ChatUsersList