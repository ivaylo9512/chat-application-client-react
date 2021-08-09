import React, { useEffect } from 'react';
import ChatUser from '../ChatUser/ChatUser';
import { useSelector, useDispatch } from 'react-redux';
import { getChatsData, getChatsQuery, chatsRequest } from '../../app/slices/chatsSlice';

const ChatList = () => {
    const { chats, isLastPage } = useSelector(getChatsData);
    const dispatch = useDispatch();
    const query = useSelector(getChatsQuery);

    useEffect(() => {
        dispatch(chatsRequest({...query}));
    },[])

    return(
        <>
            {chats.length == 0 
                ? <div className='chat-info'>
                    <span>You don't have any chats.</span>
                </div>
                : <>
                    {chats.map(chat => <ChatUser key={chat.id} chat={chat}/>)}
                    {!isLastPage && <span>{'>'}</span>}
                </>
            }   
        </>
    )

}
export default ChatList