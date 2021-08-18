import Login from '../Login';
import { shallow } from 'enzyme';
import * as Redux from 'react-redux';

describe('Login snapshot tests', () => {
    let selectorSpy;

    beforeAll(() => {
        selectorSpy = jest.spyOn(Redux, 'useSelector');
    
        const spyOnUseDispatch = jest.spyOn(Redux, 'useDispatch');
        spyOnUseDispatch.mockReturnValue(jest.fn());
    });

    const createWrapper = (state) => {
        selectorSpy.mockReturnValue(state);
        return shallow(
            <Login />
        )
    }

    it('renders correctly', () => {
        const wrapper = createWrapper({isLoading: false, error: null});
     
        expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with passed errors props', () => {
        const wrapper = createWrapper({isLoading: false, error: 'Bad credentials.'});

        expect(wrapper).toMatchSnapshot();
    });
});