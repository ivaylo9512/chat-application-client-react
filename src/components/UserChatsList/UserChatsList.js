import React from 'react';
import { useSelector } from "react-redux"
import { getUserChatsData } from "../../app/slices/userChatsSlice"
import UserChat from "../UserChat/UserChat";

const UserChatsList = () => {
    const { currentUserChats } = useSelector(getUserChatsData);

    return(
        <div>
            {currentUserChats && currentUserChats.map(userChat => 
                <UserChat key={userChat.id} userChat={userChat} />)
            }
        </div>
    )

}
export default UserChatsList