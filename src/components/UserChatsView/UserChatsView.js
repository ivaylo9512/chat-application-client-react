import { resetUserChatsState, userChatsRequest, getUserChatsState, setCurrentUserChats } from 'app/slices/userChatsSlice';
import Pagination from 'components/Pagination/Pagination';
import UserChatsList from 'components/UserChatsList/UserChatsList';
import { Container } from './UserChatsViewStyle';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import { useEffect } from 'react';

const UserChatsView = () => {
    const { isLoading, error } = useSelector(getUserChatsState);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => dispatch(resetUserChatsState())
    }, [])

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
        </>
    )
}
export default UserChatsView