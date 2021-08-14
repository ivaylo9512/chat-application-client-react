import React from 'react';
import { resetUserChatsState, getUserChatsQuery, userChatsRequest, getUserChatsState, getUserChats, setCurrentUserChats } from '../../app/slices/userChatsSlice';
import Pagination from '../Pagination/Pagination';
import UserChatsList from '../UserChatsList/UserChatsList';
import Form from '../Form/Form';
import { useSelector } from 'react-redux';
import { Container } from './UserChatsViewStyle';

const UserChatsView = () => {
    const userChats = useSelector(getUserChats);

    return(
        <>
            <Container>
                <UserChatsList />
                <Pagination selector={getUserChatsState} setData={setCurrentUserChats} getData={userChatsRequest} data={userChats}/>
            </Container>
            <Form action={userChatsRequest} resetState={resetUserChatsState} selector={getUserChatsQuery} placeholder={'search chat'} />
        </>
    )
}
export default UserChatsView