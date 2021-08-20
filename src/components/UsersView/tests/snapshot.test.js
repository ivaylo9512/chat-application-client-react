import UsersView from 'components/UsersView/UsersView';
import { shallow } from 'enzyme';

describe('UserChatsView snapshot tests', () => {    
    const createWrapper = () => shallow(<UsersView />)
    
    it('should match snapshot', () => {
        const wrapper = createWrapper();

        expect(wrapper).toMatchSnapshot();
    })
})