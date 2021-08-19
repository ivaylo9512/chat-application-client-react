import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import UserChatsList from 'components/UserChatsList/UserChatsList';
import { Container } from 'components/UserChatsList/UserChatsListStyle';
import UserChat from 'components/UserChat/UserChat';

describe('UserChatsList unit tests', () => {
    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);

        return shallow(<UserChatsList />)
    }

    it('should render users', () => {
        const wrapper = createWrapper([{id: 1, firstName: 'firstTest'}, {id: 2, firstName: 'secondTest'}, {id: 3, firstName: 'test'}, {id: 4, firstName: 'test'}, {id: 5, firstName: 'test'}])
    
        const userChats = wrapper.find(UserChat);
        
        expect(userChats.length).toBe(5);
        expect(userChats.at(0).key()).toBe('1');
        expect(userChats.at(1).key()).toBe('2');
        expect(userChats.at(0).prop('userChat')).toStrictEqual({id: 1, firstName: 'firstTest'});
        expect(userChats.at(1).prop('userChat')).toStrictEqual({id: 2, firstName: 'secondTest'});
    })

    it('should render info when empty array', () => {
        const wrapper = createWrapper([])
    
        expect(wrapper.findByTestid('info').length).toBe(1);
        expect(wrapper.find(UserChat).length).toBe(0);
    })

    it('should not render container when users is undefined', () => {
        const wrapper = createWrapper(undefined)
    
        expect(wrapper.find(Container).children().length).toBe(0);
    })
})