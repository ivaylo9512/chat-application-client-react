import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import Request from 'components/Request/Request';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import { setCurrentChat } from 'app/slices/chatsSlice';
import { acceptRequest } from 'app/slices/requestsSlice';
import { Info } from 'components/Request/RequestStyle';
import 'jest-styled-components';
import reactRouterDom from 'react-router-dom';

jest.mock('react-router-dom')

const chatWithUser = {id: 1, lastMessage: 'last message', secondUser: { firstName: 'first', lastName: 'last', profileImage: 'image1.png'} };
describe('Request unit tests', () => {
    let dispatchMock = jest.fn();
    let pushMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchMock);
        reactRouterDom.useHistory = jest.fn().mockReturnValue({push: pushMock});
    })
    
    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);

        return shallow(
            <Request request={{ id: 5, createdAt: '2021-08-23', sender: { firstName: 'firstname', lastName: 'lastName', profileImage: 'image.png' }}}/>
        )
    }

    it('should call dispatch with setCurrentChat when request has chatWithUser', () => {
        const wrapper = createWrapper({ isLoading: false, chatWithUser});
        wrapper.findByTestid('action').simulate('click');

        expect(dispatchMock).toHaveBeenCalledWith(setCurrentChat(chatWithUser));
    })

    it('should call dispatch with acceptRequest when there is no request', () => {
        const wrapper = createWrapper(undefined);
        wrapper.findByTestid('action').simulate('click');

        expect(dispatchMock).toHaveBeenCalledWith(acceptRequest(5));
    })

    it('should render LoadingIndicator when request isLoading is true', () => {
        const wrapper = createWrapper({ isLoading: true });

        expect(wrapper.find(LoadingIndicator).exists()).toBe(true);
    })

    it('should render Info with display none when isInfoVisible is false', async() => {
        const wrapper = createWrapper({ isLoading: false, chatWithUser});
      
        expect(wrapper.find(Info)).toHaveStyleRule('display', 'none');
    })

    it('should render Info with display flex when isInfoVisible is true', () => {
        const wrapper = createWrapper({ isLoading: false, chatWithUser});
        wrapper.findByTestid('toggleInfo').simulate('click');
      
        expect(wrapper.find(Info)).toHaveStyleRule('display', 'flex');
    })

    it('should call history push on setChat', () => {
        const wrapper = createWrapper({ isLoading: false, chatWithUser});
        wrapper.findByTestid('action').simulate('click');

        expect(pushMock).toHaveBeenCalledWith('/chat');
    })
})