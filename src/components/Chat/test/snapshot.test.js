import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import Chat from 'components/Chat/Chat';

describe('Chat snapshot tests', () => {
    let wrapper;

    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(jest.fn());
    
        wrapper = shallow(<Chat chat={{id: 1, lastMessage: 'last message', secondUser: { firstName: 'first', lastName: 'last', profileImage: 'image1.png'} }}/>)
    })

    it('should rednder with snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })

})