import Main from 'components/Main/Main';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import ChatView from 'components/ChatView/ChatView'
import UserChatsView from 'components/UserChatsView/UserChatsView';
import UsersView from 'components/UsersView/UsersView';
import { P } from 'components/Main/MainStyle';

jest.mock('components/UsersView/UsersView', () => () => <div></div>);
jest.mock('components/UserChatsView/UserChatsView', () =>  () => <div></div>);
jest.mock('components/ChatView/ChatView', () => () => <div></div>);

describe('Main snapshot tests', () => {
    const createWrapper = (route) => {
        return mount(
            <MemoryRouter initialEntries={[ route ]} initialIndex={0}>
                <Main />
            </MemoryRouter>
        )
    }
    
    it('should render UsersView ', () => {
        const wrapper = createWrapper('/searchUsers');

        expect(wrapper.find(UsersView).length).toBe(1);
    })

    it('should render UserChatsView', () => {
        const wrapper = createWrapper('/searchChat');

        expect(wrapper.find(UserChatsView).length).toBe(1);
    })

    it('should render ChatView', () => {
        const wrapper = createWrapper('/chat/1');

        expect(wrapper.find(ChatView).length).toBe(1);
    })

    it('should render P on /home', () => {
        const wrapper = createWrapper('/nonexistent');

        expect(wrapper.find(P).length).toBe(1);
    })

    it('should redirect to /home on wrong route', () => {
        const wrapper = createWrapper('/nonexistent');

        expect(wrapper.find(P).length).toBe(1);
    })
})