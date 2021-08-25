import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat } from 'app/slices/chatsSlice';
import { sendRequest, acceptRequest, denyRequest } from 'app/slices/requestsSlice';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import { memo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Image, Info, ButtonsContainer, Button, InfoContainer, UserContainer, Error } from 'components/User/UserStyle';
import { IMAGE_URL } from 'appConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faForward, faCheck, faTimes, faShare, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const User = memo(({user: { id, profileImage, firstName, lastName, chatWithUser, createdAt, requestState, requestId }}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const request = useSelector(state => state.requests.data[id]);
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const [message, setMessage] = useState(requestState);

    const setChat = () => {
        history.push('/chat');
        dispatch(setCurrentChat(chatWithUser));
    }

    useEffect(() => {
        if(request && !request.isLoading){
            setMessage(request.state);
        }
    }, [request])

    const accept = () => {
        dispatch(acceptRequest(requestId));
    }

    const getActionButton = () => {
        let action;
        let icon;
        switch(message){
            case 'accept':
                action = () => dispatch(denyRequest({ id: requestId, requestState: 'accept' }));
                icon = <FontAwesomeIcon icon={faTimes}/>;
                break;
            case 'pending':
                action = () => dispatch(denyRequest({ id: requestId, requestState: 'pending' }));
                icon = <FontAwesomeIcon icon={faPaperPlane}/>;
                break;
            case 'send':
                action = () => dispatch(sendRequest(id));
                icon = <FontAwesomeIcon icon={faShare}/>;
                break;
            case 'complete':
                action = setChat;
                icon = <FontAwesomeIcon icon={faForward}/>;
                break;
        }
        
        return(
            <Button data-testid='action' onClick={action}>
                {request?.isLoading
                    ? <LoadingIndicator />
                    : icon
                }
            </Button>
        )
    }

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
                    {message == 'accept' &&
                        <Button data-testid='accept' onClick={accept}>
                            {request?.isLoading
                                ? <LoadingIndicator />
                                : <FontAwesomeIcon icon={faCheck} />
                            }
                        </Button>
                    }
                    {getActionButton()}
                </ButtonsContainer>
            </UserContainer>
        </Container>
    )
})

export default User