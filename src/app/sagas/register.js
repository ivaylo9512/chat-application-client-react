import { BASE_URL } from "../../constants"
import { put, takeLatest } from "redux-saga/effects";
import history from '../../utils/history';
import { onRegisterComplete, onRegisterError } from "../slices/authenticateSlice";

export default takeLatest('authenticate/registerRequest', register)

function* register({payload}){
    const response = yield fetch(`${BASE_URL}/users/register`,{
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(payload)
    })

    const data = yield response.json();
    if(response.ok){
        yield put(onRegisterComplete(data));

        localStorage.setItem('Authorization', response.headers.get('Authorization'));
        localStorage.setItem('user', data);
        history.push('/')
    }else{
        yield put(onRegisterError(data))
    }
}