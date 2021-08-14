import React from 'react';
import { mount } from 'enzyme';
import Register from '../../Register';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authenticate, { registerRequest } from '../../../../app/slices/authenticateSlice';
import * as Redux from 'react-redux';
const { Provider } = Redux;

const store = configureStore({
    reducer: {
        authenticate
    }
})

const createWrapper = (value) => {
    return mount(
        <Provider store={store}>
            <Router>
                <Register />
            </Router>
        </Provider>
    )
}

describe('Register integration tests', () => {

    it('should change inputs values page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        let inputs = wrapper.find('input');

        inputs.find('#username').simulate('change', { target: { value: 'username' } });
        inputs.find('#email').simulate('change', { target: { value: 'email@gmail.com' } });
        inputs.find('#password').simulate('change', { target: { value: 'password' } });
        inputs.find('#repeatPassword').simulate('change', { target: { value: 'password' } });
        inputs = wrapper.find('input');

        expect(inputs.find('#username').prop('value')).toBe('username');
        expect(inputs.find('#email').prop('value')).toBe('email@gmail.com');
        expect(inputs.find('#password').prop('value')).toBe('password');
        expect(inputs.find('#repeatPassword').prop('value')).toBe('password');
    })

    it('should change inputs values page 1', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        let inputs = wrapper.find('input');
        
        inputs.find('#firstName').simulate('change', { target: { value: 'firstName' } });
        inputs.find('#lastName').simulate('change', { target: { value: 'lastName' } });
        inputs.find('#country').simulate('change', { target: { value: 'country' } });
        inputs.find('#age').simulate('change', { target: { value: 'age' } });
        inputs = wrapper.find('input');

        expect(inputs.find('#firstName').prop('value')).toBe('firstName');
        expect(inputs.find('#lastName').prop('value')).toBe('lastName');
        expect(inputs.find('#country').prop('value')).toBe('country');
        expect(inputs.find('#age').prop('value')).toBe('age');
    })
});