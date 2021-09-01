import userChats from 'app/slices/userChatsSlice';
import UserChatsList from 'components/UserChatsList/UserChatsList';
import { Provider } from 'react-redux';
import UserChat from 'components/UserChat/UserChat';
import { mount } from 'enzyme';
import { createTestStore } from 'app/store';

const data = [{ 
    id: 1, 
    secondUser: { 
        firstName: 'first', 
        lastName: 'first' 
    }}, { 
        id: 2, 
        secondUser: { 
            firstName: 'second', 
            lastName: 'second' 
        }
    }
];

const store = createTestStore({ 
    reducers: { userChats },
    preloadedState: {
        userChats: {
            dataInfo: {
                pages: 0,
                maxPages: 0,
                data: data,
                lastData: data[0][1],
                currentData: data
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
});


describe('UserChatsList integration tests', () => {
    const createWrapper = () => mount(
        <Provider store={store}>
            <UserChatsList />
        </Provider>
    )

    beforeEach(() => {
        store.dispatch({ type: 'reset' });
    })
    
    it('should render users', () => {
        const wrapper = createWrapper();

        const userChats = wrapper.find(UserChat);
        
        expect(userChats.length).toBe(2);
        expect(userChats.at(0).key()).toBe('1');
        expect(userChats.at(1).key()).toBe('2');
        expect(userChats.at(0).prop('userChat')).toBe(data[0]);
        expect(userChats.at(1).prop('userChat')).toBe(data[1]);
    })
})