import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat } from 'app/slices/chatsSlice';
import { sendRequest } from 'app/slices/requestsSlice';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import { memo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Image, Info, ButtonsContainer, Button, InfoContainer } from 'components/User/UserStyle';
import { IMAGE_URL } from 'appConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faForward } from '@fortawesome/free-solid-svg-icons'

const User = memo(({user: { id, profileImage, firstName, lastName, chatWithUser, createdAt, requestState }}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const request = useSelector(state => state.requests.data[id]);
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const [message, setMessage] = useState(requestState);

    const setChat = () => {
        history.push('/chat');
        dispatch(setCurrentChat(chatWithUser));
    }

    const manageRequest = () => {
        if(message != 'pending'){
            dispatch(sendRequest(id));
        }
    }

    useEffect(() => {
        if(request && !request.isLoading){
            setMessage(request.state);
        }
    }, [request])

    return (
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
                <Button data-testid='action' onClick={message == 'open' ? setChat : manageRequest}>
                    {request?.isLoading
                        ? <LoadingIndicator />
                        : message
                    }
                </Button>
            </ButtonsContainer>
        </Container>
    )
})

export default User