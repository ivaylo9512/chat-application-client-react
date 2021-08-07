import { all } from 'redux-saga/effects';
import loginWatcher from './login';
import registerWatcher from './register';
import usersWatcher from './users';
import chatsWatcher from './chats';

export default function* indexSaga(){
    yield all([loginWatcher, registerWatcher, usersWatcher, chatsWatcher])
}