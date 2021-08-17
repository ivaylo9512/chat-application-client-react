import React from 'react';
import { getRegisterRequest } from '../../../../app/slices/authenticateSlice';
import Register from '../../Register';
import { shallow } from 'enzyme';
import InputWithError from '../../../InputWithError';
import { Link } from 'react-router-dom';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(fn => fn()),
    useDispatch: jest.fn()
}));

jest.mock('../../../../app/slices/authenticateSlice')

const createWrapper = (value) => {
    getRegisterRequest.mockReturnValue(value);
    return shallow(<Register />)
}

describe('unit tests for Register', () =>{
    it('should render inputs, with page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        
        expect(wrapper.find(InputWithError).length).toEqual(4);
        expect(wrapper.findByTestid('usernameContainer').length).toBe(1);
        expect(wrapper.findByTestid('emailContainer').length).toBe(1);
        expect(wrapper.findByTestid('passwordContainer').length).toBe(1);
        expect(wrapper.findByTestid('repeatPasswordContainer').length).toBe(1);
    })

    it('should render inputs with page 1', () => {
        const wrapper = createWrapper({ isLoading: false, error: { firstName: 'First name is required.', lastName: 'Last name is required.', birth: 'Birth is required.' }});
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn()});

        expect(wrapper.find(InputWithError).length).toEqual(4);
        expect(wrapper.findByTestid('firstNameContainer').length).toBe(1);
        expect(wrapper.findByTestid('lastNameContainer').length).toBe(1);
        expect(wrapper.findByTestid('countryContainer').length).toBe(1);
        expect(wrapper.findByTestid('ageContainer').length).toBe(1);

    })

    it('should render inputs with page 0 when back button is clicked', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })
        wrapper.findByTestid('back').simulate('click', { preventDefault: jest.fn() });

        expect(wrapper.findByTestid('usernameContainer').length).toBe(1);
        expect(wrapper.findByTestid('emailContainer').length).toBe(1);
        expect(wrapper.findByTestid('passwordContainer').length).toBe(1);
        expect(wrapper.findByTestid('repeatPasswordContainer').length).toBe(1);
    })

    it('should render with passed error props with page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: { username: 'Username is already taken.', password: 'Password must be between 10 and 20 characters.', email: 'Email is already taken.' }});
        
        expect(wrapper.findByTestid('usernameContainer').prop('error')).toBe('Username is already taken.');
        expect(wrapper.findByTestid('emailContainer').prop('error')).toBe('Email is already taken.');
        expect(wrapper.findByTestid('passwordContainer').prop('error')).toBe('Password must be between 10 and 20 characters.');
    })

    it('should render with passed error props with page 1', () => {
        const wrapper = createWrapper({ isLoading: false, error: { firstName: 'First name is required.', lastName: 'Last name is required.', country: 'Country is invalid.', age: 'Age is required.' }});
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })
      
        expect(wrapper.findByTestid('firstNameContainer').prop('error')).toBe('First name is required.');
        expect(wrapper.findByTestid('lastNameContainer').prop('error')).toBe('Last name is required.');
        expect(wrapper.findByTestid('countryContainer').prop('error')).toBe('Country is invalid.');
        expect(wrapper.findByTestid('ageContainer').prop('error')).toBe('Age is required.');
    })

    it('should render button page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        expect(wrapper.findByTestid('next').length).toBe(1);
        expect(wrapper.findByTestid('next').prop('type')).toBe('submit');
    })

    it('should render buttons with page 1', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(wrapper.findByTestid('back').length).toBe(1);
        expect(wrapper.findByTestid('register').length).toBe(1);
        expect(wrapper.findByTestid('register').prop('type')).toBe('submit');
    })

    it('should render redirect', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        const redirect = wrapper.findByTestid('redirect');

        expect(redirect.text()).toBe('Already have an account? Sign in.');
        expect(redirect.find(Link).text()).toBe(' Sign in.');
        expect(redirect.find(Link).prop('to')).toBe('/login');
    })
})