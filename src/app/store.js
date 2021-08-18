import authenticate from './slices/authenticateSlice';
import styles from './slices/stylesSlice'
import chats from './slices/chatsSlice'
import users from './slices/usersSlice'
import userChats from './slices/userChatsSlice';
import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import createSaga from 'redux-saga';
import IndexSaga from './sagas/index';

const sagaMiddleware = createSaga();
const middleware = [...getDefaultMiddleware({thunk: false}), sagaMiddleware];

const combinedReducer = combineReducers({
    authenticate,
    styles,
    chats,
    users,
    userChats
})

const rootReducer = (state, action) => {
    if (action.type === 'authenticate/onLogout') { 
        localStorage.removeItem('Authorization');
        localStorage.removeItem('user');

        return combinedReducer(undefined, action);
    }

    return combinedReducer(state, action);
}

const store = configureStore({
    reducer: rootReducer,
    middleware
});

sagaMiddleware.run(IndexSaga);

export default store
