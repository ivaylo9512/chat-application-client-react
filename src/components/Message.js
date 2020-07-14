import React, { Component } from 'react'

const Message = ({user, text}) => {  
    return (
        <div className='message'>
            <b className='user'>{user}</b>
            <span className='time'></span>
            <p className='text'>{text}</p>
        </div>
    )
}

export default Message