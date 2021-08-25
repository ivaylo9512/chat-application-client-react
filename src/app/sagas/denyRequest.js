import { wrapper } from ".";
import { put, takeEvery } from "redux-saga/effects";
import { BASE_URL } from "appConstants";
import {onRequestComplete, onRequestError} from 'app/slices/requestsSlice';
import UnauthorizedException from "exceptions/unauthorizedException";

export default takeEvery('requests/denyRequest', wrapper(denyRequest));

function* denyRequest({payload: { id, userId, requestState }}){
    const response = yield fetch(`${BASE_URL}/api/requests/auth/deny/${id}`, {
        method: 'POST',
        headers:{
            Authorization: localStorage.getItem('Authorization')
        }
    });

    if(response.ok){
        yield put(onRequestComplete({ userId, chatWithUser: null, requestState: 'send' }))
    }else{
        const message = yield response.text()
        if(response.status == 401){
            throw new UnauthorizedException(message);            
        } 

        yield put(onRequestError({ userId, message, requestState }));
    }
}