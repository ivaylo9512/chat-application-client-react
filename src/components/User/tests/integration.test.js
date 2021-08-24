import User from 'components/User/User';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import { mount } from 'enzyme';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import users from 'app/slices/usersSlice'
import requests from 'app/slices/requestsSlice'
import chats from 'app/slices/chatsSlice'
import requestsWatcher from 'app/sagas/requests'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import createSaga from 'redux-saga';
import { act } from 'react-dom/test-utils'
import { BASE_URL } from 'appConstants';

const saga = createSaga();
const middleware = [...getDefaultMiddleware({ thunk: false }), saga];

const user = { id: 5, firstName: 'First', lastName: 'Last', profilePicture: 'image.png' };
const store = configureStore({
    reducer: {
        requests,
        chats
    },
    middleware,
    preloadedState: {
        requests: {
            data: {
                6: {
                    isLoading: true
                }
            }
        },
    }
})

global.fetch = jest.fn();

saga.run(function*(){
    yield requestsWatcher
})

describe('User integration tests', () => {
    const createWrapper = (user) => mount(
        <Provider store={store}>
            <MemoryRouter>
                <User page={1} user={{firstName: 'First', lastName: 'Last', profilePicture: 'image.png', ...user }}/>
            </MemoryRouter>
        </Provider>
    )

    it('should call fetch with data', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ ...user, requestState: 'pending' }), { status: 200 }))
        const wrapper = createWrapper({ id: 5, chatWithUser: false });
        await act(async() => wrapper.find('button').simulate('click'));

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/requests/auth/addRequest/5`,{
            method: 'POST',
            headers: {
                Authorization: null
            },
        });
    })
    
    it('should create set chat requestState', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ ...user, requestState: 'pending' }), { status: 200 }))
        const wrapper = createWrapper({ id: 5, chatWithUser: false });
        await act(async() => wrapper.find('button').simulate('click'));

        expect(store.getState().requests.data[5].isLoading).toBe(false);
    })

    it('should render LoadingIndicator when user has request', async() => {
        const wrapper = createWrapper({ id: 6 });

        expect(wrapper.find(LoadingIndicator).exists()).toBe(true);
    })

    it('should set current chat', async() => {
        const chatWithUser = { id: 1, secondUser: { firstName: 'firstname', lastName: 'lastname' }};
        const wrapper = createWrapper({ id: 7, chatWithUser });
        await act(async() => wrapper.find('button').simulate('click'));

        expect(store.getState().chats.currentChat).toBe(chatWithUser);
    })
})