import React, { useRef, useEffect } from 'react';
import Users from '../User/User'
import { useDispatch } from 'react-redux';

const UsersList = ({foundUsers, setChat, createNewChat}) => {
    const searchName = useSelector(getSearchUsersName);
    const users = useSelector(getUsers);
    const dispatch = useDispatch();

    const createChat = (userId) => {
        fetch(`http://${baseUrl}/api/chat/auth/create?userId=${userId}`)        
    }

    useEffect(() => {
        if(searchName != null){
            dispatch(getUsers());
        }
    }, [searchName])

    return (
        <div className='users'>
            {users.map(user =>
                <Users user={user} setChat={setChat} createNewChat={createNewChat} key={user.id} />
            )}
        </div>
    )
}

export default UsersList