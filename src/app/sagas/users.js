import { BASE_URL } from '../../constants';
import { getUsersData, onUsersComplete, onUsersError} from '../slices/usersSlice';
import { takeLatest, select, put } from 'redux-saga/effects';

export default takeLatest('users/getUsers', getUsers);

function* getUsers({payload: query}){
    const { name, lastName, lastId, takeAmount } =  getData(query, yield select(getUsersData));
    const response = yield fetch(`${BASE_URL}/api/users/auth/searchForUsers/${name}/${takeAmount}${lastName}/${lastId}`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`
        }
    });

    if(response.ok){
        const data = yield response.json(); 
        
        data.length = data.users.length;
        data.lastUser = data.users[data.length];
        data.users = splitArray(data.users, query.take);

        yield put(onUsersComplete({
            data,
            query
        }))
    }else{
        yield put (onUsersError(response.text()));
    }

}

const splitArray = (users, take) => {
    return users.reduce((result, user, i) =>  {
        const page = Math.floor(i / take);
        result[page] = result[page] ? (result[page].push(user), result[page]) : [user];

        return result;
    },[])
}

const getData = (query, data) => {
    let lastId = 0;
    let lastName;
    let lastUser = data.lastUser;
    const takeAmount = query.take * query.pages;
    
    if(lastUser){
        lastId = lastUser.id;
        lastName = `${lastUser.firstName} ${lastUser.lastName}`;
    }

    return {...query, takeAmount, lastName, lastId}
}

