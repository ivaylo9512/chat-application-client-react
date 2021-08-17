import React from 'react';
import { mount } from 'enzyme';
import Register from '../../Register';
import { BrowserRouter as Router } from 'react-router-dom';
import authenticate, { registerRequest } from '../../../../app/slices/authenticateSlice';
import * as Redux from 'react-redux';
import registerWatcher from '../../../../app/sagas/register'
import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import createSaga from 'redux-saga';
import InputWithError from '../../../InputWithError';
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

const changeFirstPageInputs = (wrapper) => {
    let inputs = wrapper.find('input');

    inputs.findByTestid('username').simulate('change', { target: { value: 'username' } });
    inputs.findByTestid('email').simulate('change', { target: { value: 'email@gmail.com' } });
    inputs.findByTestid('password').simulate('change', { target: { value: 'password' } });
    inputs.findByTestid('repeatPassword').simulate('change', { target: { value: 'password' } });

    return wrapper.find('input');
}

const changeSecondPageInputs = (wrapper) => {
    let inputs = wrapper.find('input');
        
    inputs.findByTestid('firstName').simulate('change', { target: { value: 'firstName' } });
    inputs.findByTestid('lastName').simulate('change', { target: { value: 'lastName' } });
    inputs.findByTestid('country').simulate('change', { target: { value: 'country' } });
    inputs.findByTestid('age').simulate('change', { target: { value: 'age' } });

    return wrapper.find('input');
}

describe('Register integration tests', () => {
    it('should dispatch register return error change to page 0 and display errors', (done) => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(
            { username: 'Username is taken.', email: 'Email is taken.', password: 'Password must be atleast 10 characters.'}), { status: 422 }))

        const wrapper = createWrapper({ isLoading: false, error: null });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        setInterval(() => {
            wrapper.update();

            const usernameError = wrapper.findByTestid('usernameError');
            if(usernameError.length > 0){
                expect(usernameError.text()).toBe('Username is taken.')
                expect(wrapper.findByTestid('emailError').text()).toBe('Email is taken.')
                expect(wrapper.findByTestid('passwordError').text()).toBe('Password must be atleast 10 characters.')

                done();
            }
        }, 200)
    })

    it('should dispatch register return errors with page 1', (done) => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(
            { firstName: 'You must provide first name.', lastName: 'You must provide last name.', country: 'You must provide country.', age: 'You must provide age.'}), { status: 422 }))

        const wrapper = createWrapper({ isLoading: false, error: null });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        setInterval(() => {
            wrapper.update();

            const firstName = wrapper.findByTestid('firstNameError');
            if(firstName.length > 0){
                expect(firstName.text()).toBe('You must provide first name.')
                expect(wrapper.findByTestid('lastNameError').text()).toBe('You must provide last name.')
                expect(wrapper.findByTestid('countryError').text()).toBe('You must provide country.')
                expect(wrapper.findByTestid('ageError').text()).toBe('You must provide age.')

                done();
            }
        }, 200)
    })

    it('should change inputs values page 0', () => {
        const wrapper = createWrapper();

        const inputs = changeFirstPageInputs(wrapper);

        expect(inputs.findByTestid('username').length).toBe(1)
        expect(inputs.findByTestid('email').length).toBe(1);
        expect(inputs.findByTestid('password').length).toBe(1)
        expect(inputs.findByTestid('repeatPassword').length).toBe(1)
    })

    it('should change inputs values page 1', () => {
        const wrapper = createWrapper();
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        const inputs = changeSecondPageInputs(wrapper);

        expect(inputs.findByTestid('firstName').length).toBe(1)
        expect(inputs.findByTestid('lastName').length).toBe(1)
        expect(inputs.findByTestid('country').length).toBe(1)
        expect(inputs.findByTestid('age').length).toBe(1)
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

        expect(mockedDispatch).toHaveBeenCalledWith(registerRequest({username: 'username', email: 'email@gmail.com', password: 'password', firstName: 'firstName', lastName: 'lastName', country: 'country', age: 'age' }))
    })

});