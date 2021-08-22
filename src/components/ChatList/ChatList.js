import { useEffect } from 'react';
import Chat from 'components/Chat/Chat';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import { useSelector, useDispatch } from 'react-redux';
import { getChatsQuery, chatsRequest, getChatsState, resetChatsState } from 'app/slices/chatsSlice';
import { ChatInfo, Span } from './ChatListStyle'

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
            {isLoading && 
                <div>
                    {isLoading && <LoadingIndicator />}  
                </div>
            }
            {chats.length == 0 
                ? !isLoading && 
                    <ChatInfo data-testid ='info'>
                        <Span>You don't have any chats.</Span>
                    </ChatInfo>
                : <>
                    {chats.map(chat => <Chat key={chat.id} chat={chat}/>)}
                    {!isLastPage && <span data-testid='more'>{'>'}</span>}
                </>
            }   
        </>
    )

}
export default ChatList