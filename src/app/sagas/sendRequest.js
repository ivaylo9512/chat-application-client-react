import { wrapper } from ".";
import { put, takeEvery, call } from "redux-saga/effects";
import { BASE_URL } from "appConstants";
import {onRequestComplete, onRequestError} from 'app/slices/requestsSlice';
import UnauthorizedException from "exceptions/unauthorizedException";
import { addChat } from "app/slices/chatsSlice";

export default takeEvery('requests/sendRequest', wrapper(sendRequest));

export function* sendRequest({payload: id}){
    const response = yield call(fetch, `${BASE_URL}/api/requests/auth/add/${id}`, {
        method: 'POST',
        headers:{
            Authorization: localStorage.getItem('Authorization')
        }
    });

    if(response.ok){
        const { chatWithUser, requestState, requestId } = yield response.json();  
        if(chatWithUser){
            yield put(addChat(chatWithUser));
        }   

        yield put(onRequestComplete({ userId: id, chatWithUser, requestState, id: requestId }))
    }else{
        const message = yield response.text()
        if(response.status === 401){
            throw new UnauthorizedException(message);            
        } 

        yield put(onRequestError({ userId: id, message, requestState: 'send' }));
    }
}