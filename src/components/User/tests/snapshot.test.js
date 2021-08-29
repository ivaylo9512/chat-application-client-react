import User from 'components/User/User';
import { shallow } from 'enzyme';
import * as redux from 'react-redux';

describe('User snapshot tests', () => {
    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);
        
        return shallow(
            <User user={{ firstName: 'First', lastName: 'Last', profilePicture: 'image.png', chatWithUser: false, image: 'image.png', requestState: 'send', requestId: 4, chatWithUser:{ id: 5 } }}/> 
        )
    }

    it('should render snapshot', () => {
        const wrapper = createWrapper();

        expect(wrapper).toMatchSnapshot();
    })

    it('should render snapshot with request error', () => {
        const wrapper = createWrapper('Request not found.');

        expect(wrapper).toMatchSnapshot();
    })
})