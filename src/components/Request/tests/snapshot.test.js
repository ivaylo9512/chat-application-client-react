import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import Request from 'components/Request/Request';

describe('Request snapshot tests', () => {
    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(jest.fn());
    })
    
    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);

        return shallow(
            <Request request={{ id: 1, createdAt: '2021-08-23', sender: { firstName: 'firstname', lastName: 'lastName', profileImage: 'image.png' }}}/>
        )
    }

    it('should match snapshot without request', () => {
        const wrapper = createWrapper(undefined);

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with loading request', () => {
        const wrapper = createWrapper({ isLoading: true });

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with chat', () => {
        const wrapper = createWrapper({ chatWithUser: true });

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with toggled info', () => {
        const wrapper = createWrapper({ chatWithUser: true });
        wrapper.findByTestid('toggleInfo').simulate('click');

        expect(wrapper).toMatchSnapshot();
    })
})