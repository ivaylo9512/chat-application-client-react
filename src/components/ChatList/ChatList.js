import { useEffect } from 'react';
import Chat from 'components/Chat/Chat';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import { useSelector, useDispatch } from 'react-redux';
import { getChatsQuery, chatsRequest, getChatsState, resetChatsState } from 'app/slices/chatsSlice';
import { ChatInfo, Span, MoreInfo, LoadingContainer } from './ChatListStyle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'

const ChatList = () => {
    const { isLoading, data: { chats, isLastPage } } = useSelector(getChatsState);
    const dispatch = useDispatch();
    const query = useSelector(getChatsQuery);

    useEffect(() => {
        dispatch(chatsRequest({...query}));

        return () => dispatch(resetChatsState());
    },[])

    return(
        <>
            {isLoading && chats.length === 0 &&
                <LoadingContainer>
                    <LoadingIndicator />
                </LoadingContainer>
            }
            {chats.length === 0 
                ? !isLoading && 
                    <ChatInfo data-testid ='info'>
                        <Span>You don't have any chats.</Span>
                    </ChatInfo>
                : <>
                    {chats.map(chat => <Chat key={chat.id} chat={chat}/>)}
                    {!isLastPage && 
                        <MoreInfo data-testid='more'>{isLoading 
                            ? <LoadingIndicator /> 
                            : <FontAwesomeIcon icon={faEllipsisH} />}
                        </MoreInfo>
                    }
                </>
            }   
        </>
    )

}
export default ChatList