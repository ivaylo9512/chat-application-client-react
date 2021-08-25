import { useSelector } from 'react-redux';
import { memo } from 'react';
import { useState } from 'react';
import { Container, Image, Info, ButtonsContainer, Button, InfoContainer, UserContainer, Error } from 'components/User/UserStyle';
import { IMAGE_URL } from 'appConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import RequestButtons from 'components/RequestButtons/RequestButtons';

const User = memo(({user: { id, profileImage, firstName, lastName, chatWithUser, createdAt, requestState, requestId }}) => {
    const error = useSelector(state => state.requests.data[id]?.error);
    const [isInfoVisible, setIsInfoVisible] = useState(false);

    return (
        <Container>
            <UserContainer>
                <Image>
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
                    <RequestButtons requestId={requestId} userId={id} initialMessage={requestState} chatWithUser={chatWithUser}/>

                </ButtonsContainer>
            </UserContainer>
            {error && <Error>{error}</Error>}
        </Container>
    )
})

export default User