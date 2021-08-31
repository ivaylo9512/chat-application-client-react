import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Chat from 'components/Chat/Chat';
import chats from 'app/slices/chatsSlice';
import { ChatNode } from 'components/Chat/ChatStyles';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import chatsWatcher from 'app/sagas/chats';
import { createTestStore } from 'app/store';

const store = createTestStore({ reducers: { chats }, watchers: [ chatsWatcher ]});

global.fetch = jest.fn();

const chat = { 
    id: 1, 
    lastMessage: 'last message', 
    secondUser: { 
        firstName: 'first', 
        lastName: 'last', 
        profileImage: 'image1.png'
    } 
};

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

    beforeEach(() => {
        store.dispatch({ type: 'reset' })
    })

    it('should set current chat', () => {
        wrapper.find(ChatNode).simulate('click');

        expect(store.getState().chats.data.currentChat).toBe(chat);
    })
})