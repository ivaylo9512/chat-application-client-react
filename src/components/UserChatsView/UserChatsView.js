import { resetUserChatsState, getUserChatsQuery, userChatsRequest, getUserChatsState, setCurrentUserChats } from 'app/slices/userChatsSlice';
import Pagination from 'components/Pagination/Pagination';
import UserChatsList from 'components/UserChatsList/UserChatsList';
import Form from 'components/Form/Form';
import { Container } from './UserChatsViewStyle';
import { useSelector } from 'react-redux';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

const UserChatsView = () => {
    const { isLoading, error } = useSelector(getUserChatsState);

    return(
        <>
            <Container>
                <UserChatsList />
                {error && <div data-testid='error'>{error}</div>}
                {isLoading 
                    ? <LoadingIndicator />
                    : <Pagination selector={getUserChatsState} setData={setCurrentUserChats} getData={userChatsRequest} pagesPerSlide={5}/>
                }
            </Container>
            <Form action={userChatsRequest} resetState={resetUserChatsState} selector={getUserChatsQuery} placeholder={'Search chat'} />
        </>
    )
}
export default UserChatsView