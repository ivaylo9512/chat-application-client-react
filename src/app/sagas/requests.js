import { authWrapper } from ".";
import { takeLatest, put } from "redux-saga/effects";
import { BASE_URL } from "appConstants";
import {onRequestComplete, onRequestError} from 'app/slices/requestsSlice';
import UnauthorizedException from "exceptions/unauthorizedException";

export default takeLatest('requests/sendRequest', authWrapper(sendRequests));

function* sendRequests({payload: id}){
    const response = yield fetch(`${BASE_URL}/api/requests/auth/addRequest/${id}`, {
        method: 'POST',
        headers:{
            Authorization: localStorage.getItem('Authorization')
        }
    });

    const data = yield response.text()
    if(response.ok){
        yield put(onRequestComplete({id, data}))
    }else{
        if(response.status == 401){
            throw new UnauthorizedException(data);            
        } 

        yield put(onRequestError({id, data}));
    }
}