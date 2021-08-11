import { onUserChatsComplete, onUserChatsError, getUserChatsData } from "../slices/userChatsSlice";
import { select, takeLatest, put } from "redux-saga/effects";
import { authWrapper } from ".";
import { BASE_URL } from "../../constants";
import UnauthorizedException from "../../exceptions/unauthorizedException";
import splitArray from "../../utils/splitArray";

export default takeLatest('userChats/userChatsRequest', authWrapper(getUserChats));

function* getUserChats({payload: query}){
    const { name, lastName, lastId, takeAmount } =  getData(query, yield select(getUserChatsData));
    const lastPath = lastName ? `${lastName}/${lastId}` : '';

    const response = yield fetch(`${BASE_URL}/api/chats/auth/findChatsByName/${takeAmount}/${name.replace(/[\\?%#/'"]/g, '')}/${lastPath}`,{
        headers:{
            Authorization: localStorage.getItem('Authorization')
        }
    });

    if(response.ok){
        const pageable = yield response.json();
        pageable.lastUserChat = pageable.data[pageable.data.length - 1];
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

const getData = (query, data) => {
    let lastId = 0;
    let lastName;
    let lastUserChat = data.lastUserChat;
    const takeAmount = query.take * query.pages;

    if(lastUserChat){
        lastId = lastUserChat.id;
        lastName = `${lastUserChat.secondUser.firstName} ${lastUserChat.secondUser.lastName}`;
    }

    return {...query, takeAmount, lastName, lastId}
}
