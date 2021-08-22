import * as redux from 'react-redux';
import User from 'components/User/User'
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator'
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { setCurrentChat } from 'app/slices/chatsSlice';
import { sendRequest } from 'app/slices/requestsSlice';

describe('User unit tests', () => {
    let dispatchMock = jest.fn();
    let history;

    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchMock);
    })

    const createWrapper = (state, user) => {
        history = createMemoryHistory();
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);

        return mount(
            <Router history={history}>
                <User page={1} user={{ id: 5, firstName: 'First', lastName: 'Last', profilePicture: 'image.png', ...user}}/>
            </Router>
        )
    }

        
    it('should call dispatch with setCurrent chat when user has chatWithUser', () => {
        const chatWithUser = {id: 1, secondUser: { firstName: 'firstname', lastName: 'lastname' }}
        const wrapper = createWrapper({ isLoading: false }, { chatWithUser, requestState: 'pending' });
        expect(wrapper.find('button').simulate('click'));

        expect(dispatchMock).toHaveBeenCalledWith(setCurrentChat(chatWithUser));
    })
    
    it('should call dispatch with sendRequest when user does not have chatWithUser ', () => {
        const wrapper = createWrapper({ isLoading: false }, { chatWithUser: false, requestState: 'send' });
        expect(wrapper.find('button').simulate('click'));

        expect(dispatchMock).toHaveBeenCalledWith(sendRequest({ id: 5, page: 1 }));
    })

    it('should not call dispatch when requestState is pending', () => {
        const wrapper = createWrapper({ isLoading: false }, { chatWithUser: false, requestState: 'pending' });
        expect(wrapper.find('button').simulate('click'));

        expect(dispatchMock).not.toHaveBeenCalled();
    })

    it('should render Loading when request is loading', () => {
        const wrapper = createWrapper({ isLoading: true });
        expect(wrapper.find(LoadingIndicator).exists()).toBe(true);
    })

    it('should render open when user has chatWithUser', () => {
        const wrapper = createWrapper({ isLoading: false }, { chatWithUser: true });
        expect(wrapper.find('button').text()).toBe('open');
    })

    it('should render requestState when user is does not have chatWithUser', () => {
        const wrapper = createWrapper({ isLoading: false }, { chatWithUser: false, requestState: 'pending' });
        expect(wrapper.find('button').text()).toBe('pending');
    })

    it('should call history push when setCurrent', () => {
        const chatWithUser = {id: 1, secondUser: { firstName: 'firstname', lastName: 'lastname' }}
        const wrapper = createWrapper({ isLoading: false }, { chatWithUser, requestState: 'pending' });
        expect(wrapper.find('button').simulate('click'));

        expect(history.location.pathname).toBe('/chat');
    })
})