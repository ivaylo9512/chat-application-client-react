import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat } from 'app/slices/chatsSlice';
import { sendRequest } from 'app/slices/requestsSlice';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import { memo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import requests from 'app/sagas/requests';

const User = memo(({user, page}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const request = useSelector(state => state.requests.data[user.id]);
    const [message, setMessage] = useState(user.chatWithUser 
        ? 'open' 
        : user.requestState
    );

    const setChat = () => {
        history.push('/chat');
        dispatch(setCurrentChat(user.chatWithUser));
    }

    const manageRequest = () => {
        if(message != 'pending'){
            dispatch(sendRequest({ id: user.id, page}));
        }
    }

    useEffect(() => {
        if(request && !request.isLoading){
            setMessage(request.chatWithUser ? 'open' : request.state);
        }
    }, [request])

    return (
        <div>
            <div className='image'>
                <img alt='profile' src={user.profilePicture}/>
            </div>
            <div className='info'>
                <b>{`${user.firstName} ${user.lastName}`}</b>
                <span></span>    
            </div>
            <button onClick={message == 'open' ? setChat : manageRequest}>
                {request?.isLoading
                    ? <LoadingIndicator />
                    : message
                }
            </button>
        </div>
    )
})

export default User