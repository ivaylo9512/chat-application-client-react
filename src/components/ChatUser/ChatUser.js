import React from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setCurrentChat } from '../../app/slices/chatsSlice';

const ChatUser = ({chat}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const setChat = () => {
        dispatch(setCurrentChat(chat));
        history.push('/chat')
    }

    return (
        <button onClick={setChat} className='chat'>
            <div>
                <div className='image'>
                    <img alt='profile' src={chat.secondUser.profilePicture}/>
                </div>
                <div className='info'>
                    <b>{chat.secondUser.username}</b>
                    <span></span>    
                </div>
            </div>
        </button>
    )
}

export default ChatUser