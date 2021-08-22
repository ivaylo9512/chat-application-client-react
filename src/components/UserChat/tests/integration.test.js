import createSaga from 'redux-saga';
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import UserChat from 'components/UserChat/UserChat';
import chats from 'app/slices/chatsSlice';
import chatsWatcher from 'app/sagas/chats';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

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

const userChat = {id: 1, createdAt:'2021-08-22', secondUser: { profileImage: 'image.png', firstName: 'firstname', lastName: 'lastName' }};
describe('UserChat integration tests', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <Provider store={store}>
                <UserChat userChat={userChat}/>
            </Provider>
        )
    })

    it('should set current chat', () => {
        wrapper.findByTestid('setChat').at(0).simulate('click');

        expect(store.getState().chats.currentChat).toBe(userChat);
    })
})