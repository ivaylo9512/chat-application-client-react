import UsersView from 'components/UsersView/UsersView';
import { shallow } from 'enzyme';
import * as redux from 'react-redux';

describe('UserView snapshot tests', () => {    
    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(jest.fn());
        jest.spyOn(redux, 'useSelector').mockReturnValue(jest.fn());
    })

    const createWrapper = () => shallow(<UsersView />)
    
    it('should match snapshot', () => {
        const wrapper = createWrapper();

        expect(wrapper).toMatchSnapshot();
    })
})