import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import UsersList from 'components/UsersList/UsersList';

describe('UsersList snapshot tests', () => {
    const createWrapper = (state, page) => {
        const selectorSpy = jest.spyOn(redux, 'useSelector');
        selectorSpy.mockReturnValueOnce(state);
        selectorSpy.mockReturnValueOnce(page);

        return shallow(<UsersList />)
    }

    it('should render with users', () => {
        const users = [{id: 1, firstName: 'test'}, {id: 2, firstName: 'test'}, {id: 3, firstName: 'test'}, {id: 4, firstName: 'test'}, {id: 5, firstName: 'test'}];
        
        const wrapper = createWrapper({ dataInfo: { lastData: users }, isLoading: false}, 1)

        expect(wrapper).toMatchSnapshot();
    })

    it('should render info message when empty users array', () => {
        const wrapper = createWrapper({ dataInfo: { lastData: [] }, isLoading: false })
    
        expect(wrapper).toMatchSnapshot();
    })

    it('should not render container with undefined state', () => {
        const wrapper = createWrapper({ dataInfo: { lastData: undefined }, isLoading: false })

        expect(wrapper).toMatchSnapshot();
    })

    it('should render with loading true', () => {
        const wrapper = createWrapper({ dataInfo: { lastData: undefined }, isLoading: true })

        expect(wrapper).toMatchSnapshot();
    })
})