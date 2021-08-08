import React, { useRef, useEffect } from 'react';
import User from '../User/User'
import { useSelector } from 'react-redux';
import { getCurrentUsers } from '../../app/slices/usersSlice';

const UsersList = () => {
    const users = useSelector(getCurrentUsers);

    return (
        <div className='users'>
            {users && users.map(user =>
                <User user={user} key={user.id} />
            )}
        </div>
    )
}

export default UsersList