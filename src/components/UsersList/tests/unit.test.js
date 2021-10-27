import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import UsersList from 'components/UsersList/UsersList';
import { Container } from 'components/UsersList/UsersListStyle';
import User from 'components/User/User';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

describe('UsersList unit tests', () => {
    const createWrapper = (state, page) => {
        const selectorSpy = jest.spyOn(redux, 'useSelector');
        selectorSpy.mockReturnValueOnce(state);
        selectorSpy.mockReturnValueOnce(page);

        return shallow(<UsersList />)
    }

    it('should render users', () => {
        const users = [{id: 1, firstName: 'first'}, {id: 2, firstName: 'second'}, {id: 3, firstName: 'test'}, {id: 4, firstName: 'test'}, {id: 5, firstName: 'test'}];
        const wrapper = createWrapper({ dataInfo: { currentData : users }, isLoading : false }, 1);
    
        const user = wrapper.find(User);
        
        expect(user.length).toBe(5);
        expect(user.at(0).key()).toBe('1');
        expect(user.at(1).key()).toBe('2');
        expect(user.at(0).prop('user')).toStrictEqual({id: 1, firstName: 'first'});
        expect(user.at(1).prop('user')).toStrictEqual({id: 2, firstName: 'second'});
    })

    it('should render info when empty array', () => {
        const wrapper = createWrapper({ dataInfo: { currentData : [] }, isLoading : false})
    
        expect(wrapper.findByTestid('info').length).toBe(1);
        expect(wrapper.find(User).length).toBe(0);
    })

    it('should render info when users is null', () => {
        const wrapper = createWrapper({ dataInfo: { currentData : null }, isLoading : false})
    
        expect(wrapper.findByTestid('info').length).toBe(1);
        expect(wrapper.find(User).length).toBe(0);
    })

    it('should render loading indicator', () => {
        const wrapper = createWrapper({ dataInfo: { currentData : null }, isLoading : true})
    
        expect(wrapper.find(LoadingIndicator).length).toBe(1);
        expect(wrapper.findByTestid('info').length).toBe(0);
        expect(wrapper.find(User).length).toBe(0);
    })
})