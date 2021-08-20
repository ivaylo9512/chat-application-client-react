import createSaga from 'redux-saga';
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import userChats from 'app/slices/userChatsSlice';
import userChatsWatcher from 'app/sagas/userChats';
import styles from 'app/slices/stylesSlice';
import UserChatsView from 'components/UserChatsView/UserChatsView';
import { Provider } from 'react-redux';
import UserChat from 'components/UserChat/UserChat';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Li } from 'components/Pagination/PaginationStyle';

const saga = createSaga();
const middleware = [...getDefaultMiddleware(), saga];

const store = configureStore({
    reducer: {
        userChats,
        styles
    },
    middleware,
    preloadedState: {
        userChats: {
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
        }
    }
})

saga.run(function*(){
    yield userChatsWatcher
})

global.fetch = jest.fn();

let id = 0;
let createPair = () => [{ id: id++, secondUser: { firstName: `${id}name`, lastName: `${id}name` }}, { id: id++, secondUser: { firstName: `${id}name`, lastName: `${id}name` }}]
describe('UserChatsView snapshot tests', () => {
    const createWrapper = () => mount(
        <Provider store={store}>
            <UserChatsView />
        </Provider>
    )

    it('should update chats on search submit', async() => {
        const chats = createPair();
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 10, data: chats}), {status: 200}));
        
        const wrapper = createWrapper();
        await act(async() => wrapper.find('form').simulate('submit', { preventDefault: jest.fn()}));
        wrapper.update();

        const userChats =  wrapper.find(UserChat)
        const li = wrapper.find(Li);

        expect(li.length).toBe(5);
        expect(userChats.length).toBe(2);

        expect(userChats.at(0).prop('userChat')).toStrictEqual(chats[0]);
        expect(userChats.at(1).prop('userChat')).toStrictEqual(chats[1]);
    
        expect(li.at(0).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('1');
        expect(li.at(1).prop('data-testid')).toBe('2');
    })

    it('should update chats on pagination page click', async() => {
        const chats = [createPair(), createPair(), createPair(), createPair()];
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 14, data: chats.flat()}), {status: 200}));
        
        const wrapper = createWrapper();
        await act(async() => wrapper.findByTestid(5).at(0).simulate('click'));
        wrapper.update();

        const userChats = wrapper.find(UserChat)
        const li = wrapper.find(Li);

        expect(li.length).toBe(4);
        expect(userChats.length).toBe(2);

        expect(userChats.at(0).prop('userChat')).toStrictEqual(chats[3][0]);
        expect(userChats.at(1).prop('userChat')).toStrictEqual(chats[3][1]);
    
        expect(li.at(0).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('5');
        expect(li.at(1).prop('data-testid')).toBe('6');
    })

    it('should update currentChats when back button is clicked', async() => {
        const wrapper = createWrapper();
      
        await act(async() => wrapper.findByTestid(5).at(0).simulate('click'));
        wrapper.update();
       
        await act(async() => wrapper.findByTestid('back').simulate('click'));
        wrapper.update();

        const userChats = wrapper.find(UserChat)
        const li = wrapper.find(Li);
        const chats = store.getState().userChats.dataInfo.data[3];

        expect(li.length).toBe(5);
        expect(userChats.length).toBe(2);


        expect(userChats.at(0).prop('userChat')).toStrictEqual(chats[0]);
        expect(userChats.at(1).prop('userChat')).toStrictEqual(chats[1]);
    
        expect(li.at(3).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('1');
        expect(li.at(1).prop('data-testid')).toBe('2');
    })

    it('should update currentChats when next button is clicked', async() => {
        const wrapper = createWrapper();
      
        await act(async() => wrapper.findByTestid('next').simulate('click'));
        wrapper.update();

        const userChats = wrapper.find(UserChat)
        const li = wrapper.find(Li);
        const chats = store.getState().userChats.dataInfo.data[1];

        expect(li.length).toBe(5);
        expect(userChats.length).toBe(2);


        expect(userChats.at(0).prop('userChat')).toStrictEqual(chats[0]);
        expect(userChats.at(1).prop('userChat')).toStrictEqual(chats[1]);
    
        expect(li.at(1).prop('isSelected')).toBe(true);
        expect(li.at(0).prop('data-testid')).toBe('1');
        expect(li.at(1).prop('data-testid')).toBe('2');
    })

    it('should reset state when new search is submit', async() => {
        const wrapper = createWrapper();
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 0, data: []}), {status: 200}));
      
        await act(async() => wrapper.find('form').simulate('submit', { preventDefault: jest.fn()}));
        wrapper.update();

        const userChats = wrapper.find(UserChat)
        const li = wrapper.find(Li);

        expect(li.length).toBe(0);
        expect(userChats.length).toBe(0);
    })

    it('should reset state on unmount', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 10, data: createPair()}), {status: 200}));
        
        const wrapper = createWrapper();
        await act(async() => wrapper.find('form').simulate('submit', { preventDefault: jest.fn()}));
        wrapper.update();

        const userChats =  wrapper.find(UserChat)
        const li = wrapper.find(Li);

        expect(li.length).toBe(5);
        expect(userChats.length).toBe(2);

        await act(async() => wrapper.unmount());

        const {pages, maxPages, data, lastData, currentData} = store.getState().userChats.dataInfo;
        expect(pages).toBe(0);
        expect(maxPages).toBe(0);
        expect(data).toStrictEqual([]);
        expect(currentData).toBe(null);
        expect(lastData).toBe(null);
    })
})