import React, { useEffect, useState } from 'react';
import ChatUser from '../ChatUser/ChatUser';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChatList = () => {
    const history = useHistory();
    const chats = useSelector(getChats);
    const searchName = useSelector(getName);
    const [filteredChats, setFilteredChats] = useState(chats);

    useEffect(() => {
        if(searchName != null){
            const name = searchName.toUpperCase()
            setFilteredChats(chats.filter(chat => { 
                const firstName = chat.user.firstName.toUpperCase()
                const lastName = chat.user.lastName.toUpperCase()
                if(firstName.startsWith(name) || lastName.startsWith(name) || (`${firstName} ${lastName}`).startsWith(name)){
                    return chat
                }
            }))
        }
    }, [name]);
    
    return(
        <>
            {filteredChats.map(chat => 
                <div className='chat-container' key={chat.id}> 
                    <ChatUser onClick={() => history.push('/chat/' + chat.id)} chat={chat}/>
                </div>
            )}  
        </>
    )

}
export default ChatList