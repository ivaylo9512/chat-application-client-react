import { authWrapper } from ".";
import { takeLatest, put } from "redux-saga/effects";
import { BASE_URL } from "appConstants";
import {onRequestComplete, onRequestError} from 'app/slices/requestsSlice';
import UnauthorizedException from "exceptions/unauthorizedException";
import { updateUser } from "app/slices/usersSlice";

export default takeLatest('requests/sendRequest', authWrapper(sendRequests));

function* sendRequests({payload: {id, page}}){
    const response = yield fetch(`${BASE_URL}/api/requests/auth/addRequest/${id}`, {
        method: 'POST',
        headers:{
            Authorization: localStorage.getItem('Authorization')
        }
    });

    if(response.ok){
        yield put(updateUser({page, user: yield response.json()}));
        yield put(onRequestComplete(id))
    }else{
        const message = yield response.text()
        if(response.status == 401){
            throw new UnauthorizedException(message);            
        } 

        yield put(onRequestError({id, message}));
    }
}