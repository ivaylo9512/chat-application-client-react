import createSaga from 'redux-saga';
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Chat from 'components/Chat/Chat';
import chats from 'app/slices/chatsSlice';
import { ChatNode } from 'components/Chat/ChatStyles';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import chatsWatcher from 'app/sagas/chats';

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


const chat = {id: 1, lastMessage: 'last message', secondUser: { firstName: 'first', lastName: 'last', profileImage: 'image1.png'} };
describe('Chat integration tests', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <Router history={createMemoryHistory()}>
                    <Chat chat={chat}/>
                </Router>
            </Provider>
        )
    })

    it('should set current chat', () => {
        wrapper.find(ChatNode).simulate('click');

        const currentChat = store.getState().chats.currentChat;

        expect(currentChat).toBe(chat);
    })
})