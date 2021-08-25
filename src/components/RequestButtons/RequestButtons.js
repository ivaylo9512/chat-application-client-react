import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward, faCheck, faTimes, faShare, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { memo } from 'react';
import { useState } from 'react';
import { setCurrentChat } from 'app/slices/chatsSlice';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import { sendRequest, acceptRequest, denyRequest } from 'app/slices/requestsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Button } from 'components/RequestButtons/RequestButtonsStyle';

const RequestButtons = memo(({requestId, userId, initialMessage, chatWithUser}) => {
    const [message, setMessage] = useState(initialMessage);
    const request = useSelector(state => state.requests.data[userId]);
    const [id, setId] = useState(requestId);
    const dispatch = useDispatch();
    const history = useHistory();

    const setChat = () => {
        history.push('/chat');
        dispatch(setCurrentChat(request ? request.chatWithUser : chatWithUser));
    }

    const accept = () => {
        if(!request?.isLoading){
            dispatch(acceptRequest({ id, userId}));
        }
    }

    useEffect(() => {
        if(request && !request.isLoading){
            setMessage(request.state);
            setId(request.id);
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
                action = () => dispatch(denyRequest({ id, requestState: 'pending', userId }));
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
            <Button data-testid='action' onClick={() => !request?.isLoading && action()}>
                {request?.isLoading
                    ? <LoadingIndicator />
                    : icon
                }
            </Button>
        )
    }

    return(
        <>
            {message == 'accept' &&
                <Button data-testid='accept' onClick={accept}>
                    {request?.isLoading
                        ? <LoadingIndicator />
                        : <FontAwesomeIcon icon={faCheck} />
                    }
                </Button>
            }
            {getActionButton()}
        </>
    )
})
export default RequestButtons