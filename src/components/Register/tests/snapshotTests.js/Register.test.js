import React from 'react';
import Register from '../../Register';
import { shallow } from 'enzyme';
import { getRegisterRequest } from '../../../../app/slices/authenticateSlice';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(fn => fn()),
    useDispatch: () => jest.fn(),
}));

jest.mock('../../../../app/slices/authenticateSlice');

const createWrapper = (state) => {
    getRegisterRequest.mockReturnValue(state);
    return shallow(<Register /> )
}
describe("RegisterSnapshotTests", () => {
    it('renders correctly page 0', () => {
        const wrapper = createWrapper({isLoading: false, error: null});
     
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly page 1', () => {
        const wrapper = createWrapper({isLoading: false, error: null});
    
        const form = wrapper.find('form');
        form.simulate('submit', { target: form, preventDefault: jest.fn() });

        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with passed errors props and page 0', () => {
        const wrapper = createWrapper({isLoading: false, error: {username: 'Username is already taken.', password: 'Password must be between 10 and 20 characters.', email: 'Email is already taken.'}});

        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with passed errors props and page 1', () => {
        const wrapper = createWrapper({isLoading: false, error: {country: 'Country is invalid.', age: 'Age is required.', firstName: 'First name is required.', lastName: 'Last name is required.'}});

        const form = wrapper.find('form');
        form.simulate('submit', { target: form, preventDefault: jest.fn() });

        expect(wrapper).toMatchSnapshot();
    });
});