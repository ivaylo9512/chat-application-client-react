import { authWrapper } from ".";
import { takeLatest, put } from "redux-saga/effects";
import { BASE_URL } from "appConstants";
import {onRequestComplete, onRequestError} from 'app/slices/requestsSlice';
import UnauthorizedException from "exceptions/unauthorizedException";

export default takeLatest('requests/acceptRequest', authWrapper(acceptRequest));

function* acceptRequest({payload: id}){
    const response = yield fetch(`${BASE_URL}/api/requests/auth/accept/${id}`, {
        method: 'POST',
        headers:{
            Authorization: localStorage.getItem('Authorization')
        }
    });

    if(response.ok){
        yield put(onRequestComplete({id, chatWithUser: yield response.json(), requestState: 'complete'}))
    }else{
        const message = yield response.text()
        if(response.status == 401){
            throw new UnauthorizedException(message);            
        } 

        yield put(onRequestError({id, message}));
    }
}