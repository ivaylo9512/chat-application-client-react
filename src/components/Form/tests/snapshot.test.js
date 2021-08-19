import { shallow } from 'enzyme';
import Form from 'components/Form/Form';
import * as Redux from 'react-redux';

describe('Pagination snapshot tests', () => {
    let selectorSpy;

    beforeEach(() => {
        selectorSpy = jest.spyOn(Redux, 'useSelector');
        jest.spyOn(Redux, 'useDispatch').mockReturnValue(jest.fn());
    })
    const createWrapper = (state) => {
        selectorSpy.mockReturnValue(state);

        return shallow(<Form />)   
    }

    it('should render snanpshot', () => {
        const wrapper = createWrapper(true);

        expect(wrapper).toMatchSnapshot();
    })

    it('should render snanpshot with false', () => {
        const wrapper = createWrapper(false);

        expect(wrapper).toMatchSnapshot();
    })
});