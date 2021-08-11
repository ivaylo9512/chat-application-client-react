import React, { useEffect } from 'react';
import ChatUser from '../Chat/Chat';
import { useSelector, useDispatch } from 'react-redux';
import { getChatsQuery, chatsRequest, getChatsState } from '../../app/slices/chatsSlice';
import { ChatInfo, Span } from './ChatListStyle'
const ChatList = () => {
    const { isLoading, data: { chats, isLastPage } } = useSelector(getChatsState);
    const dispatch = useDispatch();
    const query = useSelector(getChatsQuery);

    useEffect(() => {
        dispatch(chatsRequest({...query}));
    },[])

    return(
        <>
            {chats.length == 0 
                ? isLoading 
                    ? 'loading'
                    : <ChatInfo>
                        <Span>You don't have any chats.</Span>
                    </ChatInfo>
                : <>
                    {chats.map(chat => <ChatUser key={chat.id} chat={chat}/>)}
                    {!isLastPage && <span>{'>'}</span>}
                </>
            }   
        </>
    )

}
export default ChatList