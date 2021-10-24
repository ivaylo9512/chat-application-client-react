import UsersView from 'components/UsersView/UsersView';
import { shallow } from 'enzyme';
import * as redux from 'react-redux';

describe('UserView snapshot tests', () => {    
    let wrapper;

    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(jest.fn());
    })

    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);
    
        wrapper = shallow(<UsersView />)
    }
    
    it('should match snapshot', () => {
        createWrapper({ isLoading: false, dataInfo: { currentData: null }});

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with loading request', () => {
        createWrapper({ isLoading: true, dataInfo: { currentData: null }});

        expect(wrapper).toMatchSnapshot();
    })

    it('should match snapshot with error', () => {
        createWrapper({ isLoading: false, error: 'Unavailable', dataInfo: { currentData: null } });

        expect(wrapper).toMatchSnapshot();
    })
})