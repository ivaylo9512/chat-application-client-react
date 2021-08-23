import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import RequestList from 'components/RequestsList/RequestsList';

describe('RequestList snapshot tests', () => {
    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(jest.fn());
    })
    
    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);

        return shallow(
            <RequestList />
        )
    }

    it('should render info requests data is empty', () => {
        const wrapper = createWrapper([]);

        expect(wrapper).toMatchSnapshot();
    })

    it('should render list when requests data is not empty', () => {
        const wrapper = createWrapper([{ id: 5, createdAt: '2021-08-23', sender: { firstName: 'firstname', lastName: 'lastName', profileImage: 'image.png' }}, 
            { id: 6, createdAt: '2021-08-23', sender: { firstName: 'firstname2', lastName: 'lastName2', profileImage: 'image2.png' }}]);
        
        expect(wrapper).toMatchSnapshot();
    })

    it('should render empty Container when requests returns undefined', () => {
        const wrapper = createWrapper();

        expect(wrapper).toMatchSnapshot();
    })
})
