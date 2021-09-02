import chats from 'app/slices/chatsSlice';
import requests from 'app/slices/requestsSlice';
import requestsWatcher from 'app/sagas/sendRequest';
import acceptRequestWatcher from 'app/sagas/acceptRequest';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Request from 'components/Request/Request';
import { BASE_URL } from 'appConstants';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { createTestStore } from 'app/store';

const store = createTestStore({ 
    reducers: { chats, requests }, 
    watchers: [ requestsWatcher, acceptRequestWatcher ]
})

global.fetch = jest.fn();

const chatWithUser = {
    id: 1, 
    lastMessage: 'last message', 
    secondUser: { 
        firstName: 'first', 
        lastName: 'last', 
        profileImage: 'image1.png'
    } 
};
describe('Request integration tests', () => {
    const createWrapper = (request) => {
        request = {
            ...request,
            createdAt: '2021-08-23',
            sender: { 
                id: 5, 
                firstName: 'firstname', 
                lastName: 'lastName', 
                profileImage: 'image.png' 
            }
        }
        return mount(
            <Provider store={store}>
                <MemoryRouter>
                    <Request request={ request }/>
                </MemoryRouter>
            </Provider>
     )
}

    beforeEach(() => {
        store.dispatch({ type: 'reset' });
    })

    it('should pass requestId and action prop and call fetch', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(chatWithUser), { status: 200 }));
        
        const wrapper = createWrapper({ id: 1 });
        await act(async () => wrapper.findByTestid('accept').at(0).props().onClick());

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/requests/auth/accept/1`, {
            method: 'POST',
            headers: {
                Authorization: null
            }
        })
    })

    it('should pass userId prop and update store with request', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(chatWithUser), { status: 200 }));
        
        const wrapper = createWrapper({ id: 2 });
        await act(async () => wrapper.findByTestid('accept').at(0).props().onClick());

        expect(store.getState().requests.data[5]).toEqual({ 
            isLoading: false, 
            chatWithUser, id: 2, 
            state: 'completed', 
            error: null 
        });
    })

    it('should update store with chat', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(chatWithUser), { status: 200 }));
       
        const wrapper = createWrapper({ id: 3 });
        await act(async () => wrapper.findByTestid('accept').at(0).props().onClick());

        expect(store.getState().chats.data.chats[0]).toStrictEqual(chatWithUser);
    })
})