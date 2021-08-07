import React, { useState, useRef } from 'react'
import Session from '../Session/Session';
import Form from '../Form/Form'
import { useRequest } from '../../hooks/useRequest';
import { useSelector } from 'react-redux';

const ChatView = ({webSocketClient}) => {  
    const [nextSessions, fetchSessions] = useRequest({callback: setNextSessions, isAuth: true})
    const chat = useSelector(getCurrentChat);

    const setNextSessions = (nextSessions) => {
        setCurrentChat({
            ...currentChat, 
            sessions:{
                ...currentChat.sessions, 
                ...JSON.parse(nextSessions)
            }
        })
    }
    
    const getNextSessions = async () => {
        fetchSessions({url: `${baseUrl.current}/chat/auth/getChats/chat/auth/nextSessions?chatId=${this.props.currentChat.id}page${this.props.currentChat.session})`})
    }

    const sendNewMessage = (message) => { 
        const chatId = currentChat.id
        const receiverId = currentChat.user.id
        webSocketClient.publish({destination: '/api/message', body: JSON.stringify({chatId, receiverId, message}), headers: {'Authorization': localStorage.getItem('Authorization')}});
    }

    return (
        <>
            {id !== undefined ? 
                <div className='chat-container'>
                    <Form sendNewMessage={sendNewMessage}/>
                    <div className='chat'>
                        {chat.sessions.map(session =>{
                            return <Session session={session} key={session.date}/>
                        })}
                    </div>
                </div>
                : <p>No chat is selected!</p>
            }
        </>
    )
}

export default ChatView