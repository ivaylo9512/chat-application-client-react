import createSaga from 'redux-saga';
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import userChats from 'app/slices/userChatsSlice';
import styles from 'app/slices/stylesSlice';
import userChatsWatcher from 'app/sagas/userChats';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Form from 'components/Form/Form';
import { resetUserChatsState, getUserChatsQuery, userChatsRequest } from 'app/slices/userChatsSlice';
import { act } from 'react-dom/test-utils';

const saga = createSaga();
const middleware = [...getDefaultMiddleware(), saga];

const store = configureStore({
    reducer: {
        userChats,
        styles
    },
    middleware
})

saga.run(function*(){
    yield userChatsWatcher;
})

global.fetch = jest.fn();

const createWrapper = (state) => mount(
    <Provider store={store}>
        <Form action={userChatsRequest} resetState={resetUserChatsState} selector={getUserChatsQuery} placeholder={'search chat'}/>
    </Provider>
);

describe('Form integration tests', () => {
    it('should update state on form submit', async() => {
        const chats = [['data1', 'data'], ['data3', 'data4']];
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 4, data: chats}), {status: 200}));
        
        const wrapper = createWrapper();
        await act(async() => wrapper.find('form').simulate('submit', { preventDefault: jest.fn()}));
        
        const { data, lastData, currentData} = store.getState().userChats.dataInfo
        console.log(data);
        expect(data).toBe(chats);
        expect(lastData).toBe(chats[1]);
        expect(lastData).toBe(chats[1][1]);
    })
    
    it('should call reset state on unmount', async() => {
        const chats = [['data1', 'data'], ['data3', 'data4']];
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 4, data: chats}), {status: 200}));
        
        const wrapper = createWrapper();
        await act(async() => wrapper.find('form').simulate('submit', { preventDefault: jest.fn()}));
        await act(async() => wrapper.unmount)

        const { data, lastData, currentData} = store.getState().userChats.dataInfo
        expect(data).toBe([]);
        expect(lastData).toBe(null);
        expect(currentData).toBe(null);
    })
})