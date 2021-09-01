import LoginWatcher from 'app/sagas/login'
import { Provider } from 'react-redux'
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import authenticate from 'app/slices/authenticateSlice'
import Login from '../Login';
import { act } from 'react-dom/test-utils';
import { BASE_URL } from 'appConstants';
import { createTestStore } from 'app/store';

const store = createTestStore({ reducers: { authenticate }, watchers: [ LoginWatcher ]});

global.fetch = jest.fn();

const createWrapper = () => {
    return mount(
        <Provider store={store}>
            <Router>
                <Login />
            </Router>
        </Provider>
    )
}

describe('Login integration tests', () => {
    beforeEach(() => {
        store.dispatch({ type: 'reset' });
    })

    it('should render error', async () => {
        fetch.mockImplementationOnce(() => new Response('Bad credentials.', { status: 401 }));

        const wrapper = createWrapper();

        wrapper.findByTestid('username').simulate('change', { target: { value: 'username' }});
        wrapper.findByTestid('password').simulate('change', { target: { value: 'password' }});
        
        await act(async() => wrapper.find('form').simulate('submit', { preventDefault: jest.fn()}));
        wrapper.update();

        expect(wrapper.findByTestid('error').text()).toBe('Bad credentials.');
    })

    it('should call fetch with data', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({}), { status: 200 }))

        const wrapper = createWrapper({ isLoading: false, error: null });
        
        wrapper.findByTestid('username').simulate('change', { target: { value: 'username' }});
        wrapper.findByTestid('password').simulate('change', { target: { value: 'password' }});
        
        await act(async() => wrapper.find('form').simulate('submit', { preventDefault: jest.fn()}));

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/users/login`, {
            body: JSON.stringify({username: 'username', password: 'password'}), 
            headers: {
                'Content-Type': 'Application/json'
            }, 
            method: 'POST'})
    })
})