import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import UsersList from 'components/UsersList/UsersList';

describe('UsersList snapshot tests', () => {
    const createWrapper = (users, page) => {
        const selectorSpy = jest.spyOn(redux, 'useSelector');
        selectorSpy.mockReturnValueOnce(users);
        selectorSpy.mockReturnValueOnce(page);

        return shallow(<UsersList />)
    }

    it('should render with users', () => {
        const wrapper = createWrapper([{id: 1, firstName: 'test'}, {id: 2, firstName: 'test'}, {id: 3, firstName: 'test'}, {id: 4, firstName: 'test'}, {id: 5, firstName: 'test'}], 1)

        expect(wrapper).toMatchSnapshot();
    })

    it('should render info message when empty users array', () => {
        const wrapper = createWrapper([])
    
        expect(wrapper).toMatchSnapshot();
    })

    it('should not render container with undefined state', () => {
        const wrapper = createWrapper(undefined);

        expect(wrapper).toMatchSnapshot();
    })
})