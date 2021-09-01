import UserChat from 'components/UserChat/UserChat';
import chats from 'app/slices/chatsSlice';
import chatsWatcher from 'app/sagas/chats';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { createTestStore } from 'app/store';

const store = createTestStore({ reducers: { chats }, watchers: [ chatsWatcher ]})

const userChat = {
    id: 1, 
    createdAt:'2021-08-22', 
    secondUser: { 
        profileImage: 'image.png', 
        firstName: 'firstname', 
        lastName: 'lastName' 
    }
};

describe('UserChat integration tests', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <UserChat userChat={userChat}/>
            </Provider>
        )
    })

    beforeEach(() => {
        store.dispatch({ type: 'reset' });
    })

    it('should set current chat', async() => {
        await act(async() => wrapper.findByTestid('setChat').at(0).simulate('click'));

        expect(store.getState().chats.data.currentChat).toBe(userChat);
    })
})