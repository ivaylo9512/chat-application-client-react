import React, { useState } from 'react';
import { IMAGE_URL } from 'appConstants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward, faInfo } from '@fortawesome/free-solid-svg-icons'
import { Container, Image, Info, ButtonsContainer, Button, InfoContainer } from './UserChatStyle';

const UserChat = ({userChat: {createdAt, secondUser: {profileImage, lastName, firstName}}}) => {
    const [isInfoVisible, setIsInfoVisible] = useState(false);

    return(
        <Container>
            <Image className='image-container'>
                <img src={`${IMAGE_URL}/${profileImage}`}/>
            </Image>
            <InfoContainer isInfoVisible={isInfoVisible}>
                <span><b>{`${firstName} ${lastName}`}</b></span>
                <Info>
                   <span><b>{`${firstName} ${lastName}`}</b></span>
                   <span><b>{createdAt}</b></span>
                </Info>
            </InfoContainer>
            <ButtonsContainer>
                <Button onClick={() => setIsInfoVisible(!isInfoVisible)}><FontAwesomeIcon icon={faInfo}/></Button>
                <Button><FontAwesomeIcon icon={faForward}/></Button>
            </ButtonsContainer>
        </Container>
    )
}
export default UserChat