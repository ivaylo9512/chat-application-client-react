import { BASE_URL } from '../../constants';
import { getChatsData, onChatsComplete, onChatsError } from '../slices/chatsSlice';
import { takeLatest, select, put } from 'redux-saga/effects';

export default takeLatest('chats/chatsRequest', getChats);

function* getChats({payload: query}){
    const { lastUpdatedAt, lastId, take } =  getData(query, yield select(getChatsData));
    const lastParam = lastUpdatedAt ? `${lastUpdatedAt}/${lastId}` : ''
    
    const response = yield fetch(`${BASE_URL}/api/chats/auth/findChats/${take}/${lastParam}`, {
        headers:{
            Authorization: localStorage.getItem('Authorization')
        }
    });

    if(response.ok){
        const pageable = yield response.json(); 
        pageable.lastChat = pageable.data[pageable.data.length - 1]; 
        pageable.isLastPage = pageable.pages < 2;
        
        yield put(onChatsComplete({
            pageable,
            query
        }))
    }else{
        yield put(onChatsError(yield response.text()));
    }

}

const getData = (query, data) => {
    let lastId = 0;
    let lastUpdatedAt;
    let lastChat = data.lastChat;
    
    if(lastChat){
        lastId = lastChat.id;
        lastUpdatedAt = lastChat.updatedAt;
    }

    return {...query, lastUpdatedAt, lastId}
}

