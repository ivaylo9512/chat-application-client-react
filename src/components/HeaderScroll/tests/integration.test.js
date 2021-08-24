import * as redux from 'react-redux';
import HeaderScroll from 'components/HeaderScroll/HeaderScroll';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import chatsWatcher from 'app/sagas/chats';
import chats from 'app/slices/chatsSlice';
import styles from 'app/slices/stylesSlice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Container } from 'components/HeaderScroll/HeaderScrollStyle';
import createSaga from 'redux-saga';
import { BASE_URL } from 'appConstants';
import { act } from 'react-dom/test-utils';
import Chat from 'components/Chat/Chat';

const saga = createSaga();
const middleware = [...getDefaultMiddleware(), saga];

const store = configureStore({
    reducer: {
        chats,
        styles
    },
    middleware,
    preloadedState: {
        chats:{
            data: {
                chats: [],
                isLastPage: false
            },
            query: {
                take: 2,
                direction: 'ASC',
            },
            isLoading: false
        }

    }
})

saga.run(function*(){
    yield chatsWatcher
})

global.fetch = jest.fn();


let id = 5;
const createData = () => [{ id: id++, secondUser: { firstName: `${id}firstName`, lastName: `${id}lastName` }}, { id: id++, secondUser: { firstName: `${id}firstName`, lastName: `${id}lastName` }}];

describe('HeaderScroll unit tests', () => {
    const createWrapper = () => mount(
        <Provider store={store}>
            <HeaderScroll />
        </Provider>
    )

    it('should call fetch with data', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 4,  data: createData()}), { status: 200 }));
        const wrapper = createWrapper();

        await act(async() => wrapper.find(Container).props()
            .onWheel({currentTarget: { scrollLeft: 20, scrollTop: 10, clientWidth: 10, scrollWidth: 30, scroll: jest.fn() }, deltaY: 10}));

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/chats/auth/findChats/2/`, {
            headers: {
                Authorization: null
            }
        })

        await act(async() => wrapper.unmount());
    })

    it('should update store on getChats', async() => {
        const data = createData();
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({count: 4,  data}), { status: 200 }));
        const wrapper = createWrapper();

        await act(async() => wrapper.find(Container).props()
            .onWheel({currentTarget: { scrollLeft: 20, scrollTop: 10, clientWidth: 10, scrollWidth: 30, scroll: jest.fn() }, deltaY: 10}));
        wrapper.update();

        expect(wrapper.find(Chat).length).toBe(2);
        expect(store.getState().chats.data.chats).toStrictEqual(data);
    })

})