import React from 'react';
import { getRegisterRequest } from '../../../../app/slices/authenticateSlice';
import Register from '../../Register';
import { shallow } from 'enzyme';
import InputWithError from '../../../InputWithError';
import { Link } from 'react-router-dom';
import ReactWrapper from 'enzyme/ReactWrapper';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(fn => fn()),
    useDispatch: jest.fn()
}))
jest.mock('../../../../app/slices/authenticateSlice')
const createWrapper = (value) => {
    getRegisterRequest.mockReturnValue(value);
    return shallow(<Register />)
}

describe('unit tests for Register', () =>{

    it('should render inputs, with page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        const inputs = wrapper.find(InputWithError);

        expect(inputs.length).toEqual(4);
        expect(wrapper.find('button').text()).toBe('next');

        expect(wrapper.findByTestid('usernameContainer').prop('input').props['data-testid']).toBe('username');
        expect(wrapper.findByTestid('emailContainer').prop('input').props.name).toBe('email');
        expect(wrapper.findByTestid('passwordContainer').prop('input').props.children[0].props.name).toBe('password');
        expect(wrapper.findByTestid('repeatPasswordContainer').prop('input').props.children[0].props.name).toBe('repeatPassword');
    })

    it('should render inputs with page 1', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
     
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        const inputs = wrapper.find(InputWithError);
        const buttons = wrapper.find('button');

        expect(inputs.length).toEqual(4);
        expect(buttons.at(0).text()).toBe('back');
        expect(buttons.at(1).text()).toBe('register');

        expect(wrapper.findByTestid('firstNameContainer').prop('input').props.name).toBe('firstName');
        expect(wrapper.findByTestid('lastNameContainer').prop('input').props.name).toBe('lastName');
        expect(wrapper.findByTestid('countryContainer').prop('input').props.name).toBe('country');
        expect(wrapper.findByTestid('ageContainer').prop('input').props.name).toBe('age');
    })

    it('should render inputs with page 1 when back button is clicked', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })
        wrapper.find('button').at(0).simulate('click', { preventDefault: jest.fn() });

        const inputs = wrapper.find(InputWithError);
        expect(wrapper.find(InputWithError).length).toEqual(4);
        expect(wrapper.find('button').text()).toBe('next');
        
        expect(wrapper.findByTestid('usernameContainer').prop('input').props.name).toBe('username');
        expect(wrapper.findByTestid('emailContainer').prop('input').props.name).toBe('email');
        expect(wrapper.findByTestid('passwordContainer').prop('input').props.children[0].props.name).toBe('password');
        expect(wrapper.findByTestid('repeatPasswordContainer').prop('input').props.children[0].props.name).toBe('repeatPassword');
    })

    it('should render with passed error props with page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: { username: 'Username is already taken.', password: 'Password must be between 10 and 20 characters.', email: 'Email is already taken.' }});
        const inputs = wrapper.find(InputWithError);
        
        expect(wrapper.findByTestid('usernameContainer').prop('error')).toBe('Username is already taken.');
        expect(wrapper.findByTestid('emailContainer').prop('error')).toBe('Email is already taken.');
        expect(wrapper.findByTestid('passwordContainer').prop('error')).toBe('Password must be between 10 and 20 characters.');
    })

    it('should render with passed error props with page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: { firstName: 'First name is required.', lastName: 'Last name is required.', country: 'Country is invalid.', age: 'Age is required.' }});
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })
      
        const inputs = wrapper.find(InputWithError);
        
        expect(wrapper.findByTestid('firstNameContainer').prop('error')).toBe('First name is required.');
        expect(wrapper.findByTestid('lastNameContainer').prop('error')).toBe('Last name is required.');
        expect(wrapper.findByTestid('countryContainer').prop('error')).toBe('Country is invalid.');
        expect(wrapper.findByTestid('ageContainer').prop('error')).toBe('Age is required.');
    })

    it('should render redirect', () => {
        const wrapper = createWrapper({ isLoading: false, error: null })

        const span = wrapper.find('span');
        const link = wrapper.find(Link);

        expect(span.text()).toBe('Already have an account? Sign in.');
        expect(link.prop('to')).toBe('/login')
    })
})