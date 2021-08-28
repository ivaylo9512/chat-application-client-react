import { onUserChatsComplete, onUserChatsError, getUserChatsData } from "app/slices/userChatsSlice";
import { select, takeLatest, put, call } from "redux-saga/effects";
import { BASE_URL } from "appConstants";
import UnauthorizedException from "exceptions/unauthorizedException";
import splitArray from "utils/splitArray";
import { wrapper } from ".";

export default takeLatest('userChats/userChatsRequest', wrapper(getUserChats));

export function* getUserChats({payload: query}){
    const { name, lastName, lastId, takeAmount } =  getData(query, yield select(getUserChatsData));
    const lastPath = lastName ? `/${lastName}/${lastId}` : '';
    const namePath = name ? `/${name.replace(/[\\?%#/'"]/g, '')}` : '';
    
    const response = yield call(fetch, `${BASE_URL}/api/chats/auth/findChatsByName/${takeAmount}${namePath}${lastPath}`,{
        headers:{
            Authorization: localStorage.getItem('Authorization')
        }
    });

    if(response.ok){
        const pageable = yield response.json();
        
        pageable.lastUserChat = pageable.data[pageable.data.length - 1];
        pageable.pages = Math.ceil(pageable.count / query.take);
        pageable.data = splitArray(pageable.data, query.take);

        yield put(onUserChatsComplete({
            pageable,
            query
        }))
    }else{
        const message = yield response.text(); 
        yield put(onUserChatsError(message));

        if(response.status == 401){
            throw new UnauthorizedException(message);            
        } 
    }
}

const getData = (query, dataInfo) => {
    let lastId = 0;
    let lastName;
    let lastUserChat = dataInfo.lastData;
    const takeAmount = query.take * query.pages;

    if(lastUserChat){
        lastId = lastUserChat.id;
        lastName = `${lastUserChat.secondUser.firstName} ${lastUserChat.secondUser.lastName}`;
    }

    return {...query, takeAmount, lastName, lastId}
}
