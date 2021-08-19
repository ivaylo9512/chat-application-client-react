import { resetUserChatsState, getUserChatsQuery, userChatsRequest, getUserChatsState, getUserChats, setCurrentUserChats } from 'app/slices/userChatsSlice';
import Pagination from 'components/Pagination/Pagination';
import UserChatsList from 'components/UserChatsList/UserChatsList';
import Form from 'components/Form/Form';
import { useSelector } from 'react-redux';
import { Container } from './UserChatsViewStyle';

const UserChatsView = () => {
    return(
        <>
            <Container>
                <UserChatsList />
                <Pagination selector={getUserChatsState} setData={setCurrentUserChats} getData={userChatsRequest}/>
            </Container>
            <Form action={userChatsRequest} resetState={resetUserChatsState} selector={getUserChatsQuery} placeholder={'search chat'} />
        </>
    )
}
export default UserChatsView