import createSaga from 'redux-saga';
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import chats from 'app/slices/chatsSlice';
import requests from 'app/slices/requestsSlice';
import requestsWatcher from 'app/sagas/sendRequest';
import acceptRequestWatcher from 'app/sagas/acceptRequest';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Request from 'components/Request/Request';
import { BASE_URL } from 'appConstants';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { all } from 'redux-saga/effects';

const saga = createSaga();
const middleware = [...getDefaultMiddleware(), saga];

const store = configureStore({
    reducer: {
        chats,
        requests
    },
    middleware
})

saga.run(function*(){
    yield all([requestsWatcher, acceptRequestWatcher])
})

global.fetch = jest.fn();

const chatWithUser = {id: 1, lastMessage: 'last message', secondUser: { firstName: 'first', lastName: 'last', profileImage: 'image1.png'} };
describe('Request integration tests', () => {
    const createWrapper = (request) => mount(
        <Provider store={store}>
            <MemoryRouter>
                <Request request={{ ...request, createdAt: '2021-08-23', sender: { id: 5, firstName: 'firstname', lastName: 'lastName', profileImage: 'image.png' }}}/>
            </MemoryRouter>
        </Provider>
    )

    it('should pass requestId and action prop and call fetch', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(chatWithUser), { status: 200 }));
        
        const wrapper = createWrapper({ id: 5 });
        await act(async () => wrapper.findByTestid('accept').at(0).simulate('click'));

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/requests/auth/accept/5`, {
            method: 'POST',
            headers: {
                Authorization: null
            }
        })
    })

    it('should pass userId prop and update store with request', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(chatWithUser), { status: 200 }));
        
        const wrapper = createWrapper({ id: 6 });
        await act(async () => wrapper.findByTestid('action').at(0).simulate('click'));

        expect(store.getState().requests.data[5]).toEqual({ isLoading: false, chatWithUser, id: 5, state: 'completed', error: null });
    })

    it('should update store with current chat', async() => {
        const wrapper = createWrapper({ id: 6 });
        await act(async () => wrapper.findByTestid('action').at(0).simulate('click'));

        expect(store.getState().chats.data.currentChat).toStrictEqual(chatWithUser);
    })
})