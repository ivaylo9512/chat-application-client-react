import React, { useEffect, useState } from 'react';
import ChatUser from '../ChatUser/ChatUser';
import { useSelector } from 'react-redux';
import { getChatsData } from '../../app/slices/chatsSlice';

const ChatList = () => {
    const { chats } = useSelector(getChatsData);
    
    return(
        <>
            {chats && chats.map(chat => 
                <ChatUser chat={chat}/>
            )}  
        </>
    )

}
export default ChatList