import React, { useState } from 'react';
import { useInput } from '../hooks/useInput';

const MessageForm = ({sendNewMessage}) => {
    const [message, setMessage, messageInput] = useInput({type: 'text', placeholder: 'Send message'})

    const submitForm = (e) => {
        e.preventDefault()
        sendNewMessage(message)
    }

    return (
        <div className='form-container'>
            <form onSubmit={submitForm}>
                {messageInput}
                <button><i className='fas fa-sign-in-alt'></i></button>
            </form>
        </div>
    )
}

export default MessageForm