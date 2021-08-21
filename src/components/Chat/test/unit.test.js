import { setCurrentChat } from 'app/slices/chatsSlice';
import * as redux from 'react-redux';
import { ChatNode, Info, InfoButton } from 'components/Chat/ChatStyles';
import { mount } from 'enzyme';
import Chat from 'components/Chat/Chat';
import 'jest-styled-components';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const chat = {id: 1, lastMessage: 'last message', secondUser: { firstName: 'first', lastName: 'last', profileImage: 'image1.png'} };
describe('Chat unit tests', () => {
    let wrapper;
    let dispatchMock = jest.fn();
    let history;

    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(dispatchMock);
        history = createMemoryHistory();

        wrapper = mount(
            <Router history={history}>
                <Chat chat={chat}/>
            </Router>)
    })

    it('should call dispatch with setCurrentChat', () => {
        wrapper.find(ChatNode).simulate('click');

        expect(dispatchMock).toHaveBeenCalledWith(setCurrentChat(chat));
    })

    it('should change displayInfo', () => {
        wrapper.find(InfoButton).simulate('click');

        const info = wrapper.find(Info)
        expect(info.prop('displayInfo')).toBe(true);
        expect(info).toHaveStyleRule('display', 'flex');
    })

    it('should push /chat to history', () => {
        wrapper.find(ChatNode).simulate('click');

        expect(history.location.pathname).toBe('/chat');
    })
})