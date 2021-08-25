import { useState } from 'react';
import { memo } from 'react';
import { IMAGE_URL } from 'appConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { Container, Image, Info, ButtonsContainer, Button, InfoContainer } from './RequestStyle';
import { useSelector } from 'react-redux';
import RequestButtons from 'components/RequestButtons/RequestButtons';

const Request = memo(({request: { id, createdAt, sender: { id: userId, profileImage, lastName, firstName }}}) => {
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const error = useSelector(state => state.requests.data[userId]?.error);

    return(
        <Container>
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
                <RequestButtons requestId={id} userId={userId} initialMessage={'accept'} />
            </ButtonsContainer>
        </Container>
    )
})
export default Request