import App from 'AppRoot/App';
import { shallow } from 'enzyme';
import * as redux from 'react-redux';
describe('App snapshot tests', () => {
    beforeEach(() => {
        jest.spyOn(redux, 'useDispatch').mockReturnValue(jest.fn());
    })

    const createWrapper = (state) => {
        jest.spyOn(redux, 'useSelector').mockReturnValue(state);
        
        return shallow(<App />)
    }

    it('should render with logged user', () => {
        const wrapper = createWrapper(true);

        expect(wrapper).toMatchSnapshot();
    })

    it('should render without logged user', () => {
        const wrapper = createWrapper(false);

        expect(wrapper).toMatchSnapshot();
    })
})
