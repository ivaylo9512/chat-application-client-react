import authenticate from 'app/slices/authenticateSlice';
import styles from 'app/slices/stylesSlice'
import chats from 'app/slices/chatsSlice'
import users from 'app/slices/usersSlice'
import userChats from 'app/slices/userChatsSlice';
import requests from 'app/slices/requestsSlice';
import allRequests from 'app/slices/allRequestsSlice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSaga from 'redux-saga';
import IndexSaga from 'app/sagas/index';
import { all } from 'redux-saga/effects';

const sagaMiddleware = createSaga();

const combinedReducer = combineReducers({
    authenticate,
    styles,
    chats,
    users,
    userChats,
    requests,
    allRequests
})

export const rootReducer = (state, action) => {
    if (action.type === 'authenticate/onLogout') { 
        localStorage.removeItem('Authorization');
        localStorage.removeItem('user');

        return combinedReducer(undefined, action);
    }

    return combinedReducer(state, action);
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(IndexSaga);

export default store

export const createTestStore = ({ reducers, watchers, preloadedState}) => {
    const sagaMiddleware = createSaga();
   
    const combinedReducer = combineReducers(reducers);
    const rootReducer = (state, action) => {
        if(action.type === 'reset'){
            return combinedReducer(preloadedState, action);
        }

        return combinedReducer(state, action);
    }

    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
        preloadedState
    })

    if(watchers){
        sagaMiddleware.run(function*(){
            yield all(watchers);
        })
    }

    return store;
}