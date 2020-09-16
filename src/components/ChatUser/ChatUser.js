import React from 'react';
import { Link } from 'react-router-dom'

const ChatUser = ({chat:{secondUser, lastMessage}}) => {
    return (
        <Link to='/chat' className='chat'>
            <div>
                <div className='image'>
                    <img alt='profile' src={secondUser.profilePicture}/>
                </div>
                <div className='info'>
                    <b>{secondUser.username}</b>
                    <span></span>    
                </div>
            </div>
        </Link>
    )
}

export default ChatUser