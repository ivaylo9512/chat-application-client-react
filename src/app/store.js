import authenticate from './slices/authenticateSlice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSaga from 'redux-saga';
import IndexSaga from './sagas/index';

const sagaMiddleware = createSaga();
const middleware = [...getDefaultMiddleware({thunk: false}), sagaMiddleware];

const store = configureStore({
    reducer: {
        authenticate
    },
    middleware
});

sagaMiddleware.run(IndexSaga);

export default store
