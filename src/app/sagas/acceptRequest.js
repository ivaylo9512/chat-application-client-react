import { wrapper } from ".";
import { put, takeEvery } from "redux-saga/effects";
import { BASE_URL } from "appConstants";
import {onRequestComplete, onRequestError} from 'app/slices/requestsSlice';
import UnauthorizedException from "exceptions/unauthorizedException";
import { addChat } from "app/slices/chatsSlice";

export default takeEvery('requests/acceptRequest', wrapper(acceptRequest));

function* acceptRequest({payload: id}){
    const response = yield fetch(`${BASE_URL}/api/requests/auth/accept/${id}`, {
        method: 'POST',
        headers:{
            Authorization: localStorage.getItem('Authorization')
        }
    });

    if(response.ok){
        const chatWithUser = yield response.json();
        
        yield put(addChat(chatWithUser));
        yield put(onRequestComplete({id, chatWithUser, requestState: 'complete'}))
    }else{
        const message = yield response.text()
        if(response.status == 401){
            throw new UnauthorizedException(message);            
        } 

        yield put(onRequestError({id, message}));
    }
}