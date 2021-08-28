import { wrapper } from ".";
import { put, takeEvery, call } from "redux-saga/effects";
import { BASE_URL } from "appConstants";
import {onRequestComplete, onRequestError} from 'app/slices/requestsSlice';
import UnauthorizedException from "exceptions/unauthorizedException";
import { addChat } from "app/slices/chatsSlice";

export default takeEvery('requests/acceptRequest', wrapper(acceptRequest));

export function* acceptRequest({payload: { id, userId }}){
    const response = yield call(fetch, `${BASE_URL}/api/requests/auth/accept/${id}`, {
        method: 'POST',
        headers:{
            Authorization: localStorage.getItem('Authorization')
        }
    });

    if(response.ok){
        const chatWithUser = yield response.json();

        yield put(addChat(chatWithUser));
        yield put(onRequestComplete({ userId, chatWithUser, requestState: 'completed', id }))
    }else{
        const message = yield response.text()
        if(response.status == 401){
            throw new UnauthorizedException(message);            
        } 

        yield put(onRequestError({ userId, message, requestState: 'accept', id }));
    }
}