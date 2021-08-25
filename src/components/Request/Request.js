import { useState } from 'react';
import { IMAGE_URL } from 'appConstants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faForward, faCheck, faTimes, faShare, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Container, Image, Info, ButtonsContainer, Button, InfoContainer } from './RequestStyle';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat } from 'app/slices/chatsSlice';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { sendRequest, acceptRequest, denyRequest } from 'app/slices/requestsSlice';

const Request = ({request: {id, createdAt, sender: { id: userId, profileImage, lastName, firstName }}}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isInfoVisible, setIsInfoVisible] = useState(false);
    const request = useSelector(state => state.requests.data[userId]);
    const [message, setMessage] = useState('accept');

    const setChat = () => {
        dispatch(setCurrentChat(request.chatWithUser));
        history.push('/chat');
    }

    const accept = () => {
        if(!request?.isLoading){
            dispatch(acceptRequest({ id, userId }));
        }
    }

    useEffect(() => {
        if(request && !request.isLoading){
            setMessage(request.state);
        }
    }, [request])

    const getActionButton = () => {
        let action;
        let icon;
        switch(message){
            case 'accept':
                action = () => dispatch(denyRequest({ id, requestState: 'accept', userId }));
                icon = <FontAwesomeIcon icon={faTimes}/>;
                break;
            case 'pending':
                action = () => dispatch(denyRequest({ id: request.id, requestState: 'pending', userId }));
                icon = <FontAwesomeIcon icon={faPaperPlane}/>;
                break;
            case 'send':
                action = () => dispatch(sendRequest(userId));
                icon = <FontAwesomeIcon icon={faShare}/>;
                break;
            case 'complete':
                action = setChat;
                icon = <FontAwesomeIcon icon={faForward}/>;
                break;
        }
        
        return(
            <Button data-testid='action' onClick={() => !request?.isLoading && action}>
                {request?.isLoading
                    ? <LoadingIndicator />
                    : icon
                }
            </Button>
        )
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
        </Container>
    )
}
export default Request