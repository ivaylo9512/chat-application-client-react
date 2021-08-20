import UserChatsView from 'components/UserChatsView/UserChatsView';
import { shallow } from 'enzyme';

describe('UserChatsView snapshot tests', () => {    
    const createWrapper = () => shallow(<UserChatsView />)
    
    it('should match snapshot', () => {
        const wrapper = createWrapper();

        expect(wrapper).toMatchSnapshot();
    })
})