import createSaga from 'redux-saga';
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import chats from 'app/slices/chatsSlice';
import chatsWatcher from 'app/sagas/chats';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import ChatList from 'components/ChatList/ChatList';
import Chat from 'components/Chat/Chat';
import { BASE_URL } from 'appConstants';
import { act } from 'react-dom/test-utils';

const saga = createSaga();
const middleware = [...getDefaultMiddleware(), saga];

const store = configureStore({
    reducer: {
        chats
    },
    middleware
})

saga.run(function*(){
    yield chatsWatcher;
})

global.fetch = jest.fn();

let id = 5;
const createData = () => [{ id: id++, secondUser: { firstName: `${id}firstName`, lastName: `${id}lastName` }}, { id: id++, secondUser: { firstName: `${id}firstName`, lastName: `${id}lastName` }}];

describe('ChatList integration tests', () => {
    const createWrapper = () => mount(
        <Provider store={store}>
            <ChatList />
        </Provider>
    );

    it('should fetch chats on mount', async() => {
        const chatsData = createData();
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({data: chatsData, count: 1}), { status: 200 }));

        let wrapper;
        await act(async () => wrapper = createWrapper());
        wrapper.update();
        const foundChats = wrapper.find(Chat);

        expect(foundChats.length).toBe(2);
        expect(foundChats.at(0).key()).toBe('5');
        expect(foundChats.at(1).key()).toBe('6');
        
        expect(foundChats.at(0).prop('chat')).toStrictEqual(chatsData[0])
        expect(foundChats.at(1).prop('chat')).toStrictEqual(chatsData[1])

        const { chats, lastChat, isLastPage } = store.getState().chats.data;

        expect(chats).toStrictEqual(chats);
        expect(isLastPage).toBe(true);
        expect(lastChat).toStrictEqual(chats[1]);
    })

    it('should call fetch with', () => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({data: createData(), pages: 1}), { status: 200 }));

        createWrapper();

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/chats/auth/findChats/2`, {
            'headers': {
                'Authorization': null
            }
        });
    })

    it('should reset state on unmount', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({data: createData(), pages: 1}), { status: 200 }));
        
        let wrapper;
        await act(async () => wrapper = createWrapper());
        wrapper.update();
        const foundChats = wrapper.find(Chat);

        expect(foundChats.length).toBe(6);

        await act(async() => wrapper.unmount());

        const { chats, lastChat, isLastPage } = store.getState().chats.data;

        expect(chats).toStrictEqual([]);
        expect(isLastPage).toBe(false);
        expect(lastChat).toBe(null);
    })
})