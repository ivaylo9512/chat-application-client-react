import React from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setCurrentChat } from 'app/slices/chatsSlice';

const User = ({user}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const setChat = () => {
        if(user.chatWithUser){
            history.push('/chat');
            dispatch(setCurrentChat(user.chatWithUser));
        }
    }

    return (
        <div>
            <div className='image'>
                <img alt='profile' src={user.profilePicture}/>
            </div>
            <div className='info'>
                <b>{user.username}</b>
                <span></span>    
            </div>
            <button onClick={setChat}>
                {user.chatWithUser 
                    ? 'open'
                    : 'add'
                }
            </button>
        </div>
    )
}

export default User