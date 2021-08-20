import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import UserChatsList from 'components/UserChatsList/UserChatsList';

describe('UserChatsList snapshot tests', () => {
    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);

        return shallow(<UserChatsList />)
    }

    it('should render with users', () => {
        const wrapper = createWrapper([{id: 1, firstName: 'test'}, {id: 2, firstName: 'test'}, {id: 3, firstName: 'test'}, {id: 4, firstName: 'test'}, {id: 5, firstName: 'test'}])

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