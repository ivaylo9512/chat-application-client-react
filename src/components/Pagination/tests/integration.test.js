import createSaga from 'redux-saga';
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import userChatsWatcher from 'app/sagas/userChats';
import userChats, { userChatsRequest, getUserChatsState, getUserChats, setCurrentUserChats } from 'app/slices/userChatsSlice';

import { mount } from 'enzyme';
import Pagination from '../Pagination';
import { Provider } from 'react-redux';

const saga = createSaga();
const middleware = [...getDefaultMiddleware({ thunk: false }), saga];

const store = configureStore({
    reducer: {
        userChats
    },
    middleware
})

saga.run(function*(){
    yield userChatsWatcher
})

jest.fetch = jest.fn();

const createWrapper = () => {
    return mount(
        <Provider store={store}>
            <Pagination selector={getUserChatsState} setData={setCurrentUserChats} getData={userChatsRequest} data={userChats}/>
        </Provider>
    )
}

describe('Pagination integration tests', () => {
    it('should should get page 2 ', () => {
        const wrapper = createWrapper();

        wrapper.findByTestid(2).simulate('click');
    })
})