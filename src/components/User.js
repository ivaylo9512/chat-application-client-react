import React from 'react';
import {useHistory} from 'react-router-dom'

export const User = ({setChat, user, createNewChat}) => {
    const history = useHistory()

    return (
        <div>
            <div className='image'>
                <img alt='profile' src={user.profilePicture}/>
            </div>
            <div className='info'>
                <b>{user.username}</b>
                <span></span>    
            </div>
            <button onClick={()=> user.hasChatWithLoggedUser 
                ? history.push('/chat') && setChat(user.id)  
                : createNewChat} >
            </button>
        </div>
    )
}

export default User