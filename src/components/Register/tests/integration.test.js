import { mount } from 'enzyme';
import Register from '../Register';
import { BrowserRouter as Router } from 'react-router-dom';
import authenticate, { registerRequest } from 'app/slices/authenticateSlice';
import * as Redux from 'react-redux';
import registerWatcher from 'app/sagas/register'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSaga from 'redux-saga';
import { act } from 'react-dom/test-utils';

const { Provider } = Redux;

const sagaMiddleware = createSaga();
const middleware = [...getDefaultMiddleware({thunk: false}), sagaMiddleware];

const store = configureStore({
    reducer: {
        authenticate,
    },
    middleware
});

sagaMiddleware.run(function*(){
    yield registerWatcher
});

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

const user = { username: 'username', email: 'email@gmail.com', password: 'password', firstName: 'firstName', lastName: 'lastName', country: 'Bulgaria', age: '25' };

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
    it('should dispatch register return error change to page 0 and display errors', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(
            { username: 'Username is taken.', email: 'Email is taken.', password: 'Password must be atleast 10 characters.'}), { status: 422 }))

        const wrapper = createWrapper({ isLoading: false, error: null });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        
        await act(async() => wrapper.find('form').simulate('submit', { preventDefault: jest.fn()}));
        wrapper.update();

        expect(wrapper.findByTestid('usernameError').text()).toBe('Username is taken.')
        expect(wrapper.findByTestid('emailError').text()).toBe('Email is taken.')
        expect(wrapper.findByTestid('passwordError').text()).toBe('Password must be atleast 10 characters.')
    })

    it('should dispatch register return errors with page 1', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(
            { firstName: 'You must provide first name.', lastName: 'You must provide last name.', country: 'You must provide country.', age: 'You must provide age.'}), { status: 422 }))

        const wrapper = createWrapper({ isLoading: false, error: null });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        
        await act(async() => wrapper.find('form').simulate('submit', { preventDefault: jest.fn()}));
        wrapper.update();

        expect(wrapper.findByTestid('firstNameError').text()).toBe('You must provide first name.')
        expect(wrapper.findByTestid('lastNameError').text()).toBe('You must provide last name.')
        expect(wrapper.findByTestid('countryError').text()).toBe('You must provide country.')
        expect(wrapper.findByTestid('ageError').text()).toBe('You must provide age.')
    })

    it('should change inputs values page 0', () => {
        const wrapper = createWrapper();

        const inputs = changeFirstPageInputs(wrapper);

        expect(inputs.findByTestid('username').prop('value')).toBe(user.username);
        expect(inputs.findByTestid('email').prop('value')).toBe(user.email);
        expect(inputs.findByTestid('password').prop('value')).toBe(user.password);
        expect(inputs.findByTestid('repeatPassword').prop('value')).toBe(user.password);
    })

    it('should change inputs values page 1', () => {
        const wrapper = createWrapper();
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        const inputs = changeSecondPageInputs(wrapper);

        expect(inputs.findByTestid('firstName').prop('value')).toBe(user.firstName);
        expect(inputs.findByTestid('lastName').prop('value')).toBe(user.lastName);
        expect(inputs.findByTestid('country').prop('value')).toBe(user.country);
        expect(inputs.findByTestid('age').prop('value')).toBe(user.age);
    })

    it('should call fetch with data', async() => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify({}), { status: 200 }))

        const wrapper = createWrapper({ isLoading: false, error: null });
        
        changeFirstPageInputs(wrapper);
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        
        changeSecondPageInputs(wrapper);
        await act(async() => wrapper.find('form').simulate('submit', { preventDefault: jest.fn()}));

        expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/users/register', {body: JSON.stringify(user), headers: {'Content-Type': 'Application/json'}, method: 'POST'})
    })

    it('should call dispatch with user object with input values', () => {
        const useDispatchSpy = jest.spyOn(Redux, 'useDispatch'); 
        const mockedDispatch = jest.fn()
        useDispatchSpy.mockReturnValue(mockedDispatch);

        const wrapper = createWrapper();
        
        changeFirstPageInputs(wrapper);
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        
        changeSecondPageInputs(wrapper);
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(mockedDispatch).toHaveBeenCalledWith(registerRequest(user))
    })
});