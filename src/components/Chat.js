import React, { Component } from 'react'
import Session from './Session';

const Chat = ({currentChat, setCurrentChat}) => {  

    const getNextSessions = () => {
        fetch(`http://localhost:8080/chat/auth/getChats/chat/auth/nextSessions?chatId=${this.props.currentChat.id}page${this.props.currentChat.session})`)
            .then(data => data.json())
            .then(data => setCurrentChat({...currentChat, sessions: data}))
    }

    return (
        <div className='chat'>
            {currentChat.sessions.map(session =>{
                return <Session session={session} key={session.date}/>
            })}
        </div>
    )
}

export default Chat