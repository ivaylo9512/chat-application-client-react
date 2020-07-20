import React, { useState, useRef, useEffect } from 'react'
import WebSocket from './WebSocket'
import UsersList from './UsersList';
import SearchUsers from './SearchUsers';
import { Route } from 'react-router-dom'
import SearchChat from './SearchChat';
import Chat from './Chat'
import MessageForm from './MessageForm'

const Main = () => {
    const [currentChat, setCurrentChat] = useState(undefined)
    const [foundUsers, setFoundUsers] = useState([])
    const [chats, setChats] = useState([])
    const [filteredChats, setFilteredChats] = useState([])
    const webSocketClient = useRef()

    const setWebSocketClient = (client) => {
        webSocketClient.current = client
    }

    useEffect(() => {
        const message = client.subscribe('/user/message', recievedMessage)
        const creatChat = client.subscribe('/user/createChat', recievedNewChat)
        
        return () => {
            message.unsubscribe()
            creatChat.unsubscribe()
        }
    }, [webSocketClient.current])

    const recievedMessage = (message) => {
        console.log(message.body)
    }

    const recievedNewChat = (message) => {
        console.log(message.body)
    }
    
    const removeCurrentChat = () => {
        setState({
            currentChat: undefined
        })
    }

    const createNewChat = (userId) => {
        console.log('hey')
    }

    const sendNewMessage = (message) => { 
        const chatId = currentChat.id
        const receiverId = currentChat.user.id
        client.publish({destination: '/api/message', body: JSON.stringify({chatId, receiverId, message}), headers: {'Authorization': localStorage.getItem('Authorization')}});
    }

    return(
        <div className='main-container'>
            <WebSocket setWebSocketClient={setWebSocketClient} />
        
            <Route path='/searchUsers' render={({history}) => <UsersList  history={history} createNewChat={createNewChat} foundUsers={foundUsers} />} />
            <Route path='/searchUsers' render={() => <SearchUsers removeCurrentChat={removeCurrentChat} setFoundUsers={setFoundUsers} />} />
            <Route path='/searchChat' render={() => <div className='chats'></div>} />
            <Route path='/searchChat' render={() => <SearchChat searchChats={searchChats}/>} />
            <Route exact path='/' render={() => <p>No chat is selected!</p>} />

            <Route path='/chat' render={() => currentChat !== undefined ? 
                <div className='chat-container'>
                    <Chat removeCurrentChat={removeCurrentChat} chat={currentChat} />
                    <MessageForm sendNewMessage={sendNewMessage} />
                </div> :
                <p>No chat is selected!</p>
            }/>
        </div>
    )
}

export default Main