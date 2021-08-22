import { useState } from 'react';
import { IMAGE_URL } from 'appConstants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward, faInfo } from '@fortawesome/free-solid-svg-icons'
import { Container, Image, Info, ButtonsContainer, Button, InfoContainer } from './UserChatStyle';
import { useDispatch } from 'react-redux';
import { setCurrentChat } from 'app/slices/chatsSlice';

const UserChat = ({userChat, userChat: {createdAt, secondUser: { profileImage, lastName, firstName }}}) => {
    const dispatch = useDispatch();
    const [isInfoVisible, setIsInfoVisible] = useState(false);

    const setChat = () => {
        dispatch(setCurrentChat(userChat))
    }

    return(
        <Container>
            <Image className='image-container'>
                <img src={`${IMAGE_URL}/${profileImage}`}/>
            </Image>
            <InfoContainer isInfoVisible={isInfoVisible}>
                <span><b>{`${firstName} ${lastName}`}</b></span>
                <Info isInfoVisible={isInfoVisible}>
                   <span><b>{`${firstName} ${lastName}`}</b></span>
                   <span><b>{createdAt}</b></span>
                </Info>
            </InfoContainer>
            <ButtonsContainer>
                <Button data-testid='toggleInfo' onClick={() => setIsInfoVisible(!isInfoVisible)}><FontAwesomeIcon icon={faInfo}/></Button>
                <Button data-testid='setChat' onClick={setChat}><FontAwesomeIcon icon={faForward}/></Button>
            </ButtonsContainer>
        </Container>
    )
}
export default UserChat