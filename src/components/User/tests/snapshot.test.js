import User from 'components/User/User';
import { shallow } from 'enzyme';
import * as Redux from 'react-redux';

describe("RegisterSnapshotTests", () => {
    let selectorSpy;

    beforeAll(() => {
        selectorSpy = jest.spyOn(Redux, 'useSelector');
        jest.spyOn(Redux, 'useDispatch').mockReturnValue(jest.fn());
    })
    
    const createWrapper = (state, user) => {
        selectorSpy.mockReturnValue(state);
        
        return shallow(
            <User user={user}/> 
        )
    }

    it('should render snapshot with chatWithUser', () => {
    const wrapper = createWrapper(undefined,  {firstName: 'First', lastName: 'Last', profilePicture: 'image.png', chatWithUser: true});

        expect(wrapper).toMatchSnapshot();
    })

    it('should render snapshot without request without chat', () => {
        const wrapper = createWrapper(undefined,  {firstName: 'First', lastName: 'Last', profilePicture: 'image.png', chatWithUser: false, requestState: 'send'});
    
        expect(wrapper).toMatchSnapshot();
    })

    it('should render snapshot with request', () => {
        const wrapper = createWrapper({ isLoading: false, state: 'send'},  {firstName: 'First', lastName: 'Last', profilePicture: 'image.png', chatWithUser: false, requestState: 'send'});
    
        expect(wrapper).toMatchSnapshot();
    })

    it('should render snapshot with loading request', () => {
        const wrapper = createWrapper({ isLoading: true},  {firstName: 'First', lastName: 'Last', profilePicture: 'image.png', chatWithUser: false, requestState: 'send'});
    
        expect(wrapper).toMatchSnapshot();
    })
})