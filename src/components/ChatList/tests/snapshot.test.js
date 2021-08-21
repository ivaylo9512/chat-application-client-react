import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import ChatList from 'components/ChatList/ChatList';

describe('ChatList snapshot tests', () => {
    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(jest.fn());
    })

    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);

        return shallow(<ChatList />)
    }

    it('should render Chats', () => {
        const wrapper = createWrapper({ isLoading: false, data: { chats: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 } ], isLastPage: true }});

        expect(wrapper).toMatchSnapshot();
    })

    it('should render LoadingIndicator when loading', () => {
        const wrapper = createWrapper({ isLoading: true, data: { chats: [], isLastPage: false }});

        expect(wrapper).toMatchSnapshot();
    })

    it('should render info when empty chats array and not loading ', () => {
        const wrapper = createWrapper({ isLoading: false, data: { chats: [], isLastPage: false }});

        expect(wrapper).toMatchSnapshot();
    })

    it('should render Chats and more button when lastPage is false', () => {
        const wrapper = createWrapper({ isLoading: false, data: { chats: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 } ], isLastPage: false }});

        expect(wrapper).toMatchSnapshot();
    })
})