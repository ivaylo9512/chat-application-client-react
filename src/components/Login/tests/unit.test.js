import { loginRequest } from 'app/slices/authenticateSlice';
import { shallow } from 'enzyme';
import Login from '../Login';
import { Link } from 'react-router-dom';
import * as Redux from 'react-redux';

describe('Login unit tests', () => {
    let selectorSpy;
    let dispatchMock = jest.fn();

    beforeEach(() => {
        selectorSpy = jest.spyOn(Redux, 'useSelector');
    
        jest.spyOn(Redux, 'useDispatch').mockReturnValue(dispatchMock);
    });

    const createWrapper = (state) => {
        selectorSpy.mockReturnValue(state);
        return shallow(
            <Login />
        )
    }

    it('should render inputs', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        expect(wrapper.find('input').length).toBe(2);

        expect(wrapper.findByTestid('username').length).toBe(1); 
        expect(wrapper.findByTestid('password').length).toBe(1); 
    })

    it('should call dispatch login with input values', () => {
        const wrapper = createWrapper({ isLoading: false, error: null});

        wrapper.findByTestid('username').simulate('change', { target: { value: 'username'} });
        wrapper.findByTestid('password').simulate('change', { target: { value: 'password'} });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(dispatchMock).toHaveBeenCalledWith(loginRequest({ username: 'username', password: 'password'}));
    })
    
    it('should render error', () => {
        const wrapper = createWrapper({ isLoading: false, error: 'Bad credentials.' });

        expect(wrapper.findByTestid('error').text()).toBe('Bad credentials.');
    })

    it('should change input values', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        wrapper.findByTestid('username').simulate('change', { target: { value: 'username'} });
        wrapper.findByTestid('password').simulate('change', { target: { value: 'password'} });
        
        expect(wrapper.findByTestid('username').prop('value')).toBe('username'); 
        expect(wrapper.findByTestid('password').prop('value')).toBe('password'); 

    })

    it('should render button', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        expect(wrapper.findByTestid('login').length).toBe(1); 
        expect(wrapper.findByTestid('login').prop('type')).toBe('submit');
    })

    it('should render redirect', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        const redirect = wrapper.findByTestid('redirect');

        expect(redirect.find(Link).prop('to')).toBe('/register');
        expect(redirect.text()).toBe(`Don't have an account? Sign up.`);
    })
})