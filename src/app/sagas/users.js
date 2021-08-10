import { BASE_URL } from '../../constants';
import { getUsersData, onUsersComplete, onUsersError} from '../slices/usersSlice';
import { takeLatest, select, put } from 'redux-saga/effects';
import splitArray from '../../utils/splitArray';
import UnauthorizedException from '../../exceptions/unauthorizedException';

export default takeLatest('users/usersRequest', getUsers);

function* getUsers({payload: query}){
    const { name, lastName, lastId, takeAmount } =  getData(query, yield select(getUsersData));
    const lastPath = lastName ? `${lastName}/${lastId}` : '';

    const response = yield fetch(`${BASE_URL}/api/users/auth/searchForUsers/${name}/${takeAmount}/${lastPath}`,{
        headers:{
            Authorization: localStorage.getItem('Authorization')
        }
    });

    if(response.ok){
        const pageable = yield response.json();
        pageable.lastUser = pageable.data[pageable.data.length - 1];
        pageable.data = splitArray(pageable.data, query.take);

        yield put(onUsersComplete({
            pageable,
            query
        }))
    }else{
        const message = yield response.text(); 
        yield put(onUsersError(message));

        if(response.status == 401){
            throw new UnauthorizedException(message);            
        } 
    }

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

