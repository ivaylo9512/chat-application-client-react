import { authWrapper } from ".";
import { takeLatest, put } from "redux-saga/effects";
import { BASE_URL } from "appConstants";
import UnauthorizedException from "exceptions/unauthorizedException";

export default takeLatest('requests/allRequests', authWrapper(getRequests));

function* getRequests({payload: query}){
    const { lastCreatedAt, lastId, takeAmount } =  getData(query, yield select(getRequestsData));
    const lastPath = lastCreatedAt ? `${lastCreatedAt}/${lastId}` : '';

    const response = yield fetch(`${BASE_URL}/api/requests/auth/findAll/${takeAmount}/${lastPath}`, {
        headers:{
            Authorization: localStorage.getItem('Authorization')
        }
    });

    if(response.ok){
        const pageable = yield response.json();
        
        pageable.lastRequest = pageable.data[pageable.data.length - 1];
        pageable.pages = Math.ceil(pageable.count / query.take);
        pageable.data = splitArray(pageable.data, query.take);

        yield put(onPendingRequestsComplete({            
            pageable,
            query
        }))
    }else{
        const message = yield response.text()
        if(response.status == 401){
            throw new UnauthorizedException(message);            
        } 

        yield put(onPendingRequestsError(message));
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