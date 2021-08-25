import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import Request from 'components/Request/Request';

describe('Request snapshot tests', () => {
    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);

        return shallow(
            <Request request={{ id: 1, createdAt: '2021-08-23', sender: { firstName: 'firstname', lastName: 'lastName', profileImage: 'image.png' }}}/>
        )
    }

    it('should match snapshot', () => {
        const wrapper = createWrapper();

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with toggled info', () => {
        const wrapper = createWrapper();
        wrapper.findByTestid('toggleInfo').props().onClick();

        expect(wrapper).toMatchSnapshot();
    })
})