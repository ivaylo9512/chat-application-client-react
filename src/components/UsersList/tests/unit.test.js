import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import UsersList from 'components/UsersList/UsersList';
import { Container } from 'components/UsersList/UsersListStyle';
import User from 'components/User/User';

describe('UsersList unit tests', () => {
    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);

        return shallow(<UsersList />)
    }

    it('should render users', () => {
        const wrapper = createWrapper([{id: 1, firstName: 'first'}, {id: 2, firstName: 'second'}, {id: 3, firstName: 'test'}, {id: 4, firstName: 'test'}, {id: 5, firstName: 'test'}])
    
        const user = wrapper.find(User);
        
        expect(user.length).toBe(5);
        expect(user.at(0).key()).toBe('1');
        expect(user.at(1).key()).toBe('2');
        expect(user.at(0).prop('user')).toStrictEqual({id: 1, firstName: 'first'});
        expect(user.at(1).prop('user')).toStrictEqual({id: 2, firstName: 'second'});
    })

    it('should render info when empty array', () => {
        const wrapper = createWrapper([])
    
        expect(wrapper.findByTestid('info').length).toBe(1);
        expect(wrapper.find(User).length).toBe(0);
    })

    it('should not render container when users is undefined', () => {
        const wrapper = createWrapper(undefined)
    
        expect(wrapper.find(Container).children().length).toBe(0);
    })
})