import React from 'react'
import { Container } from './UsersViewStyle'
import UsersList from '../UsersList/UsersList';
import { getUsersQuery, usersRequest, resetUsersState, getUsersState, setCurrentUsers, getUsers } from '../../app/slices/usersSlice';
import Form from '../Form/Form';
import { useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination';

const UsersView = () => {
    const users = useSelector(getUsers);

    return(
        <>
            <Container>
                <UsersList />
                <Pagination selector={getUsersState} setData={setCurrentUsers} getData={usersRequest} data={users}/>
            </Container>
            <Form action={usersRequest} resetState={resetUsersState} selector={getUsersQuery} placeholder={'search users'} />

        </>
    )
}
export default UsersView