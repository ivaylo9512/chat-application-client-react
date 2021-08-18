import React, { useRef, useEffect } from 'react';
import User from 'components/User/User'
import { useSelector } from 'react-redux';
import { getCurrentUsers } from 'app/slices/usersSlice';
import { Container } from './UsersListStyle';

const UsersList = () => {
    const users = useSelector(getCurrentUsers);

    return (
        <Container>
            {users && (users.length == 0 
                ? <span><b>No users found with this search.</b></span>
                : users.map(user =>
                    <User user={user} key={user.id} />
            ))}
        </Container>
    )
}

export default UsersList