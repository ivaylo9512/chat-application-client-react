import React, { useRef } from 'react';
import Users from '../User/User'

const UsersList = ({foundUsers, setChat, createNewChat}) => {
    const baseUrl = useRef(localStorage.getItem('BaseUrl'))
    
    const createChat = (userId) => {
        fetch(`http://${baseUrl}/api/chat/auth/create?userId=${userId}`)        
    }

    return (
        <div className='users'>
            {foundUsers.map(user =>
                <Users user={user} setChat={setChat} createNewChat={createNewChat} key={user.id} />
            )}
        </div>
    )
}

export default UsersList