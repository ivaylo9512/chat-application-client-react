import React from 'react';
import { mount } from 'enzyme';
import Register from '../../Register';
import { BrowserRouter as Router } from 'react-router-dom';
import authenticate, { registerRequest } from '../../../../app/slices/authenticateSlice';
import * as Redux from 'react-redux';
const { Provider } = Redux;

const store = configureStore({
    reducer: {
        authenticate
    }
})

const createWrapper = () => {
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
        const wrapper = createWrapper();

        const inputs = changeFirstPageInputs(wrapper);

        expect(inputs.findByTestid('username').prop('value')).toBe('username');
        expect(inputs.findByTestid('email').prop('value')).toBe('email@gmail.com');
        expect(inputs.findByTestid('password').prop('value')).toBe('password');
        expect(inputs.findByTestid('repeatPassword').prop('value')).toBe('password');
    })

    it('should change inputs values page 1', () => {
        const wrapper = createWrapper();
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        const inputs = changeSecondPageInputs(wrapper);

        expect(inputs.findByTestid('firstName').prop('value')).toBe('firstName');
        expect(inputs.findByTestid('lastName').prop('value')).toBe('lastName');
        expect(inputs.findByTestid('country').prop('value')).toBe('country');
        expect(inputs.findByTestid('age').prop('value')).toBe('age');
    })
});