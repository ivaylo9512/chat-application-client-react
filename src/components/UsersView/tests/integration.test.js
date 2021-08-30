import createSaga from 'redux-saga';
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import users from 'app/slices/usersSlice';
import usersWatcher from 'app/sagas/users';
import requestsWatcher from 'app/sagas/sendRequest';
import styles from 'app/slices/stylesSlice';
import requests from 'app/slices/requestsSlice';
import UsersView from 'components/UsersView/UsersView';
import { Provider } from 'react-redux';
import User from 'components/User/User';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Li } from 'components/Pagination/PaginationStyle';
import { all } from 'redux-saga/effects';

const saga = createSaga();
const middleware = [...getDefaultMiddleware(), saga];

const store = configureStore({
    reducer: {
        users,
        styles,
        requests
    },
    middleware,
    preloadedState: {
        users: {
            dataInfo: {
                pages: 0,
                maxPages: 0,
                data: [],
                lastData: null,
                currentData: null
            },
            query: {
                take: 2,
            },
        },
        requests: {
            data: {
                0: { isLoading: false },
                1: { isLoading: false }
            }
        }
    }
})

saga.run(function*(){
    yield all([usersWatcher, requestsWatcher])
})

global.fetch = jest.fn();

let id = 0;
let createPair = () => [{ id: id++, firstName: `${id}name`, lastName: `${id}name` }, { id: id++, firstName: `${id}name`, lastName: `${id}name` }]
describe('UsersView integration tests', () => {
    const createWrapper = () => mount(
        <Provider store={store}>
            <UsersView />
        </Provider>
    )

    it('should update users on search submit', async() => {
        const data = createPair();
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 10, data: data}), {status: 200}));
        
        const wrapper = createWrapper();
        await act(async() => wrapper.find('form').simulate('submit', { preventDefault: jest.fn()}));
        wrapper.update();

        const users =  wrapper.find(User)
        const li = wrapper.find(Li);

        expect(li.length).toBe(5);
        expect(users.length).toBe(2);

        expect(users.at(0).prop('user')).toStrictEqual(data[0]);
        expect(users.at(1).prop('user')).toStrictEqual(data[1]);
    
        expect(li.at(0).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('1');
        expect(li.at(1).prop('data-testid')).toBe('2');
    })

    it('should update users on pagination page click', async() => {
        const data = [createPair(), createPair(), createPair(), createPair()];
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 14, data: data.flat()}), {status: 200}));
        
        const wrapper = createWrapper();
        await act(async() => wrapper.findByTestid(5).at(0).simulate('click'));
        wrapper.update();

        const users = wrapper.find(User)
        const li = wrapper.find(Li);

        expect(li.length).toBe(4);
        expect(users.length).toBe(2);

        expect(users.at(0).prop('user')).toStrictEqual(data[3][0]);
        expect(users.at(1).prop('user')).toStrictEqual(data[3][1]);
    
        expect(li.at(0).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('5');
        expect(li.at(1).prop('data-testid')).toBe('6');
    })

    it('should update currentUsers when back button is clicked', async() => {
        const wrapper = createWrapper();
      
        await act(async() => wrapper.findByTestid(5).at(0).simulate('click'));
        wrapper.update();
       
        await act(async() => wrapper.findByTestid('back').simulate('click'));
        wrapper.update();

        const users = wrapper.find(User)
        const li = wrapper.find(Li);
        const data = store.getState().users.dataInfo.data[3];

        expect(li.length).toBe(5);
        expect(users.length).toBe(2);


        expect(users.at(0).prop('user')).toStrictEqual(data[0]);
        expect(users.at(1).prop('user')).toStrictEqual(data[1]);
    
        expect(li.at(3).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('1');
        expect(li.at(1).prop('data-testid')).toBe('2');
    })

    it('should update currentUsers when next button is clicked', async() => {
        const wrapper = createWrapper();
      
        await act(async() => wrapper.findByTestid('next').simulate('click'));
        wrapper.update();

        const users = wrapper.find(User)
        const li = wrapper.find(Li);
        const data = store.getState().users.dataInfo.data[1];

        expect(li.length).toBe(5);
        expect(users.length).toBe(2);


        expect(users.at(0).prop('user')).toStrictEqual(data[0]);
        expect(users.at(1).prop('user')).toStrictEqual(data[1]);
    
        expect(li.at(1).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('1');
        expect(li.at(1).prop('data-testid')).toBe('2');
    })

    it('should reset state when new search is submit', async() => {
        const wrapper = createWrapper();
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 0, data: []}), {status: 200}));
      
        await act(async() => wrapper.find('form').simulate('submit', { preventDefault: jest.fn()}));
        wrapper.update();

        const users = wrapper.find(User)
        const li = wrapper.find(Li);

        expect(li.length).toBe(0);
        expect(users.length).toBe(0);
    })

    it('should reset state on unmount', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 10, data: createPair()}), {status: 200}));
        
        const wrapper = createWrapper();
        await act(async() => wrapper.find('form').simulate('submit', { preventDefault: jest.fn()}));
        wrapper.update();

        const users =  wrapper.find(User)
        const li = wrapper.find(Li);

        expect(li.length).toBe(5);
        expect(users.length).toBe(2);

        await act(async() => wrapper.unmount());

        const {pages, maxPages, data, lastData, currentData} = store.getState().users.dataInfo;
        expect(pages).toBe(0);
        expect(maxPages).toBe(0);
        expect(data).toStrictEqual([]);
        expect(currentData).toBe(null);
        expect(lastData).toBe(null);
    })

    it('should reset requests on currentData change', async () => {
        const data = createPair(); 
        data[0].requestState = 'send';
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 10, data}), {status: 200}));
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ requestState: 'pending', requestId: 3}), {status: 200}));
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 10, data}), {status: 200}));
        
        const wrapper = createWrapper();
        await act(async() => wrapper.find('form').simulate('submit', { preventDefault: jest.fn()}));
        wrapper.update();

        const users =  wrapper.find(User)
        await act(async() => users.at(0).findByTestid('action').at(0).simulate('click'));

        let requests = store.getState().requests.data;
        expect(requests[data[0].id]).toStrictEqual({ isLoading: false, state: 'pending', chatWithUser: undefined, id: 3, error: null });

        await act(async() => wrapper.find('form').simulate('submit', { preventDefault: jest.fn()}));

        requests = store.getState().requests.data;
        expect(requests[data[0].id]).toBe(undefined)
    })
})