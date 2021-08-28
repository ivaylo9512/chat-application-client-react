import { wrapper } from ".";
import { takeLatest, put, select, call } from "redux-saga/effects";
import { BASE_URL } from "appConstants";
import UnauthorizedException from "exceptions/unauthorizedException";
import { getAllRequestsData, onGetRequestsComplete, onGetRequestsError } from 'app/slices/allRequestsSlice';
import splitArray from "utils/splitArray";

export default takeLatest('allRequests/getRequests', wrapper(getRequests));

function* getRequests({payload: query}){
    const { lastCreatedAt, lastId, takeAmount } =  getData(query, yield select(getAllRequestsData));
    const lastPath = lastCreatedAt ? `${lastCreatedAt}/${lastId}` : '';

    const response = yield call(fetch, `${BASE_URL}/api/requests/auth/findAll/${takeAmount}/${lastPath}`, {
        headers:{
            Authorization: localStorage.getItem('Authorization')
        }
    });

    if(response.ok){
        const pageable = yield response.json();
        
        pageable.lastRequest = pageable.data[pageable.data.length - 1];
        pageable.pages = Math.ceil(pageable.count / query.take);
        pageable.data = splitArray(pageable.data, query.take);

        yield put(onGetRequestsComplete({            
            pageable,
            query
        }))
    }else{
        const message = yield response.text()
        if(response.status == 401){
            throw new UnauthorizedException(message);            
        } 

        yield put(onGetRequestsError(message));
    }
}

const getData = (query, dataInfo) => {
    let lastId = 0;
    let lastCreatedAt;
    let lastRequest = dataInfo.lastData;
    const takeAmount = query.take * query.pages;
    
    if(lastRequest){
        lastId = lastRequest.id;
        lastCreatedAt = lastRequest.createdAt
    }

    return {...query, takeAmount, lastCreatedAt, lastId}
}