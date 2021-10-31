import UserChatsView from 'components/UserChatsView/UserChatsView';
import { shallow } from 'enzyme';
import * as redux from 'react-redux'
describe('UserChatsView snapshot tests', () => {    
    let wrapper;

    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);
        jest.spyOn(redux, 'useDispatch').mockReturnValue(jest.fn());
     
        wrapper = shallow(
            <UserChatsView />
        )
    }

    it('should match snapshot', () => {
        createWrapper({ isLoading: false });

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with loading request', () => {
        createWrapper({ isLoading: true });

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with error', () => {
        createWrapper({ isLoading: false, error: 'Unavailable' });

        expect(wrapper).toMatchSnapshot();
    })
})