import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setCurrentChat } from 'app/slices/chatsSlice';
import { IMAGE_URL } from 'appConstants';
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChatContainer, Chat, ImageContainer, Info, LastMsg, InfoButton } from './ChatStyles';

const ChatUser = ({chat}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [displayInfo, setDisplayInfo] = useState(false);

    const setChat = () => {
        dispatch(setCurrentChat(chat));
        history.push('/chat')
    }

    return (
        <ChatContainer> 
            <Chat onClick={setChat}>
                <div>
                    <ImageContainer>
                        <img alt='profile image' src={`${IMAGE_URL}/${chat.secondUser.profileImage}`}/>
                    </ImageContainer>
                    <Info displayInfo={displayInfo}>
                        <b>{chat.secondUser.username}</b>
                        <LastMsg>{chat.lastMessage}</LastMsg>    
                    </Info>
                    <InfoButton onClick={() => setDisplayInfo(!displayInfo)}>
                        <FontAwesomeIcon icon={faInfo} />
                    </InfoButton>
                </div>
            </Chat>
        </ChatContainer>
    )
}

export default ChatUser