import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import ChatList from 'components/ChatList/ChatList';
import Chat from 'components/Chat/Chat';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import { LoadingContainer } from 'components/ChatList/ChatListStyle'

const chats = [ { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 } ];

describe('ChatList unit tests', () => {
    let dispatchMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchMock);
    })
    
    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);

        return shallow(<ChatList />)
    }

    it('should render Chats', () => {
        const wrapper = createWrapper({ isLoading: false, data: { chats, isLastPage: true }});

        const foundChats = wrapper.find(Chat);
        expect(foundChats.length).toBe(4);

        expect(foundChats.at(0).prop('chat')).toBe(chats[0])
        expect(foundChats.at(1).prop('chat')).toBe(chats[1])

        expect(foundChats.at(0).key()).toBe('5')
        expect(foundChats.at(1).key()).toBe('6')
    })

    it('should render LoadingContainer when loading adn empty array', () => {
        const wrapper = createWrapper({ isLoading: true, data: { chats: [], isLastPage: false }});

        expect(wrapper.find(LoadingContainer).length).toBe(1);
    })

    it('should render info when empty chats array and not loading ', () => {
        const wrapper = createWrapper({ isLoading: false, data: { chats: [], isLastPage: false }});

        expect(wrapper.findByTestid('info').length).toBe(1);
    })

    it('should render more button when lastPage is false', () => {
        const wrapper = createWrapper({ isLoading: false, data: { chats, isLastPage: false }});

        expect(wrapper.findByTestid('more').length).toBe(1);
    })

    it('should render LoadingIndicator in button when data', () => {
        const wrapper = createWrapper({ isLoading: true, data: { chats, isLastPage: false }});

        expect(wrapper.find(LoadingContainer).length).toBe(0);
        expect(wrapper.find(LoadingIndicator).length).toBe(1);
    })

})