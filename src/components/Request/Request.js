import { useState } from 'react';
import { IMAGE_URL } from 'appConstants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward, faInfo, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Container, Image, Info, ButtonsContainer, Button, InfoContainer } from './RequestStyle';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat } from 'app/slices/chatsSlice';
import { acceptRequest } from 'app/slices/requestsSlice';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import { useHistory } from 'react-router-dom';

const Request = ({request: {id, createdAt, sender: { profileImage, lastName, firstName }}}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const request = useSelector(state => state.requests.data[id]);

    const setChat = () => {
        dispatch(setCurrentChat(request.chatWithUser));
        history.push('/chat');
    }

    const accept = () => {
        dispatch(acceptRequest(id));
    }

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
                <Button data-testid='action' onClick={request?.chatWithUser ? setChat : accept}>
                    {request?.isLoading
                        ? <LoadingIndicator />
                        : request?.chatWithUser  
                            ? <FontAwesomeIcon icon={faForward}/>
                            : <FontAwesomeIcon icon={faCheck}/>
                    }
                </Button>
            </ButtonsContainer>
        </Container>
    )
}
export default Request