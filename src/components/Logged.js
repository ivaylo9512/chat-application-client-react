import React, {useState, useCallback} from 'react'
import Main from './Main';
import Header from './Header'
import ChatUsersList from './ChatUsersList';

const Logged = ({logout, user}) => {

    const [chats, setChats] = useState([])
    const [filteredChats, setFilteredChats] = useState([])
    const [currentChat, setCurrentChat] = useState(undefined)
    const [chatsContainer, setChatsContainer] = useState(undefined)
    
    const setUserChats = (chats) => {
        setFilteredChats(chats)
        setChats(chats)
    }

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
            <ChatUsersList setChats={setChats} setCurrentChat={setCurrentChat} setChatsContainer={setChatsContainer} userChats={filteredChats} />
            <div className='content'>
                <Header chatsContainer={chatsContainer} logout={logout}/>
                <Main searchChats={searchChats} currentChat={currentChat}/>
            </div>
        </div>
    )
} 
export default Logged