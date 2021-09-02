import { mount } from 'enzyme';
import Register from '../Register';
import { BrowserRouter as Router } from 'react-router-dom';
import authenticate, { registerRequest } from 'app/slices/authenticateSlice';
import * as Redux from 'react-redux';
import registerWatcher from 'app/sagas/register'
import { act } from 'react-dom/test-utils';
import { BASE_URL } from 'appConstants';
import { createTestStore } from 'app/store';

const { Provider } = Redux;

const store = createTestStore({ reducers: { authenticate }, watchers: [ registerWatcher ]})

global.fetch = jest.fn();

const createWrapper = () => {
    return mount(
        <Provider store={store}>
            <Router>
                <Register />
            </Router>
        </Provider>
    )
}

const user = { 
    username: 'username', 
    email: 'email@gmail.com', 
    password: 'password', 
    firstName: 'firstName', 
    lastName: 'lastName', 
    country: 'Bulgaria', 
    age: '25' 
};

const changeFirstPageInputs = (wrapper) => {
    let inputs = wrapper.find('input');

    inputs.findByTestid('username').simulate('change', { target: { value: user.username } });
    inputs.findByTestid('email').simulate('change', { target: { value: user.email } });
    inputs.findByTestid('password').simulate('change', { target: { value: user.password } });
    inputs.findByTestid('repeatPassword').simulate('change', { target: { value: user.password } });

    return wrapper.find('input');
}

const changeSecondPageInputs = (wrapper) => {
    let inputs = wrapper.find('input');
        
    inputs.findByTestid('firstName').simulate('change', { target: { value: user.firstName } });
    inputs.findByTestid('lastName').simulate('change', { target: { value: user.lastName } });
    inputs.findByTestid('country').simulate('change', { target: { value: user.country } });
    inputs.findByTestid('age').simulate('change', { target: { value: user.age } });

    return wrapper.find('input');
}

describe('Register integration tests', () => {
    beforeEach(() => {
        store.dispatch({ type: 'reset' });
    })
    it('should return errors and change to page 0', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(
            { username: 'Username is taken.', email: 'Email is taken.', password: 'Password must be atleast 10 characters.'}), { status: 422 }))

        const wrapper = createWrapper({ isLoading: false, error: null });

        await act(async() => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn() }));
        wrapper.update();

        await act(async() => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn() }));
        wrapper.update();

        expect(wrapper.findByTestid('usernameError').text()).toBe('Username is taken.')
        expect(wrapper.findByTestid('emailError').text()).toBe('Email is taken.')
        expect(wrapper.findByTestid('passwordError').text()).toBe('Password must be atleast 10 characters.')
    })

    it('should return errors with page 1', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(
            { firstName: 'You must provide first name.', lastName: 'You must provide last name.', country: 'You must provide country.', age: 'You must provide age.'}), { status: 422 }))

        const wrapper = createWrapper({ isLoading: false, error: null });
        
        await act(async() => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn() }));
        wrapper.update();
        
        await act(async() => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn() }));
        wrapper.update();

        expect(wrapper.findByTestid('firstNameError').text()).toBe('You must provide first name.')
        expect(wrapper.findByTestid('lastNameError').text()).toBe('You must provide last name.')
        expect(wrapper.findByTestid('countryError').text()).toBe('You must provide country.')
        expect(wrapper.findByTestid('ageError').text()).toBe('You must provide age.')
    })

    it('should call fetch with data', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({}), { status: 200 }))

        const wrapper = createWrapper({ isLoading: false, error: null });
        
        changeFirstPageInputs(wrapper);
        
        await act(async() => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn() }));
        wrapper.update();
        
        changeSecondPageInputs(wrapper);
        await act(async() => wrapper.find('form').props().onSubmit({ preventDefault: jest.fn() }));

        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/users/register`, {
            body: JSON.stringify(user), 
            headers: {
                'Content-Type': 'Application/json'
            }, 
            method: 'POST'
        })
    })
});