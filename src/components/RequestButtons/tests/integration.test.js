import { createTestStore } from 'app/store';
import chats from 'app/slices/chatsSlice';
import requests from 'app/slices/requestsSlice';
import acceptRequestWatcher from 'app/sagas/acceptRequest';
import denyRequestWatcher from 'app/sagas/denyRequest';
import sendRequestWatcher from 'app/sagas/sendRequest';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import RequestButtons from 'components/RequestButtons/RequestButtons'
import { act } from 'react-dom/test-utils';

const store = createTestStore({ 
    reducers: { chats, requests }, 
    watchers: [ acceptRequestWatcher, sendRequestWatcher, denyRequestWatcher ] 
});
const chatWithUser = {
    id: 1, 
    lastMessage: 'last message', 
    secondUser: { 
        firstName: 'first',
        lastName: 'last', 
        profileImage: 'image1.png'
    } 
};

global.fetch = jest.fn();

describe('RequestButtons integration tests', () => {
    const createWrapper = (request) => mount(
        <Provider store={store}>
            <MemoryRouter>
                <RequestButtons {...request}/>
            </MemoryRouter>
        </Provider>
    )

    beforeEach(() => {
        fetch.mockClear();
        store.dispatch({ type: 'reset' });
    })

    it('should send request', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({ requestState: 'pending', requestId: 5 }), { status: 200 }))

        const wrapper = createWrapper({ initialMessage: 'send', userId: 2 });
        await act(async() => wrapper.findByTestid('action').at(0).props().onClick());

        expect(store.getState().requests.data[2]).toEqual({
            id: 5,
            state: 'pending',
            error: null,
            chatWithUser: undefined,
            isLoading: false
        })
    })

    it('should accept request', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(chatWithUser), { status: 200 }))

        const wrapper = createWrapper({ initialMessage: 'accept', userId: 2, requestId: 5 });
        await act(async() => wrapper.findByTestid('accept').at(0).props().onClick());

        expect(store.getState().requests.data[2]).toEqual({
            id: 5,
            chatWithUser,
            state: 'completed',
            error: null,
            isLoading: false
        })
    })

    it('should deny request', async() => {
        fetch.mockImplementationOnce(() => new Response('done', { status: 200 }))

        const wrapper = createWrapper({ initialMessage: 'accept', userId: 2, requestId: 5 });
        await act(async() => wrapper.findByTestid('action').at(0).props().onClick());

        expect(store.getState().requests.data[2]).toEqual({
            id: 5,
            state: 'send',
            isLoading: false,
            chatWithUser: null,
            error: null
        })
    })

    it('should setCurrentChat', () => {
        const wrapper = createWrapper({ chatWithUser, initialMessage: 'completed' });
        wrapper.findByTestid('action').at(0).props().onClick();

        expect(store.getState().chats.data.currentChat).toEqual(chatWithUser);
    })

    it('should add chat after accept request has returned chatWithUser', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(chatWithUser), { status: 200 }))

        const wrapper = createWrapper({ initialMessage: 'accept' });
        await act(async() => wrapper.findByTestid('accept').at(0).props().onClick());

        expect(store.getState().chats.data.chats).toEqual([chatWithUser]);
    })

    it('should remove pending request', () => {
        fetch.mockImplementationOnce(() => new Response('done', { status: 200 }))

        const wrapper = createWrapper({ initialMessage: 'pending', userId: 2, requestId: 5 });
        wrapper.findByTestid('action').at(0).props().onClick();

        expect(store.getState().requests.data[2]).toEqual({
            state: 'send',
            id: 5,
            isLoading: false,
            chatWithUser: null,
            error: null
        })
    })
})