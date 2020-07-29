import React from 'react';
import Users from './User'
const UsersList = ({foundUsers, setChat, createNewChat, history}) => {

    const createChat = (userId) => {
        fetch(`http://${localStorage.getItem('BaseUrl')}/api/chat/auth/create?userId=${userId}`)        
    }

    return (
        <div className='users'>
            {foundUsers.map(user =>
                <Users user={user} history={history} setChat={setChat} createNewChat={createNewChat} key={user.id} />
            )}
        </div>
    )
}

export default UsersList