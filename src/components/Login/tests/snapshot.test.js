import React from 'react';
import Login from '../Login';
import { shallow } from 'enzyme';
import { getLoginRequest } from '../../../app/slices/authenticateSlice';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(fn => fn()),
    useDispatch: () => jest.fn(),
}));

jest.mock('../../../app/slices/authenticateSlice');

const createWrapper = (state) => {
    getLoginRequest.mockReturnValue(state);
    return shallow(<Login /> )
}
describe("Login snapshot tests", () => {
    it('renders correctly', () => {
        const wrapper = createWrapper({isLoading: false, error: null});
     
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with passed errors props', () => {
        const wrapper = createWrapper({isLoading: false, error: 'Bad credentials.'});

        expect(wrapper).toMatchSnapshot();
    });
});