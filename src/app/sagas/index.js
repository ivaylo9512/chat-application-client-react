import { all, call, put,  } from 'redux-saga/effects';
import loginWatcher from './login';
import registerWatcher from './register';
import usersWatcher from './users';
import chatsWatcher from './chats';
import getUserChats from './userChats';
import requestsWatcher from './requests';
import { onLogout } from 'app/slices/authenticateSlice';

export default function* indexSaga(){
    yield all([loginWatcher, registerWatcher, usersWatcher, chatsWatcher, getUserChats, requestsWatcher])
}

export function authWrapper(request){
    return function*(action){
        try{
            yield request(action);
        }catch(err){
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