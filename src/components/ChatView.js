import React, {useState} from 'react'
import Session from './Session';
import MessageForm from './MessageForm'
import { useRequest } from '../hooks/useRequest';


const Chat = ({currentChat, setCurrentChat}) => {  
    const [error, setError] = useState()
    const [nextSessions, fetchSessions, setBody, setUrl] = useRequest({callback: setNextSessions, isAuth: true})

    const setNextSessions = () => {
        setCurrentChat({
            ...currentChat, 
            sessions:{
                ...currentChat.sessions, 
                ...JSON.parse(data)
            }
        })

    }
    const getNextSessions = async () => {
        setUrl(`http://localhost:8080/chat/auth/getChats/chat/auth/nextSessions?chatId=${this.props.currentChat.id}page${this.props.currentChat.session})`)
        fetchSessions()
    }

    const sendNewMessage = (message) => { 
        const chatId = currentChat.id
        const receiverId = currentChat.user.id
        webSocketClient.publish({destination: '/api/message', body: JSON.stringify({chatId, receiverId, message}), headers: {'Authorization': localStorage.getItem('Authorization')}});
    }

    return (
        <div className='chat-container'>
            <MessageForm sendNewMessage={sendNewMessage}/>
            <div className='chat'>
                {currentChat.sessions.map(session =>{
                    return <Session session={session} key={session.date}/>
                })}
            </div>
        </div>
    )
}

export default Chat