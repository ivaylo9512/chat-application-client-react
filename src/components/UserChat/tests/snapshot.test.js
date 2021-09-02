import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import UserChat from 'components/UserChat/UserChat';

describe('UserChat snapshot tests', () => {
    let wrapper;

    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(jest.fn());

        wrapper = shallow(<UserChat userChat={{id: 1, createdAt:'2021-08-22', secondUser: { profileImage: 'image.png', firstName: 'firstname', lastName: 'lastName' }}}/>)
    })

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with toggled info', () => {
        wrapper.findByTestid('toggleInfo').props().onClick();
        expect(wrapper).toMatchSnapshot();
    })
})