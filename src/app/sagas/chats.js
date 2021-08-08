import { BASE_URL } from '../../constants';
import { getChatsData, onChatsComplete, onChatsError } from '../slices/chatsSlice';
import { takeLatest, select, put } from 'redux-saga/effects';

export default takeLatest('chats/getChats', getChats);

function* getChats({payload: query}){
    const { lastUpdatedAt, lastId, takeAmount } =  getData(query, yield select(getChatsData));
    const response = yield fetch(`${BASE_URL}/api/chats/auth/findChats/${takeAmount}${lastUpdatedAt}/${lastId}`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`
        }
    });

    if(response.ok){
        const data = yield response.json(); 
        
        data.length = data.chats.length;
        data.lastChat = data.chats[data.length];
        data.chats = splitArray(data.chats, query.take);

        yield put(onChatsComplete({
            data,
            query
        }))
    }else{
        yield put (onChatsError(response.text()));
    }

}

const splitArray = (chats, take) => {
    return chats.reduce((result, chat, i) =>  {
        const page = Math.floor(i / take);
        result[page] = result[page] ? (result[page].push(chat), result[page]) : [chat];

        return result;
    },[])
}

const getData = (query, data) => {
    let lastId = 0;
    let lastUpdatedAt;
    let lastChat = data.lastChat;
    const takeAmount = query.take * query.pages;
    
    if(lastChat){
        lastId = lastChat.id;
        lastUpdatedAt = lastChat.updatedAt;
    }

    return {...query, takeAmount, lastUpdatedAt, lastId}
}

