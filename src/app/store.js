import authenticate from './slices/authenticateSlice';
import styles from './slices/stylesSlice'
import chats from './slices/chatsSlice'
import users from './slices/usersSlice'
import userChats from './slices/userChatsSlice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSaga from 'redux-saga';
import IndexSaga from './sagas/index';

const sagaMiddleware = createSaga();
const middleware = [...getDefaultMiddleware({thunk: false}), sagaMiddleware];

const store = configureStore({
    reducer: {
        authenticate,
        styles,
        chats,
        users,
        userChats
    },
    middleware
});

sagaMiddleware.run(IndexSaga);

export default store
