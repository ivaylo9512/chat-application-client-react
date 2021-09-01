import User from 'components/User/User';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import { mount } from 'enzyme';
import requests from 'app/slices/requestsSlice'
import chats from 'app/slices/chatsSlice'
import acceptWatcher from 'app/sagas/acceptRequest'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils'
import { BASE_URL } from 'appConstants';
import { createTestStore } from 'app/store';

const store = createTestStore({ 
    reducers: { requests, chats }, 
    watchers: [ acceptWatcher ],
    preloadedState: {
        requests: {
            data: {
                6: {
                    isLoading: true
                }
            }
        },
    }
})

global.fetch = jest.fn();


describe('User integration tests', () => {
    const createWrapper = (user) => mount(
        <Provider store={store}>
            <MemoryRouter>
                <User page={1} user={{firstName: 'First', lastName: 'Last', profilePicture: 'image.png', ...user }}/>
            </MemoryRouter>
        </Provider>
    )

    beforeEach(() => {
        store.dispatch({ type: 'reset' });
    })

    it('should pass requestId prop and call fetch with acceptRequest', async() => {
        const chatWithUser = { id: 1, secondUser: { firstName: 'firstname', lastName: 'lastname' }};
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(chatWithUser), { status: 200 }))
        
        const wrapper = createWrapper({ id: 5, chatWithUser: false, requestState: 'accept', requestId: 8 });
        await act(async() => wrapper.findByTestid('accept').at(0).simulate('click'));

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/requests/auth/accept/8`,{
            method: 'POST',
            headers: {
                Authorization: null
            },
        });
    })
    
    it('should pass userId prop and render LoadingIndicator when user has request', async() => {
        const wrapper = createWrapper({ id: 6 });

        expect(wrapper.find(LoadingIndicator).exists()).toBe(true);
    })

    it('should pass userId and intitalMessage prop and set current chat', async() => {
        const chatWithUser = { id: 2, secondUser: { firstName: 'firstname', lastName: 'lastname' }};
        const wrapper = createWrapper({ id: 7, chatWithUser, requestState: 'completed' });
        await act(async() => wrapper.findByTestid('action').at(0).simulate('click'));

        expect(store.getState().chats.data.currentChat).toBe(chatWithUser);
    })
})