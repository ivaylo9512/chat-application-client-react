import { all } from "redux-saga/effects";
import loginWatcher from './login';
import registerWatcher from './register';

export default function* indexSaga(){
    yield all([loginWatcher, registerWatcher])
}