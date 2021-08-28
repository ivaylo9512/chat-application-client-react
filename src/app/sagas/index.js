import { all, put,  } from 'redux-saga/effects';
import loginWatcher from './login';
import registerWatcher from './register';
import usersWatcher from './users';
import acceptRequestWatcher from './acceptRequest';
import denyRequestWatcher from './denyRequest';
import chatsWatcher from './chats';
import getUserChats from './userChats';
import sendRequestsWatcher from './sendRequest';
import allRequestsWatcher from './allRequests';
import { onLogout } from 'app/slices/authenticateSlice';

export default function* indexSaga(){
    yield all([loginWatcher, registerWatcher, usersWatcher, chatsWatcher, getUserChats, sendRequestsWatcher, allRequestsWatcher, acceptRequestWatcher, denyRequestWatcher])
}

export function wrapper(request){
    return function* fetch(action){
        try{
            yield request(action);
        }catch(err){
            if(err.message == 'Failed to fetch'){
                yield new Promise(resolve => setTimeout(resolve, 5000));
                return yield fetch(action);
            }

            if(err.message == 'Jwt token has expired.'){
                return yield put(onLogout('Session has expired.')); 
            }

            if(err.message == 'Jwt token is incorrect' || err.message == 'Jwt token is missing'){
                return yield put(onLogout());
            }

            console.error(err.message);
        }
    }
}