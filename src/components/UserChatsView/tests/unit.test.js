import UserChatsView from 'components/UserChatsView/UserChatsView';
import { shallow } from 'enzyme';
import * as redux from 'react-redux';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import Pagination from "components/Pagination/Pagination"

describe('UserChatsView unit tests', () => {
    let wrapper;

    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);
        jest.spyOn(redux, 'useDispatch').mockReturnValue(jest.fn());
     
        wrapper = shallow(
            <UserChatsView />
        )
    }

    it('should render LoadingIndicator', () => {
        createWrapper({ isLoading: true });
        
        expect(wrapper.find(LoadingIndicator).exists()).toBe(true)
        expect(wrapper.find(Pagination).exists()).toBe(false)
    })

    it('should render Pagination', () => {
        createWrapper({ isLoading: false });
        
        expect(wrapper.find(LoadingIndicator).exists()).toBe(false)
        expect(wrapper.find(Pagination).exists()).toBe(true)
    })

    it('should render error', () => {
        createWrapper({ error: 'Unavailable' });
        
        expect(wrapper.findByTestid('error').text()).toBe('Unavailable')
    })
})