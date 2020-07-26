import React, { useState, useRef, useEffect } from 'react'
import WebSocket from './WebSocket'
import UsersList from './UsersList';
import SearchUsers from './SearchUsers';
import { Route } from 'react-router-dom'
import SearchChat from './SearchChat';
import ChatView from './ChatView'
import OrderView from './OrderView'

const Main = ({searchChats, chat, order}) => {
    const [currentChat, setCurrentChat] = useState(undefined)
    const [foundUsers, setFoundUsers] = useState([])
    const [webSocketClient, setWebSocketClient] = useState()
    const isMounted = useRef(false)

    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true
        }else{
            const message = webSocketClient.subscribe('/user/message', recievedMessage)
            const createChat = webSocketClient.subscribe('/user/createChat', recievedNewChat)
            
            return () => {
                message.unsubscribe()
                createChat.unsubscribe()
            }
        }
    }, [webSocketClient])

    const recievedMessage = (message) => {
        console.log(message.body)
    }

    const recievedNewChat = (message) => {
        console.log(message.body)
    }

    const createNewChat = (userId) => {
        console.log(userId)
    }

    return(
        <div className='main-container'>
            <WebSocket setWebSocketClient={setWebSocketClient} />
        
            <Route path='/searchUsers' render={({history}) => <UsersList  history={history} createNewChat={createNewChat} foundUsers={foundUsers} />} />
            <Route path='/searchUsers' render={() => <SearchUsers setCurrentChat={setCurrentChat} setFoundUsers={setFoundUsers} />} />
            <Route path='/searchChat' render={() => <div className='chats'></div>} />
            <Route path='/searchChat' render={() => <SearchChat searchChats={searchChats}/>} />
            <Route exact path='/' render={() => <p>No chat is selected!</p>} />
            
            <Route path='/chat' render={() => currentChat !== undefined 
                ? <OrderView order={order}/>
                : <p>No order is selected!</p>
            }/>
            
            <Route path='/chat' render={() => currentChat !== undefined 
                ? <ChatView webSocketClient={webSocketClient} chat={chat} setCurrentChat={setCurrentChat} currentChat={currentChat} />
                : <p>No chat is selected!</p>
            }/>
        </div>
    )
}

export default Main