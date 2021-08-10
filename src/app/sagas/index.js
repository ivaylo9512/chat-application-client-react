import { all, call, put,  } from 'redux-saga/effects';
import loginWatcher from './login';
import registerWatcher from './register';
import usersWatcher from './users';
import chatsWatcher from './chats';

export default function* indexSaga(){
    yield all([loginWatcher, registerWatcher, usersWatcher, chatsWatcher])
}

export function authWrapper(request){
    return function*(action){
        try{
            const result = yield request(action);
        }catch(err){
            if(err.message == 'Jwt token has expired.' || err.message == 'Jwt is incorrect.' || err.message == 'Jwt is missing.'){
                yield put({type: 'logout'});
            }
        }
    }
}