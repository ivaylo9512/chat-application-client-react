import React from 'react';
import { Link } from 'react-router-dom'

const ChatUser = ({chat}) => {
    return (
        <Link to="/chat" className="chat">
            <div>
                <div className="image">
                    <img alt="profile" src={chat.user.profilePicture}/>
                </div>
                <div className="info">
                    <b>{chat.user.username}</b>
                    <span></span>    
                </div>
            </div>
        </Link>
    )
}

export default ChatUser