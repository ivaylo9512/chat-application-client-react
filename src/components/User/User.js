import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat } from 'app/slices/chatsSlice';
import { sendRequest } from 'app/slices/requestsSlice';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import { memo } from 'react';

const User = memo(({user, page}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const request = useSelector(state => state.requests.data[user.id]);

    const setChat = () => {
        history.push('/chat');
        dispatch(setCurrentChat(user.chatWithUser));
    }

    const manageRequest = () => {
        if(user.requestState != 'pending'){
            dispatch(sendRequest({ id: user.id, page}));
        }
    }

    return (
        <div>
            <div className='image'>
                <img alt='profile' src={user.profilePicture}/>
            </div>
            <div className='info'>
                <b>{`${user.firstName} ${user.lastName}`}</b>
                <span></span>    
            </div>
            <button onClick={user.chatWithUser ? setChat : manageRequest}>
                {request?.isLoading
                    ? <LoadingIndicator />
                : user.chatWithUser 
                    ? 'open'
                    : user.requestState
                }
            </button>
        </div>
    )
})

export default User