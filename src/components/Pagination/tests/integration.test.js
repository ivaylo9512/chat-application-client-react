import createSaga from 'redux-saga';
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import userChatsWatcher from 'app/sagas/userChats';
import userChats, { userChatsRequest, getUserChatsState, getUserChats, setCurrentUserChats } from 'app/slices/userChatsSlice';
import { mount } from 'enzyme';
import Pagination from '../Pagination';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

const saga = createSaga();
const middleware = [...getDefaultMiddleware({ thunk: false }), saga];

let id = 0;
const getChatPair = (firstName = 'test', lastName = 'test') => [{id: id++, secondUser: { firstName, lastName }}, {id: id++, secondUser: { firstName, lastName }}]

const initialData = getChatPair();
const store = configureStore({
    reducer: {
        userChats
    },
    middleware,
    preloadedState: {
        userChats: {
            dataInfo: { 
                pages: 1,
                maxPages: 5,
                data: [initialData],
                lastData: initialData[1],
                currentData: initialData
            },
            query: {
                take: 2,
                direction: 'ASC',
                name: '',
            },
            isLoading: false,
            error: null,   
        } 
    }
})

saga.run(function*(){
    yield userChatsWatcher
})

const mockedFetch = jest.fn();
global.fetch = mockedFetch;

const createWrapper = () => mount(
    <Provider store={store}>
        <Pagination selector={getUserChatsState} setData={setCurrentUserChats} getData={userChatsRequest} pagesPerSlide={5}/>
    </Provider>
)

describe('Pagination integration tests', () => {
    it('should should get page 2', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 8, data: getChatPair()}), {status: 200}));
        const wrapper = createWrapper();  

        await act(async() => wrapper.findByTestid(2).at(0).simulate('click'));
        const state = store.getState().userChats;
        wrapper.update();

        expect(state.dataInfo.currentData).toBe(state.dataInfo.data[1]);
        expect(state.dataInfo.maxPages).toBe(5);
        expect(state.dataInfo.pages).toBe(2);
        expect(state.dataInfo.lastData).toBe(state.dataInfo.data[1][1])
    })

    it('should call dispatch with setData when page is already fetched', async() => {
        const wrapper = createWrapper();  

        await act(async() => wrapper.findByTestid(1).at(0).simulate('click'));
        const state = store.getState().userChats;

        expect(state.dataInfo.currentData).toBe(state.dataInfo.data[0]);
        expect(state.dataInfo.maxPages).toBe(5);
        expect(state.dataInfo.pages).toBe(2);
    })

    it('should should get pages from 2 to 5 and add 1 more to max pages', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 8, data: [...getChatPair(), ...getChatPair(), ...getChatPair()]}), {status: 200}));
        const wrapper = createWrapper();  

        await act(async() => wrapper.findByTestid(5).at(0).simulate('click'));
        const state = store.getState().userChats;
        wrapper.update();

        expect(state.dataInfo.currentData).toBe(state.dataInfo.data[4]);
        expect(state.dataInfo.maxPages).toBe(6);
        expect(state.dataInfo.pages).toBe(5);
        expect(wrapper.findByTestid(6).at(0).length).toBe(1);
    })

    
    it('should should get last page', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 2, data: [...getChatPair()]}), {status: 200}));
        const wrapper = createWrapper();  

        await act(async() => wrapper.findByTestid(5).at(0).simulate('click'));
        wrapper.update();
        await act(async() => wrapper.findByTestid(6).at(0).simulate('click'));
        const state = store.getState().userChats;
        wrapper.update();

        expect(state.dataInfo.currentData).toBe(state.dataInfo.data[5]);
        expect(state.dataInfo.maxPages).toBe(6);
        expect(state.dataInfo.pages).toBe(6);
        expect(wrapper.findByTestid(7).length).toBe(0);
    })
})