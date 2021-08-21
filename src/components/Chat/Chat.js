import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setCurrentChat } from 'app/slices/chatsSlice';
import { IMAGE_URL } from 'appConstants';
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChatContainer, ChatNode, ImageContainer, Info, LastMsg, InfoButton } from './ChatStyles';

const Chat = ({chat, chat: {secondUser: { profileImage, firstName, lastName}}}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [displayInfo, setDisplayInfo] = useState(false);
    
    const setChat = () => {
        dispatch(setCurrentChat(chat));
        history.push('/chat')
    }

    const toggleInfo = (e) => {
        e.stopPropagation();
        setDisplayInfo(!displayInfo)
    }

    return (
        <ChatContainer> 
            <ChatNode onClick={setChat}>
                <div>
                    <ImageContainer>
                        <img alt='profile image' src={`${IMAGE_URL}/${profileImage}`}/>
                    </ImageContainer>
                    <Info displayInfo={displayInfo}>
                        <b>{`${firstName} ${lastName}`}</b>
                        <LastMsg>{chat.lastMessage}</LastMsg>    
                    </Info>
                    <InfoButton onClick={toggleInfo}>
                        <FontAwesomeIcon icon={faInfo} />
                    </InfoButton>
                </div>
            </ChatNode>
        </ChatContainer>
    )
}

export default Chat