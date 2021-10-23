import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import RequestButtons from 'components/RequestButtons/RequestButtons';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import { setCurrentChat } from 'app/slices/chatsSlice';
import { acceptRequest, denyRequest, sendRequest } from 'app/slices/requestsSlice';
import 'jest-styled-components';
import reactRouterDom from 'react-router-dom';

jest.mock('react-router-dom')

const chatWithUser = {
    id: 1, 
    lastMessage: 'last message', 
    secondUser: { 
        firstName: 'first',
        lastName: 'last',
        profileImage: 'image1.png'
    } 
};
const userId = 5;
const id = 2;

describe('RequestButtons unit tests', () => {
    let dispatchMock = jest.fn();
    let pushMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchMock);
        reactRouterDom.useHistory = jest.fn().mockReturnValue({push: pushMock});
    })
    
    const createWrapper = (request, state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);

        return shallow(
            <RequestButtons requestId={id} userId={userId} {...request} />
        )
    }

    it('should call history push on setChat', () => {
        const wrapper = createWrapper({ chatWithUser, initialMessage: 'completed' });
        wrapper.findByTestid('action').props().onClick();

        expect(pushMock).toHaveBeenCalledWith('/chat');
    })

    it('should render LoadingIndicator on loading request', () => {
        const wrapper = createWrapper({ initialMessage: 'accept' }, { isLoading: true });
        
        expect(wrapper.find(LoadingIndicator).length).toBe(2);
    })


    it('should call dispatch with setCurrentChat when request has chatWithUser', () => {
        const wrapper = createWrapper({ chatWithUser, initialMessage: 'completed' });
        wrapper.findByTestid('action').props().onClick();

        expect(dispatchMock).toHaveBeenCalledWith(setCurrentChat(chatWithUser));
    })

    it('should not call dispatch when request is loading ', () => {
        const wrapper = createWrapper({ initialMessage: 'accept' }, { isLoading: true });
    
        wrapper.findByTestid('action').props().onClick();
        
        expect(dispatchMock).not.toHaveBeenCalledWith();
    })

    it('should call dispatch with accept when request has accept state', () => {
        const wrapper = createWrapper({ initialMessage: 'accept' });
        wrapper.findByTestid('accept').props().onClick();

        expect(dispatchMock).toHaveBeenCalledWith(acceptRequest({ id, userId }));
    })

    it('should call dispatch with deny on action button click when request has accept state', () => {
        const wrapper = createWrapper({ initialMessage: 'accept' });
        wrapper.findByTestid('action').props().onClick();

        expect(dispatchMock).toHaveBeenCalledWith(denyRequest({ id, requestState: 'accept', userId }));
    })

    it('should call dispatch with deny on action button click when request has accept state', () => {
        const wrapper = createWrapper({ initialMessage: 'pending' });
        wrapper.findByTestid('action').props().onClick();

        expect(dispatchMock).toHaveBeenCalledWith(denyRequest({ id, requestState: 'pending', userId }));
    })

    it('should call dispatch with deny on action button click when request has accept state', () => {
        const wrapper = createWrapper({ initialMessage: 'send' });
        wrapper.findByTestid('action').props().onClick();

        expect(dispatchMock).toHaveBeenCalledWith(sendRequest(userId));
    })
})