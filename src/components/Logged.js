import React, {useState, useCallback} from 'react'
import Main from './Main';
import Menu from './Menu'
import ChatUsersList from './ChatUsersList';

const Logged = ({logout, user, appType}) => {

    const [chats, setChats] = useState([])
    const [filteredChats, setFilteredChats] = useState([])
    const [currentChat, setCurrentChat] = useState(undefined)
    const [chatsClass, setChatsClass] = useState('chat-users hidden')

    const setUserChats = useCallback((chats) => {
        setFilteredChats(chats)
        setChats(chats)
    }, [])

    const searchChats = (name) => {
        name = name.toUpperCase()
        const filteredChats = chats.filter(chat => { 
            const firstName = chat.user.firstName.toUpperCase()
            const lastName = chat.user.lastName.toUpperCase()
            if(firstName.startsWith(name) || lastName.startsWith(name) ||(`${firstName} ${lastName}`).startsWith(name)){
                return chat
            }
            return null;
        })
        setFilteredChats(filteredChats)
    }

    return(
        <div>
            <ChatUsersList setChats={setUserChats} setCurrentChat={setCurrentChat} chatsClass={chatsClass} userChats={filteredChats} />
            <div className='content'>
                <Menu chatClass={chatsClass} setChatsClass={setChatsClass} logout={logout} appType={appType}/>
                <Main searchChats={searchChats} currentChat={currentChat}/>
            </div>
        </div>
    )
} 
export default Logged